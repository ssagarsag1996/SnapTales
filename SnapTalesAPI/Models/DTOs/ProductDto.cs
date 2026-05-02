namespace SnapTalesAPI.Models.DTOs
{
    public record CategoryResponse(Guid Id, string Name, int ProductCount);

    public record SizeResponse(Guid Id, string Label);

    public record ProductResponse(
        Guid Id,
        Guid CategoryId,
        string CategoryName,
        string Name,
        decimal Price,
        decimal? OriginalPrice,
        bool IsSale,
        string Description,
        int Stock,
        string Sku,
        decimal Rating,
        int ReviewCount,
        IReadOnlyList<SizeResponse> Sizes,
        IReadOnlyList<string> Images,
        string? OverlayImage,
        int AperturePercent,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );

    public record CreateCategoryRequest(string Name);
    public record RenameCategoryRequest(string Name);

    public record CreateSizeRequest(string Label);
    public record RenameSizeRequest(string Label);

    public record CreateProductRequest(
        Guid CategoryId,
        string Name,
        decimal Price,
        decimal? OriginalPrice,
        bool IsSale,
        string Description,
        int Stock,
        string Sku,
        decimal Rating,
        int ReviewCount,
        List<Guid> SizeIds,
        int? AperturePercent = null
    );

    public record UpdateProductRequest(
        Guid? CategoryId,
        string? Name,
        decimal? Price,
        decimal? OriginalPrice,
        bool? IsSale,
        string? Description,
        int? Stock,
        string? Sku,
        decimal? Rating,
        int? ReviewCount,
        List<Guid>? SizeIds,
        int? AperturePercent = null
    );
}
