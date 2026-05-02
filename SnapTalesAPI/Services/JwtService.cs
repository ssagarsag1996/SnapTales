using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.Entities;

namespace SnapTalesAPI.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _config;

        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
                new(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()),
                new("role",                         user.Role.ToString()),
            };
            if (user.Email != null) claims.Add(new(JwtRegisteredClaimNames.Email, user.Email));
            if (user.Name  != null) claims.Add(new("name", user.Name));

            var token = new JwtSecurityToken(
                issuer:             _config["Jwt:Issuer"],
                audience:           _config["Jwt:Audience"],
                claims:             claims,
                expires:            DateTime.UtcNow.AddMinutes(
                                        double.Parse(_config["Jwt:ExpiryMinutes"] ?? "5")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
