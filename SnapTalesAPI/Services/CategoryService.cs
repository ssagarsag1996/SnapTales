using Microsoft.EntityFrameworkCore;
using SnapTalesAPI.Data.Context;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;
using SnapTalesAPI.Models.Entities;

namespace SnapTalesAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly MainDbContext _db;

        public CategoryService(MainDbContext db) => _db = db;

        public async Task<IReadOnlyList<CategoryResponse>> GetAllAsync() =>
            await _db.Categories
                .OrderBy(c => c.Name)
                .Select(c => new CategoryResponse(c.Id, c.Name, c.Products.Count))
                .ToListAsync();

        public async Task<CategoryResponse?> GetByIdAsync(Guid id) =>
            await _db.Categories
                .Where(c => c.Id == id)
                .Select(c => new CategoryResponse(c.Id, c.Name, c.Products.Count))
                .FirstOrDefaultAsync();

        public async Task<CategoryResponse> CreateAsync(CreateCategoryRequest request)
        {
            var category = new Category
            {
                Id        = Guid.NewGuid(),
                Name      = request.Name.Trim(),
                CreatedAt = DateTime.UtcNow
            };
            _db.Categories.Add(category);
            await _db.SaveChangesAsync();
            return new CategoryResponse(category.Id, category.Name, 0);
        }

        public async Task<CategoryResponse?> UpdateAsync(Guid id, RenameCategoryRequest request)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null) return null;

            category.Name = request.Name.Trim();
            await _db.SaveChangesAsync();

            var count = await _db.Products.CountAsync(p => p.CategoryId == id);
            return new CategoryResponse(category.Id, category.Name, count);
        }

        public async Task<(bool Success, string? Error)> DeleteAsync(Guid id)
        {
            var category = await _db.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null) return (false, null);

            if (category.Products.Any())
                return (false, $"Cannot delete — {category.Products.Count} product(s) are assigned to this category.");

            _db.Categories.Remove(category);
            await _db.SaveChangesAsync();
            return (true, null);
        }
    }
}
