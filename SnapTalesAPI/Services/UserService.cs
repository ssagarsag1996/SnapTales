using Microsoft.EntityFrameworkCore;
using SnapTalesAPI.Data.Context;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;
using SnapTalesAPI.Models.Entities;
using SnapTalesAPI.Models.JsonTypes;

namespace SnapTalesAPI.Services
{
    public class UserService : IUserService
    {
        private readonly MainDbContext _db;
        private readonly IJwtService   _jwt;

        public UserService(MainDbContext db, IJwtService jwt)
        {
            _db  = db;
            _jwt = jwt;
        }

        public async Task<AuthResponse> FindOrCreateByGoogleAsync(
            string googleSub, string? email, string? name, string? avatarUrl)
        {
            // 1. Prefer stable Google subject identifier
            var user = await _db.Users.FirstOrDefaultAsync(u => u.GoogleSub == googleSub);

            // 2. Fall back to email — handles users who had an account before this change
            if (user == null && !string.IsNullOrWhiteSpace(email))
                user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {
                bool changed = false;
                if (user.GoogleSub == null)
                    { user.GoogleSub = googleSub; changed = true; }
                if (user.Name == null && !string.IsNullOrWhiteSpace(name))
                    { user.Name = name; changed = true; }
                if (user.AvatarUrl == null && !string.IsNullOrWhiteSpace(avatarUrl))
                    { user.AvatarUrl = avatarUrl; changed = true; }
                if (changed) { user.UpdatedAt = DateTime.UtcNow; await _db.SaveChangesAsync(); }
            }
            else
            {
                user = new User
                {
                    Id        = Guid.NewGuid(),
                    GoogleSub = googleSub,
                    Email     = string.IsNullOrWhiteSpace(email)     ? null : email,
                    Name      = string.IsNullOrWhiteSpace(name)      ? null : name,
                    AvatarUrl = string.IsNullOrWhiteSpace(avatarUrl) ? null : avatarUrl,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                };
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
            }

            return new AuthResponse(MapToResponse(user), _jwt.GenerateToken(user));
        }

        public async Task<UserResponse?> GetByIdAsync(Guid id)
        {
            var user = await _db.Users.FindAsync(id);
            return user == null ? null : MapToResponse(user);
        }

        public async Task<UserResponse?> UpdateAsync(Guid id, UpdateUserRequest request)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return null;

            if (request.Name     != null) user.Name      = request.Name;
            if (request.AvatarUrl != null) user.AvatarUrl = request.AvatarUrl;
            if (request.Phone    != null) user.Phone     = request.Phone;
            user.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return MapToResponse(user);
        }

        public async Task<UserResponse?> AddAddressAsync(Guid id, AddressRequest request)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return null;

            user.Addresses.Add(new Address
            {
                Label    = request.Label,
                FullName = request.FullName,
                Phone    = request.Phone,
                Line1    = request.Line1,
                City     = request.City,
                State    = request.State,
                PinCode  = request.PinCode
            });
            user.UpdatedAt = DateTime.UtcNow;
            _db.Entry(user).Property(u => u.Addresses).IsModified = true;

            await _db.SaveChangesAsync();
            return MapToResponse(user);
        }

        public async Task<UserResponse?> RemoveAddressAsync(Guid id, int index)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return null;
            if (index < 0 || index >= user.Addresses.Count) return null;

            user.Addresses.RemoveAt(index);
            user.UpdatedAt = DateTime.UtcNow;
            _db.Entry(user).Property(u => u.Addresses).IsModified = true;

            await _db.SaveChangesAsync();
            return MapToResponse(user);
        }

        private static UserResponse MapToResponse(User u) => new(
            u.Id,
            u.Name,
            u.Email,
            u.Phone,
            (int)u.Role,
            u.AvatarUrl,
            u.Addresses.Select(a => new AddressResponse(
                a.Label,
                a.FullName,
                a.Phone,
                a.Line1,
                a.City,
                a.State,
                a.PinCode
            )).ToList(),
            u.CreatedAt,
            u.UpdatedAt
        );
    }
}
