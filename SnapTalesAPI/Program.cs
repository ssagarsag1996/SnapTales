using FluentMigrator.Runner;
using PaymentGateway.DependencyInjection;
using Scalar.AspNetCore;
using SnapTalesAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// ── CORS — allow Vue UI ───────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("SnapTalesUI", policy =>
        policy
            .WithOrigins("http://localhost:8100")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// ── Database ──────────────────────────────────────────────────────────────────
builder.Services.AddSnapTalesAPIContext(connectionString);
builder.Services.AddPaymentGatewayContext(connectionString);

// ── Migrations ────────────────────────────────────────────────────────────────
builder.Services.AddMigrations(connectionString);

// ── Payment Gateway ───────────────────────────────────────────────────────────
builder.Services.AddPaymentGatewayProviderServices();
builder.Services.AddRazorpay(options =>
{
    options.Key           = builder.Configuration["Razorpay:Key"]           ?? string.Empty;
    options.Secret        = builder.Configuration["Razorpay:Secret"]        ?? string.Empty;
    options.WebhookSecret = builder.Configuration["Razorpay:WebhookSecret"] ?? string.Empty;
});

// ── API ───────────────────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// ── Run migrations on startup ─────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
    runner.MigrateUp();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("SnapTalesUI");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
