using PaymentGateway.Models;

namespace PaymentGateway.Services.Razorpay.V1
{
    public static class RazorpayMapperV1
    {
        public static PaymentResponse MapToPaymentResponse(string raw)
        {
            // Simplified parsing (use proper JSON parsing in real case)
            return new PaymentResponse
            {
                TransactionId = "razor_txn",
                PaymentUrl = "https://checkout.razorpay.com",
                Success = true,
                RawResponse = raw
            };
        }
    }
}
