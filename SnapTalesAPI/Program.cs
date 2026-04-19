using Microsoft.EntityFrameworkCore;
using PaymentGateway.Data.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("Connection string not found!");
}


builder.Services.AddDbContext<MainDbContext>(options =>
    options.UseNpgsql(connectionString, x =>
        x.MigrationsHistoryTable("__EFMigrationsHistory", "public")));

builder.Services.AddPaymentGateway(connectionString);

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
