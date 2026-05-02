using Microsoft.EntityFrameworkCore;
using SnapTalesAPI.Data.Context;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;
using SnapTalesAPI.Models.Entities;

namespace SnapTalesAPI.Services
{
    public class SizeService : ISizeService
    {
        private readonly MainDbContext _db;

        public SizeService(MainDbContext db) => _db = db;

        public async Task<IReadOnlyList<SizeResponse>> GetAllAsync() =>
            await _db.Sizes
                .OrderBy(s => s.Label)
                .Select(s => new SizeResponse(s.Id, s.Label))
                .ToListAsync();

        public async Task<SizeResponse> CreateAsync(CreateSizeRequest request)
        {
            var size = new Size
            {
                Id        = Guid.NewGuid(),
                Label     = request.Label.Trim(),
                CreatedAt = DateTime.UtcNow
            };
            _db.Sizes.Add(size);
            await _db.SaveChangesAsync();
            return new SizeResponse(size.Id, size.Label);
        }

        public async Task<SizeResponse?> UpdateAsync(Guid id, RenameSizeRequest request)
        {
            var size = await _db.Sizes.FindAsync(id);
            if (size == null) return null;

            size.Label = request.Label.Trim();
            await _db.SaveChangesAsync();
            return new SizeResponse(size.Id, size.Label);
        }

        public async Task<(bool Success, string? Error)> DeleteAsync(Guid id)
        {
            var size = await _db.Sizes.FindAsync(id);
            if (size == null) return (false, null);

            // Check if any product references this size
            var inUse = await _db.Products
                .AnyAsync(p => p.SizeIds.Contains(id));

            if (inUse)
                return (false, "Cannot delete — this size is used by one or more products.");

            _db.Sizes.Remove(size);
            await _db.SaveChangesAsync();
            return (true, null);
        }
    }
}
