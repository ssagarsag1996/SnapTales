using System.Text;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PaymentGateway.DependencyInjection;
using SnapTalesAPI.Data.Context;
using SnapTalesAPI.Data.Migrations;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Services;

namespace SnapTalesAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSnapTalesAPIContext(
            this IServiceCollection services,
            string connectionString)
        {
            services.AddDbContext<MainDbContext>(options =>
                options.UseNpgsql(connectionString));
            return services;
        }

        public static IServiceCollection AddMigrations(
            this IServiceCollection services,
            string connectionString)
        {
            services
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddPostgres()
                    .WithGlobalConnectionString(connectionString)
                    .ScanIn(typeof(InitialMigration).Assembly).For.Migrations()
                    .AddPaymentGatewayMigrations()
                )
                .AddLogging(lb => lb.AddFluentMigratorConsole());

            return services;
        }

        public static IServiceCollection AddSnapTalesServices(
            this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ISizeService, SizeService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddSingleton<SampleOverlayService>();
            return services;
        }

        public static IServiceCollection AddJwtAuthentication(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!);

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.MapInboundClaims = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer           = true,
                        ValidateAudience         = true,
                        ValidateLifetime         = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer              = configuration["Jwt:Issuer"],
                        ValidAudience            = configuration["Jwt:Audience"],
                        IssuerSigningKey         = new SymmetricSecurityKey(key),
                        ClockSkew                = TimeSpan.Zero,
                        RoleClaimType            = "role",
                        NameClaimType            = "name",
                    };
                });

            return services;
        }
    }
}
