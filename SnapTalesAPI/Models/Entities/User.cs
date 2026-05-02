using SnapTalesAPI.Enums;
using SnapTalesAPI.Models.JsonTypes;

namespace SnapTalesAPI.Models.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public UserRole Role { get; set; } = UserRole.Customer;
        public string? AvatarUrl { get; set; }
        public List<Address> Addresses { get; set; } = new();
        public string? FirebaseUid { get; set; }
        public string? GoogleSub { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
