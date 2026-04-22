namespace PaymentGateway.Models
{
    public class PaymentResponse
    {
        public string TransactionId { get; set; }
        public string PaymentUrl { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
        public string RawResponse { get; set; }
    }
}
