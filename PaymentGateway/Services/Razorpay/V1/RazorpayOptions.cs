using System;
using System.Collections.Generic;
using System.Text;

namespace PaymentGateway.Services.Razorpay.V1
{
    public class RazorpayOptions
    {
        public string Key { get; set; }
        public string Secret { get; set; }
        public string BaseUrl { get; set; }
    }
}
