using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Interfaces
{
    public interface ICategoryService
    {
        Task<IReadOnlyList<CategoryResponse>> GetAllAsync();
        Task<CategoryResponse?> GetByIdAsync(Guid id);
        Task<CategoryResponse> CreateAsync(CreateCategoryRequest request);
        Task<CategoryResponse?> UpdateAsync(Guid id, RenameCategoryRequest request);
        Task<(bool Success, string? Error)> DeleteAsync(Guid id);
    }
}
