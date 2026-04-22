using FluentMigrator.Runner;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PaymentGateway.Data.Context;
using PaymentGateway.Data.Migrations;
using PaymentGateway.Factories;
using PaymentGateway.Interface;
using PaymentGateway.Providers.Razorpay.V1;
using PaymentGateway.Services.Razorpay.V1;
using System.Net.Http.Headers;
using System.Text;

namespace PaymentGateway.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        // ── DB Context ────────────────────────────────────────────────────────────
        public static IServiceCollection AddPaymentGatewayContext(
            this IServiceCollection services,
            string connectionString)
        {
            services.AddDbContext<PaymentGatewayDbContext>(options => options.UseNpgsql(connectionString));
            return services;
        }

        // ── Migrations ────────────────────────────────────────────────────────────
        public static IMigrationRunnerBuilder AddPaymentGatewayMigrations(
            this IMigrationRunnerBuilder rb)
        {
            return rb.ScanIn(typeof(InitialMigration).Assembly).For.Migrations();
        }

        // ── Core (gateway-agnostic) ───────────────────────────────────────────────
        // Register the factory only — no gateway-specific code here.
        // Call AddRazorpay / AddStripe / AddPayPal separately to plug in gateways.
        public static IServiceCollection AddPaymentGatewayProviderServices(
            this IServiceCollection services)
        {
            services.AddSingleton<IPaymentGatewayFactory, PaymentGatewayFactory>();
            return services;
        }

        // ── Razorpay ──────────────────────────────────────────────────────────────
        public static IServiceCollection AddRazorpay(
            this IServiceCollection services,
            Action<RazorpayOptions> configure)
        {
            services.Configure<RazorpayOptions>(configure);

            services.AddHttpClient<RazorpayClientV1>((sp, client) =>
            {
                var options = sp.GetRequiredService<IOptions<RazorpayOptions>>().Value;

                client.BaseAddress = new Uri(options.BaseUrl);

                var credentials = Convert.ToBase64String(
                    Encoding.ASCII.GetBytes($"{options.Key}:{options.Secret}"));

                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Basic", credentials);
            });

            services.AddTransient<RazorpayServiceV1>();

            return services;
        }

        // ── Stripe (future) ───────────────────────────────────────────────────────
        // public static IServiceCollection AddStripe(
        //     this IServiceCollection services,
        //     Action<StripeOptions> configure) { ... }

        // ── PayPal (future) ───────────────────────────────────────────────────────
        // public static IServiceCollection AddPayPal(
        //     this IServiceCollection services,
        //     Action<PayPalOptions> configure) { ... }
    }
}
