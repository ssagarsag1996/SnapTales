namespace SnapTalesAPI.Models.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public bool IsSale { get; set; }
        public string Description { get; set; } = null!;
        public int Stock { get; set; }
        public string Sku { get; set; } = null!;
        public decimal Rating { get; set; }
        public int ReviewCount { get; set; }
        public List<Guid> SizeIds { get; set; } = new();
        public List<string> Images { get; set; } = new();
        public string? OverlayImage { get; set; }
        public int AperturePercent { get; set; } = 15;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
