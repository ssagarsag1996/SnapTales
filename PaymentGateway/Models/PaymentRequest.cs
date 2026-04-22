namespace PaymentGateway.Models
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "INR";
        public string OrderId { get; set; }
        public string CustomerId { get; set; }
        public string CallbackUrl { get; set; }
    }
}
