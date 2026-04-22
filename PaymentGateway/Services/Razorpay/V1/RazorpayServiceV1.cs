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
                throw new PaymentGatewayException("Razorpay V1 CreatePayment failed", ex);
            }
        }

        public async Task<PaymentStatusResponse> GetPaymentStatusAsync(string transactionId)
        {
            try
            {
                var raw = await _client.GetPaymentStatusAsync(transactionId);
                return RazorpayMapperV1.MapToStatusResponse(raw, transactionId);
            }
            catch (System.Exception ex)
            {
                throw new PaymentGatewayException("Razorpay V1 GetPaymentStatus failed", ex);
            }
        }
    }
}
