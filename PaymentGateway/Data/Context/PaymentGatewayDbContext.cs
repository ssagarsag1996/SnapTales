using Microsoft.EntityFrameworkCore;

namespace PaymentGateway.Data.Context
{
    public class PaymentGatewayDbContext : DbContext
    {
        public PaymentGatewayDbContext(DbContextOptions<PaymentGatewayDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("paymentgateway");
            base.OnModelCreating(modelBuilder);
        }
        // DbSets
    }
}
