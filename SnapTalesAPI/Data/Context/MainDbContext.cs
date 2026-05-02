using Microsoft.EntityFrameworkCore;
using SnapTalesAPI.Models.Entities;
using SnapTalesAPI.Models.JsonTypes;
using System.Text.Json;

namespace SnapTalesAPI.Data.Context
{
    public class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }

        public DbSet<User>     Users      => Set<User>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Size>     Sizes      => Set<Size>();
        public DbSet<Product>  Products   => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");

            // ── User ─────────────────────────────────────────────────────────
            modelBuilder.Entity<User>()
                .Property(u => u.Addresses)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<Address>>(v, (JsonSerializerOptions?)null) ?? new List<Address>()
                );

            // ── Product ───────────────────────────────────────────────────────
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Product>()
                .Property(p => p.SizeIds)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<Guid>>(v, (JsonSerializerOptions?)null) ?? new List<Guid>()
                );

            modelBuilder.Entity<Product>()
                .Property(p => p.Images)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>()
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
