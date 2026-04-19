using FluentMigrator.Runner;
using FluentMigrator.Runner.Versioning;
using FluentMigrator.Runner.VersionTableInfo;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PaymentGateway.Data.Context;
using PaymentGateway.Data.Migrations;


public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPaymentGatewayContext(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<PaymentGatewayDbContext>(options => options.UseNpgsql(connectionString));

        return services;
    }
}

