using PaymentGateway.Exception;
using PaymentGateway.Interface;
using PaymentGateway.Models;
using PaymentGateway.Services.Razorpay.V1;

namespace PaymentGateway.Providers.Razorpay.V1
{
    public class RazorpayServiceV1 : IPaymentService
    {
        private readonly RazorpayClientV1 _client;

        public RazorpayServiceV1(RazorpayClientV1 client)
        {
            _client = client;
        }

        public async Task<PaymentResponse> CreatePaymentAsync(PaymentRequest request)
        {
            try
            {
                var raw = await _client.CreateOrderAsync(request);
                return RazorpayMapperV1.MapToPaymentResponse(raw);
            }
            catch (System.Exception ex)
            {
                throw new PaymentGatewayException("Razorpay V1 failed", ex);
            }
        }

        public async Task<PaymentStatusResponse> GetPaymentStatusAsync(string transactionId)
        {
            var raw = await _client.GetPaymentStatusAsync(transactionId);

            return new PaymentStatusResponse
            {
                TransactionId = transactionId,
                Status = "SUCCESS",
                IsFinal = true
            };
        }
    }
}
