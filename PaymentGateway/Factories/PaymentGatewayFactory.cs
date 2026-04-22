using Microsoft.Extensions.DependencyInjection;
using PaymentGateway.Enums;
using PaymentGateway.Exception;
using PaymentGateway.Interface;
using PaymentGateway.Providers.Razorpay.V1;

namespace PaymentGateway.Factories
{
    public class PaymentGatewayFactory : IPaymentGatewayFactory
    {
        private readonly IServiceProvider _provider;

        private readonly Dictionary<(PaymentGatewayType, PaymentVersion), Type> _map;

        public PaymentGatewayFactory(IServiceProvider provider)
        {
            _provider = provider;

            _map = new()
        {
            { (PaymentGatewayType.Razorpay, PaymentVersion.V1), typeof(RazorpayServiceV1) }
        };
        }

        public IPaymentService GetService(PaymentGatewayType type, PaymentVersion version)
        {
            if (!_map.TryGetValue((type, version), out var serviceType))
                throw new PaymentGatewayException("Unsupported gateway/version");

            return (IPaymentService)_provider.GetRequiredService(serviceType);
        }
    }
}
