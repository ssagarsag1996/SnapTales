using PaymentGateway.Models;
using System.Net.Http.Json;

namespace PaymentGateway.Services.Razorpay.V1
{
    public class RazorpayClientV1
    {
        private readonly HttpClient _httpClient;
        private readonly RazorpayOptions _options;

        public RazorpayClientV1(HttpClient httpClient, RazorpayOptions options)
        {
            _httpClient = httpClient;
            _options = options;
        }

        public async Task<string> CreateOrderAsync(PaymentRequest request)
        {
            var payload = new
            {
                amount = request.Amount * 100,
                currency = request.Currency,
                receipt = request.OrderId
            };

            var response = await _httpClient.PostAsJsonAsync("/orders", payload);
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetPaymentStatusAsync(string transactionId)
        {
            var response = await _httpClient.GetAsync($"/payments/{transactionId}");
            return await response.Content.ReadAsStringAsync();
        }
    }
}
