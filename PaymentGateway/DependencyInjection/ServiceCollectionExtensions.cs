using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PaymentGateway.Data.Context;
using PaymentGateway.Factories;
using PaymentGateway.Interface;
using PaymentGateway.Providers.Razorpay.V1;
using PaymentGateway.Services.Razorpay.V1;


public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPaymentGatewayContext(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<PaymentGatewayDbContext>(options => options.UseNpgsql(connectionString));

        return services;
    }
    public static IServiceCollection AddPaymentGateways(this IServiceCollection services)
    {
        // Register services
        services.AddHttpClient<RazorpayClientV1>();
        services.AddTransient<RazorpayServiceV1>();

        services.AddSingleton<IPaymentGatewayFactory, PaymentGatewayFactory>();

        return services;
    }
}

