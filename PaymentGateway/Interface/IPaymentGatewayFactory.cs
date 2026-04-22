using PaymentGateway.Enums;

namespace PaymentGateway.Interface
{
    public interface IPaymentGatewayFactory
    {
        IPaymentService GetService(PaymentGatewayType type, PaymentVersion version);
    }
}
