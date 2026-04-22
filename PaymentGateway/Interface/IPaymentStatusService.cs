namespace PaymentGateway.Interface
{
    public interface IPaymentStatusService
    {
        Task PollStatusAsync(string transactionId);
    }
}
