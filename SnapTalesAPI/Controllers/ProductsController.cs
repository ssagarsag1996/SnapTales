using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SnapTalesAPI.Interfaces;
using SnapTalesAPI.Models.DTOs;

namespace SnapTalesAPI.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _products;
        private readonly IWebHostEnvironment _env;

        public ProductsController(IProductService products, IWebHostEnvironment env)
        {
            _products = products;
            _env      = env;
        }

        // ── Public read endpoints ─────────────────────────────────────────────

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _products.GetAllAsync());

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _products.GetByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpGet("category/{categoryId:guid}")]
        public async Task<IActionResult> GetByCategory(Guid categoryId) =>
            Ok(await _products.GetByCategoryAsync(categoryId));

        // ── Admin write endpoints ─────────────────────────────────────────────

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductRequest request)
        {
            var product = await _products.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductRequest request)
        {
            var product = await _products.UpdateAsync(id, request);
            return product == null ? NotFound() : Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var images = await _products.DeleteAsync(id);
            if (images == null) return NotFound();

            // Delete associated image files from disk
            foreach (var path in images.Split('|', StringSplitOptions.RemoveEmptyEntries))
                DeleteFile(path);

            return NoContent();
        }

        // ── Image upload / remove ─────────────────────────────────────────────

        [Authorize(Roles = "Admin")]
        [HttpPost("{id:guid}/images")]
        public async Task<IActionResult> UploadImage(Guid id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file provided." });

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (ext is not (".jpg" or ".jpeg" or ".png" or ".webp"))
                return BadRequest(new { error = "Allowed formats: jpg, png, webp." });

            var folder = Path.Combine(_env.WebRootPath, "images", "products");
            Directory.CreateDirectory(folder);

            var fileName = $"{Guid.NewGuid()}{ext}";
            var filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
                await file.CopyToAsync(stream);

            var relativePath = $"images/products/{fileName}";
            var product = await _products.AddImageAsync(id, relativePath);
            return product == null ? NotFound() : Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:guid}/images/{index:int}")]
        public async Task<IActionResult> RemoveImage(Guid id, int index)
        {
            // Get the product first to retrieve the path before removal
            var existing = await _products.GetByIdAsync(id);
            if (existing == null) return NotFound();
            if (index < 0 || index >= existing.Images.Count)
                return BadRequest(new { error = "Invalid image index." });

            var pathToDelete = existing.Images[index];
            var product      = await _products.RemoveImageAsync(id, index);
            if (product == null) return NotFound();

            DeleteFile(pathToDelete);
            return Ok(product);
        }

        // ── Overlay upload / remove ───────────────────────────────────────────

        [Authorize(Roles = "Admin")]
        [HttpPost("{id:guid}/overlay")]
        public async Task<IActionResult> UploadOverlay(Guid id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file provided." });

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (ext is not (".png" or ".webp"))
                return BadRequest(new { error = "Overlay must be a PNG or WebP file (transparency required)." });

            // Delete existing overlay file if present
            var existing = await _products.GetByIdAsync(id);
            if (existing == null) return NotFound();
            if (existing.OverlayImage != null) DeleteFile(existing.OverlayImage);

            var folder = Path.Combine(_env.WebRootPath, "images", "products", "overlays");
            Directory.CreateDirectory(folder);

            var fileName = $"{Guid.NewGuid()}{ext}";
            var filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
                await file.CopyToAsync(stream);

            var relativePath = $"images/products/overlays/{fileName}";
            var product = await _products.SetOverlayImageAsync(id, relativePath);
            return product == null ? NotFound() : Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:guid}/overlay")]
        public async Task<IActionResult> RemoveOverlay(Guid id)
        {
            var existing = await _products.GetByIdAsync(id);
            if (existing == null) return NotFound();

            if (existing.OverlayImage != null) DeleteFile(existing.OverlayImage);

            var product = await _products.ClearOverlayImageAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        // ── Helpers ───────────────────────────────────────────────────────────

        private void DeleteFile(string relativePath)
        {
            try
            {
                var full = Path.Combine(_env.WebRootPath, relativePath.Replace('/', Path.DirectorySeparatorChar));
                if (System.IO.File.Exists(full))
                    System.IO.File.Delete(full);
            }
            catch { /* non-critical */ }
        }
    }
}
