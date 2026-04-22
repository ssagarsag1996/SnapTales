namespace PaymentGateway.Services.Razorpay.V1
{
    public class RazorpayOptions
    {
        public string Key { get; set; } = string.Empty;
        public string Secret { get; set; } = string.Empty;
        public string BaseUrl { get; set; } = "https://api.razorpay.com/v1/";
        public string WebhookSecret { get; set; } = string.Empty;
    }
}
