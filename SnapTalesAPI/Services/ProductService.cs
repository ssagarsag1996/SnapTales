using Microsoft.EntityFrameworkCore;
using SnapTalesAPI.Data.Context;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;
using SnapTalesAPI.Models.Entities;

namespace SnapTalesAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly MainDbContext _db;

        public ProductService(MainDbContext db) => _db = db;

        public async Task<IReadOnlyList<ProductResponse>> GetAllAsync()
        {
            var products = await _db.Products
                .Include(p => p.Category)
                .OrderBy(p => p.Name)
                .ToListAsync();

            return await MapManyAsync(products);
        }

        public async Task<IReadOnlyList<ProductResponse>> GetByCategoryAsync(Guid categoryId)
        {
            var products = await _db.Products
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId)
                .OrderBy(p => p.Name)
                .ToListAsync();

            return await MapManyAsync(products);
        }

        public async Task<ProductResponse?> GetByIdAsync(Guid id)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            return product == null ? null : await MapAsync(product);
        }

        public async Task<ProductResponse> CreateAsync(CreateProductRequest request)
        {
            var product = new Product
            {
                Id              = Guid.NewGuid(),
                CategoryId      = request.CategoryId,
                Name            = request.Name,
                Price           = request.Price,
                OriginalPrice   = request.OriginalPrice,
                IsSale          = request.IsSale,
                Description     = request.Description,
                Stock           = request.Stock,
                Sku             = request.Sku,
                Rating          = request.Rating,
                ReviewCount     = request.ReviewCount,
                SizeIds         = request.SizeIds,
                Images          = new List<string>(),
                AperturePercent = request.AperturePercent ?? 15,
                CreatedAt       = DateTime.UtcNow,
                UpdatedAt       = DateTime.UtcNow
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            await _db.Entry(product).Reference(p => p.Category).LoadAsync();
            return await MapAsync(product);
        }

        public async Task<ProductResponse?> UpdateAsync(Guid id, UpdateProductRequest request)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;

            if (request.CategoryId.HasValue) product.CategoryId  = request.CategoryId.Value;
            if (request.Name        != null) product.Name         = request.Name;
            if (request.Price.HasValue)      product.Price        = request.Price.Value;
            if (request.OriginalPrice.HasValue) product.OriginalPrice = request.OriginalPrice.Value;
            if (request.IsSale.HasValue)     product.IsSale       = request.IsSale.Value;
            if (request.Description != null) product.Description  = request.Description;
            if (request.Stock.HasValue)      product.Stock        = request.Stock.Value;
            if (request.Sku         != null) product.Sku          = request.Sku;
            if (request.Rating.HasValue)     product.Rating       = request.Rating.Value;
            if (request.ReviewCount.HasValue) product.ReviewCount = request.ReviewCount.Value;
            if (request.SizeIds != null)
            {
                product.SizeIds = request.SizeIds;
                _db.Entry(product).Property(p => p.SizeIds).IsModified = true;
            }
            if (request.AperturePercent.HasValue) product.AperturePercent = request.AperturePercent.Value;

            product.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            if (request.CategoryId.HasValue)
                await _db.Entry(product).Reference(p => p.Category).LoadAsync();

            return await MapAsync(product);
        }

        public async Task<ProductResponse?> AddImageAsync(Guid id, string imagePath)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;

            product.Images.Add(imagePath);
            product.UpdatedAt = DateTime.UtcNow;
            _db.Entry(product).Property(p => p.Images).IsModified = true;

            await _db.SaveChangesAsync();
            return await MapAsync(product);
        }

        public async Task<ProductResponse?> RemoveImageAsync(Guid id, int index)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;
            if (index < 0 || index >= product.Images.Count) return null;

            product.Images.RemoveAt(index);
            product.UpdatedAt = DateTime.UtcNow;
            _db.Entry(product).Property(p => p.Images).IsModified = true;

            await _db.SaveChangesAsync();
            return await MapAsync(product);
        }

        public async Task<ProductResponse?> SetOverlayImageAsync(Guid id, string imagePath)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;

            product.OverlayImage = imagePath;
            product.UpdatedAt    = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return await MapAsync(product);
        }

        public async Task<ProductResponse?> ClearOverlayImageAsync(Guid id)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;

            product.OverlayImage = null;
            product.UpdatedAt    = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return await MapAsync(product);
        }

        public async Task<string?> DeleteAsync(Guid id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null) return null;

            // Return all file paths (images + overlay) pipe-joined so controller can clean up
            var paths = product.Images.ToList();
            if (product.OverlayImage != null) paths.Add(product.OverlayImage);

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
            return string.Join("|", paths);
        }

        // ── Mapping helpers ───────────────────────────────────────────────────

        private async Task<IReadOnlyList<ProductResponse>> MapManyAsync(IList<Product> products)
        {
            // Batch-load all sizes used across all products
            var allSizeIds = products.SelectMany(p => p.SizeIds).Distinct().ToList();
            var sizesMap   = await _db.Sizes
                .Where(s => allSizeIds.Contains(s.Id))
                .ToDictionaryAsync(s => s.Id);

            return products.Select(p => MapWithSizes(p, sizesMap)).ToList();
        }

        private async Task<ProductResponse> MapAsync(Product product)
        {
            var sizesMap = await _db.Sizes
                .Where(s => product.SizeIds.Contains(s.Id))
                .ToDictionaryAsync(s => s.Id);

            return MapWithSizes(product, sizesMap);
        }

        private static ProductResponse MapWithSizes(
            Product product, Dictionary<Guid, Models.Entities.Size> sizesMap)
        {
            var sizes = product.SizeIds
                .Where(sizesMap.ContainsKey)
                .Select(id => new SizeResponse(id, sizesMap[id].Label))
                .ToList();

            return new ProductResponse(
                product.Id,
                product.CategoryId,
                product.Category.Name,
                product.Name,
                product.Price,
                product.OriginalPrice,
                product.IsSale,
                product.Description,
                product.Stock,
                product.Sku,
                product.Rating,
                product.ReviewCount,
                sizes,
                product.Images,
                product.OverlayImage,
                product.AperturePercent,
                product.CreatedAt,
                product.UpdatedAt
            );
        }
    }
}
