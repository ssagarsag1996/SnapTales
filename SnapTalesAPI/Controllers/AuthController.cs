using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IUserService users, IConfiguration config) : ControllerBase
    {
        /// <summary>
        /// Exchange a Google ID Token (from Google Identity Services in the browser)
        /// for a SnapTales JWT. Creates the user account on first sign-in.
        /// </summary>
        [HttpPost("google")]
        public async Task<IActionResult> Google([FromBody] GoogleAuthRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.IdToken))
                return BadRequest(new { error = "idToken is required." });

            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { config["Google:ClientId"] },
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(req.IdToken, settings);

                var result = await users.FindOrCreateByGoogleAsync(
                    googleSub: payload.Subject,
                    email:     payload.Email,
                    name:      payload.Name,
                    avatarUrl: payload.Picture
                );

                return Ok(result);
            }
            catch (InvalidJwtException ex)
            {
                return Unauthorized(new { error = "Invalid Google token.", detail = ex.Message });
            }
        }
    }
}
