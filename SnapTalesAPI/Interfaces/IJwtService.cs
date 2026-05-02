using SnapTalesAPI.Models.Entities;

namespace SnapTalesAPI.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
