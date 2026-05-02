using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Interfaces
{
    public interface ISizeService
    {
        Task<IReadOnlyList<SizeResponse>> GetAllAsync();
        Task<SizeResponse> CreateAsync(CreateSizeRequest request);
        Task<SizeResponse?> UpdateAsync(Guid id, RenameSizeRequest request);
        Task<(bool Success, string? Error)> DeleteAsync(Guid id);
    }
}
