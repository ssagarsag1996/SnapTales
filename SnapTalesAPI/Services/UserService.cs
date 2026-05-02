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

        public async Task<AuthResponse> FindOrCreateAsync(FindOrCreateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FirebaseUid) &&
                string.IsNullOrWhiteSpace(request.Email) &&
                string.IsNullOrWhiteSpace(request.Phone))
                throw new ArgumentException("Either firebaseUid, email, or phone is required.");

            User? user = null;

            // Prefer lookup by FirebaseUid — most stable identifier
            if (!string.IsNullOrWhiteSpace(request.FirebaseUid))
                user = await _db.Users.FirstOrDefaultAsync(u => u.FirebaseUid == request.FirebaseUid);

            if (user == null && !string.IsNullOrWhiteSpace(request.Email))
                user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null && !string.IsNullOrWhiteSpace(request.Phone))
                user = await _db.Users.FirstOrDefaultAsync(u => u.Phone == request.Phone);

            if (user == null)
            {
                user = new User
                {
                    Id          = Guid.NewGuid(),
                    Name        = string.IsNullOrWhiteSpace(request.Name)        ? null : request.Name,
                    Email       = string.IsNullOrWhiteSpace(request.Email)       ? null : request.Email,
                    Phone       = string.IsNullOrWhiteSpace(request.Phone)       ? null : request.Phone,
                    FirebaseUid = string.IsNullOrWhiteSpace(request.FirebaseUid) ? null : request.FirebaseUid,
                    CreatedAt   = DateTime.UtcNow,
                    UpdatedAt   = DateTime.UtcNow
                };
                _db.Users.Add(user);
            }
            else
            {
                // Backfill FirebaseUid on existing users who sign in via Firebase for the first time
                if (user.FirebaseUid == null && !string.IsNullOrWhiteSpace(request.FirebaseUid))
                {
                    user.FirebaseUid = request.FirebaseUid;
                    user.UpdatedAt   = DateTime.UtcNow;
                }
                // Backfill name if previously unknown
                if (user.Name == null && !string.IsNullOrWhiteSpace(request.Name))
                {
                    user.Name      = request.Name;
                    user.UpdatedAt = DateTime.UtcNow;
                }
            }

            await _db.SaveChangesAsync();
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

            if (request.Name != null) user.Name = request.Name;
            if (request.AvatarUrl != null) user.AvatarUrl = request.AvatarUrl;
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
                Label   = request.Label,
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
            u.FirebaseUid,
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
