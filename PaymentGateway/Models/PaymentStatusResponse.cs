namespace PaymentGateway.Models
{
    public class PaymentStatusResponse
    {
        public string TransactionId { get; set; }
        public string Status { get; set; }
        public bool IsFinal { get; set; }
    }
}
