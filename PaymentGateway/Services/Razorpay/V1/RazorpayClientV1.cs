using PaymentGateway.Models;
using System.Net.Http.Json;

namespace PaymentGateway.Services.Razorpay.V1
{
    public class RazorpayClientV1
    {
        private readonly HttpClient _httpClient;

        public RazorpayClientV1(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> CreateOrderAsync(PaymentRequest request)
        {
            var payload = new
            {
                amount = (long)(request.Amount * 100), // Razorpay expects paise
                currency = request.Currency,
                receipt = request.OrderId
            };

            var response = await _httpClient.PostAsJsonAsync("orders", payload);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetPaymentStatusAsync(string paymentId)
        {
            var response = await _httpClient.GetAsync($"payments/{paymentId}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
