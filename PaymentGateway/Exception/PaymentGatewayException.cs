namespace PaymentGateway.Exception
{
    public class PaymentGatewayException : System.Exception
    {
        public PaymentGatewayException(string message) : base(message) { }

        public PaymentGatewayException(string message, System.Exception inner)
            : base(message, inner) { }
    }
}
