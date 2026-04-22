using PaymentGateway.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace PaymentGateway.Services.Razorpay.V1
{
    // Internal models for Razorpay V1 API responses
    internal class RazorpayOrderApiResponse
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("amount")]
        public long Amount { get; set; }

        [JsonPropertyName("currency")]
        public string Currency { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("receipt")]
        public string Receipt { get; set; } = string.Empty;
    }

    internal class RazorpayPaymentApiResponse
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("amount")]
        public long Amount { get; set; }

        [JsonPropertyName("currency")]
        public string Currency { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("order_id")]
        public string OrderId { get; set; } = string.Empty;
    }

    public static class RazorpayMapperV1
    {
        // Razorpay terminal statuses — no further state changes after these
        private static readonly HashSet<string> FinalStatuses = new(StringComparer.OrdinalIgnoreCase)
        {
            "captured", "failed", "refunded"
        };

        public static PaymentResponse MapToPaymentResponse(string raw)
        {
            var order = JsonSerializer.Deserialize<RazorpayOrderApiResponse>(raw);

            return new PaymentResponse
            {
                TransactionId = order?.Id ?? string.Empty,
                PaymentUrl = $"https://checkout.razorpay.com/v1/checkout.js?order_id={order?.Id}",
                Success = order?.Status == "created",
                Message = order?.Status ?? string.Empty,
                RawResponse = raw
            };
        }

        public static PaymentStatusResponse MapToStatusResponse(string raw, string transactionId)
        {
            var payment = JsonSerializer.Deserialize<RazorpayPaymentApiResponse>(raw);

            return new PaymentStatusResponse
            {
                TransactionId = transactionId,
                Status = payment?.Status ?? string.Empty,
                IsFinal = payment != null && FinalStatuses.Contains(payment.Status)
            };
        }
    }
}
