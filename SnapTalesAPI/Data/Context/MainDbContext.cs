using Microsoft.EntityFrameworkCore;
using SnapTalesAPI.Models;

namespace PaymentGateway.Data.Context
{
    public class MainDbContext : DbContext
    {
       public DbSet<WeatherForecast> WeatherForecast { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
    }
}
