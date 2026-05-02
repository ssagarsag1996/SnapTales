using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Interfaces
{
    public interface IProductService
    {
        Task<IReadOnlyList<ProductResponse>> GetAllAsync();
        Task<IReadOnlyList<ProductResponse>> GetByCategoryAsync(Guid categoryId);
        Task<ProductResponse?> GetByIdAsync(Guid id);
        Task<ProductResponse> CreateAsync(CreateProductRequest request);
        Task<ProductResponse?> UpdateAsync(Guid id, UpdateProductRequest request);
        Task<ProductResponse?> AddImageAsync(Guid id, string imagePath);
        Task<ProductResponse?> RemoveImageAsync(Guid id, int index);
        Task<ProductResponse?> SetOverlayImageAsync(Guid id, string imagePath);
        Task<ProductResponse?> ClearOverlayImageAsync(Guid id);
        Task<string?> DeleteAsync(Guid id);   // returns pipe-separated paths (images + overlay) for file cleanup
    }
}
