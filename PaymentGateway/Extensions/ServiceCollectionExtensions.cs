using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PaymentGateway.Data.Context;


public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPaymentGateway(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<PaymentGatewayDbContext>(options =>
            options.UseNpgsql(connectionString, x =>
                x.MigrationsHistoryTable("__EFMigrationsHistory", "paymentgateway")));

        return services;
    }
}

