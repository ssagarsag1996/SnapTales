using FluentMigrator.Runner;
using Microsoft.EntityFrameworkCore;
using PaymentGateway.DependencyInjection;
using SnapTalesAPI.Data.Context;
using SnapTalesAPI.Data.Migrations;


public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSnapTalesAPIContext(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<MainDbContext>(options => options.UseNpgsql(connectionString));

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
}

