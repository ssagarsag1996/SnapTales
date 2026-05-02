namespace SnapTalesAPI.Models.Entities
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
