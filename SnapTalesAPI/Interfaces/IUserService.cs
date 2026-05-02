using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Interfaces
{
    public interface IUserService
    {
        Task<AuthResponse> FindOrCreateByGoogleAsync(string googleSub, string? email, string? name, string? avatarUrl);
        Task<UserResponse?> GetByIdAsync(Guid id);
        Task<UserResponse?> UpdateAsync(Guid id, UpdateUserRequest request);
        Task<UserResponse?> AddAddressAsync(Guid id, AddressRequest request);
        Task<UserResponse?> RemoveAddressAsync(Guid id, int index);
    }
}
