using Microsoft.EntityFrameworkCore;

namespace PaymentGateway.Data.Context
{
    public class PaymentGatewayDbContext : DbContext
    {
        //public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("paymentgateway");
            base.OnModelCreating(modelBuilder);
        }
    }
}
