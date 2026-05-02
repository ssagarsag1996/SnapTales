using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categories;

        public CategoriesController(ICategoryService categories) => _categories = categories;

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _categories.GetAllAsync());

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var cat = await _categories.GetByIdAsync(id);
            return cat == null ? NotFound() : Ok(cat);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest(new { error = "Name is required." });

            var cat = await _categories.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] RenameCategoryRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest(new { error = "Name is required." });

            var cat = await _categories.UpdateAsync(id, request);
            return cat == null ? NotFound() : Ok(cat);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var (success, error) = await _categories.DeleteAsync(id);
            if (!success && error == null) return NotFound();
            if (!success) return BadRequest(new { error });
            return NoContent();
        }
    }
}
