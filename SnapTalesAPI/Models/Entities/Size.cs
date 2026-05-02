namespace SnapTalesAPI.Models.Entities
{
    public class Size
    {
        public Guid Id { get; set; }
        public string Label { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}
