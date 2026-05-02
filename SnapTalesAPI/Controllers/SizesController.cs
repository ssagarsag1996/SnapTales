using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Controllers
{
    [ApiController]
    [Route("api/sizes")]
    public class SizesController : ControllerBase
    {
        private readonly ISizeService _sizes;

        public SizesController(ISizeService sizes) => _sizes = sizes;

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _sizes.GetAllAsync());

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSizeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Label))
                return BadRequest(new { error = "Label is required." });

            var size = await _sizes.CreateAsync(request);
            return CreatedAtAction(nameof(GetAll), size);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] RenameSizeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Label))
                return BadRequest(new { error = "Label is required." });

            var size = await _sizes.UpdateAsync(id, request);
            return size == null ? NotFound() : Ok(size);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var (success, error) = await _sizes.DeleteAsync(id);
            if (!success && error == null) return NotFound();
            if (!success) return BadRequest(new { error });
            return NoContent();
        }
    }
}
