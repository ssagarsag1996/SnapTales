using PaymentGateway.Models;

namespace PaymentGateway.Interface
{
    public interface IPaymentService
    {
        Task<PaymentResponse> CreatePaymentAsync(PaymentRequest request);
        Task<PaymentStatusResponse> GetPaymentStatusAsync(string transactionId);
    }
}
