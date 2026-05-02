using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _users;

        public UsersController(IUserService users)
        {
            _users = users;
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _users.GetByIdAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        [Authorize]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserRequest request)
        {
            var user = await _users.UpdateAsync(id, request);
            return user == null ? NotFound() : Ok(user);
        }

        [Authorize]
        [HttpPost("{id:guid}/addresses")]
        public async Task<IActionResult> AddAddress(Guid id, [FromBody] AddressRequest request)
        {
            var user = await _users.AddAddressAsync(id, request);
            return user == null ? NotFound() : Ok(user);
        }

        [Authorize]
        [HttpDelete("{id:guid}/addresses/{index:int}")]
        public async Task<IActionResult> RemoveAddress(Guid id, int index)
        {
            var user = await _users.RemoveAddressAsync(id, index);
            return user == null ? NotFound() : Ok(user);
        }
    }
}
