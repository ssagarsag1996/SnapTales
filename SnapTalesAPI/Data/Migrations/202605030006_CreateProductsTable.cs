using FluentMigrator;

namespace SnapTalesAPI.Data.Migrations
{
    [Migration(202605030006)]
    public class CreateProductsTable : Migration
    {
        public override void Up()
        {
            Create.Table("Products")
                .WithColumn("Id").AsGuid().PrimaryKey().NotNullable()
                .WithColumn("CategoryId").AsGuid().NotNullable()
                    .ForeignKey("fk_products_category", "Categories", "Id")
                .WithColumn("Name").AsString(int.MaxValue).NotNullable()
                .WithColumn("Price").AsDecimal(18, 2).NotNullable()
                .WithColumn("OriginalPrice").AsDecimal(18, 2).Nullable()
                .WithColumn("IsSale").AsBoolean().NotNullable().WithDefaultValue(false)
                .WithColumn("Description").AsString(int.MaxValue).NotNullable()
                .WithColumn("Stock").AsInt32().NotNullable()
                .WithColumn("Sku").AsString(int.MaxValue).NotNullable()
                .WithColumn("Rating").AsDecimal(3, 1).NotNullable()
                .WithColumn("ReviewCount").AsInt32().NotNullable()
                .WithColumn("SizeIds").AsCustom("jsonb").NotNullable()
                .WithColumn("Images").AsCustom("jsonb").NotNullable()
                .WithColumn("OverlayImage").AsString(int.MaxValue).Nullable()
                .WithColumn("AperturePercent").AsInt32().NotNullable().WithDefaultValue(15)
                .WithColumn("CreatedAt").AsDateTimeOffset().NotNullable()
                .WithColumn("UpdatedAt").AsDateTimeOffset().NotNullable();

            Execute.Sql(@"ALTER TABLE public.""Products"" ALTER COLUMN ""SizeIds""   SET DEFAULT '[]'::jsonb");
            Execute.Sql(@"ALTER TABLE public.""Products"" ALTER COLUMN ""Images""    SET DEFAULT '[]'::jsonb");
            Execute.Sql(@"ALTER TABLE public.""Products"" ALTER COLUMN ""CreatedAt"" SET DEFAULT NOW()");
            Execute.Sql(@"ALTER TABLE public.""Products"" ALTER COLUMN ""UpdatedAt"" SET DEFAULT NOW()");
            Execute.Sql(@"CREATE UNIQUE INDEX ix_products_sku ON public.""Products""(""Sku"")");
        }

        public override void Down()
        {
            Delete.Table("Products");
        }
    }

    [Migration(202605030007)]
    public class SeedProductsData : Migration
    {
        // ── Category GUIDs (must match SeedCategoriesData) ────────────────────
        private const string CatClassic = "a1b2c3d4-0001-0000-0000-000000000001";
        private const string CatModern  = "a1b2c3d4-0001-0000-0000-000000000002";
        private const string CatOrnate  = "a1b2c3d4-0001-0000-0000-000000000003";
        private const string CatMinimal = "a1b2c3d4-0001-0000-0000-000000000004";
        private const string CatRustic  = "a1b2c3d4-0001-0000-0000-000000000005";
        private const string CatGallery = "a1b2c3d4-0001-0000-0000-000000000006";

        // ── Size GUIDs (must match SeedSizesData) ─────────────────────────────
        private const string Sz4x6   = "b2c3d4e5-0002-0000-0000-000000000001";
        private const string Sz5x7   = "b2c3d4e5-0002-0000-0000-000000000002";
        private const string Sz8x10  = "b2c3d4e5-0002-0000-0000-000000000003";
        private const string Sz11x14 = "b2c3d4e5-0002-0000-0000-000000000004";
        private const string Sz12x12 = "b2c3d4e5-0002-0000-0000-000000000005";
        private const string Sz12x16 = "b2c3d4e5-0002-0000-0000-000000000006";
        private const string Sz16x20 = "b2c3d4e5-0002-0000-0000-000000000007";
        private const string Sz20x24 = "b2c3d4e5-0002-0000-0000-000000000008";
        private const string Sz24x36 = "b2c3d4e5-0002-0000-0000-000000000009";

        // ── Product GUIDs ─────────────────────────────────────────────────────
        private const string Prod1  = "c3d4e5f6-0003-0000-0000-000000000001";
        private const string Prod2  = "c3d4e5f6-0003-0000-0000-000000000002";
        private const string Prod3  = "c3d4e5f6-0003-0000-0000-000000000003";
        private const string Prod4  = "c3d4e5f6-0003-0000-0000-000000000004";
        private const string Prod5  = "c3d4e5f6-0003-0000-0000-000000000005";
        private const string Prod6  = "c3d4e5f6-0003-0000-0000-000000000006";
        private const string Prod7  = "c3d4e5f6-0003-0000-0000-000000000007";
        private const string Prod8  = "c3d4e5f6-0003-0000-0000-000000000008";
        private const string Prod9  = "c3d4e5f6-0003-0000-0000-000000000009";
        private const string Prod10 = "c3d4e5f6-0003-0000-0000-000000000010";
        private const string Prod11 = "c3d4e5f6-0003-0000-0000-000000000011";
        private const string Prod12 = "c3d4e5f6-0003-0000-0000-000000000012";

        // Builds a JSON array of quoted GUIDs: ["id1","id2",...]
        private static string Ids(params string[] guids) =>
            "[" + string.Join(",", guids.Select(g => $"\"{g}\"")) + "]";

        // Returns thumbnail path, overlay path, and aperture % for a given category
        private static (string Thumb, string Overlay, int Aperture) CategoryAssets(string catId) =>
            catId switch
            {
                CatClassic => ("images/products/thumbnails/sample-classic-thumb.png", "images/products/overlays/sample-classic.png", 18),
                CatModern  => ("images/products/thumbnails/sample-modern-thumb.png",  "images/products/overlays/sample-modern.png",  10),
                CatOrnate  => ("images/products/thumbnails/sample-ornate-thumb.png",  "images/products/overlays/sample-ornate.png",  19),
                CatMinimal => ("images/products/thumbnails/sample-minimal-thumb.png", "images/products/overlays/sample-minimal.png",  5),
                CatRustic  => ("images/products/thumbnails/sample-rustic-thumb.png",  "images/products/overlays/sample-rustic.png",  16),
                CatGallery => ("images/products/thumbnails/sample-gallery-thumb.png", "images/products/overlays/sample-gallery.png", 12),
                _          => throw new ArgumentOutOfRangeException(nameof(catId))
            };

        public override void Up()
        {
            // Classic
            Seed(Prod1,  CatClassic, "Classic Walnut Frame",    49.99m,  69.99m, true,
                "Handcrafted walnut wood frame with a rich, warm finish. Perfect for family portraits and traditional art prints. Each piece is carefully sanded and finished with natural oils.",
                45, "ST-CW-001", 4.8m, 234, Ids(Sz5x7, Sz8x10, Sz11x14, Sz16x20));

            Seed(Prod7,  CatClassic, "Cherry Blossom Frame",    59.99m,  null,   false,
                "Premium cherry wood with a warm reddish tone. Hand-polished to a satin finish for timeless elegance.",
                28, "ST-CB-007", 4.8m,  89, Ids(Sz5x7, Sz8x10, Sz11x14));

            // Modern
            Seed(Prod2,  CatModern,  "Midnight Matte Frame",    34.99m,  null,   false,
                "Sleek matte black finish with clean lines. A contemporary choice that makes your photos the focus of attention.",
                78, "ST-MM-002", 4.6m, 182, Ids(Sz4x6, Sz5x7, Sz8x10, Sz12x16));

            Seed(Prod8,  CatModern,  "Brushed Steel Frame",     44.99m,  59.99m, true,
                "Industrial brushed stainless steel frame. A bold, modern statement for contemporary spaces.",
                52, "ST-BS-008", 4.3m, 156, Ids(Sz4x6, Sz8x10, Sz12x16, Sz16x20));

            // Ornate
            Seed(Prod3,  CatOrnate,  "Gilded Baroque Frame",    89.99m, 119.99m, true,
                "Stunning gold-leafed frame with intricate baroque detailing. A statement piece for fine art and cherished portraits.",
                12, "ST-GB-003", 4.9m,  97, Ids(Sz8x10, Sz11x14, Sz16x20, Sz20x24));

            Seed(Prod9,  CatOrnate,  "Victorian Gold Frame",   109.99m,  null,   false,
                "Intricately carved gold frame inspired by Victorian era craftsmanship. A true collector''s piece.",
                 8, "ST-VG-009", 4.9m,  63, Ids(Sz11x14, Sz16x20, Sz20x24));

            // Minimal
            Seed(Prod4,  CatMinimal, "White Float Frame",       29.99m,  null,   false,
                "Minimalist white frame with a float effect. Creates the illusion of artwork suspended in air.",
                120, "ST-WF-004", 4.5m, 312, Ids(Sz5x7, Sz8x10, Sz11x14));

            Seed(Prod10, CatMinimal, "Nordic Birch Frame",      27.99m,  null,   false,
                "Light Scandinavian birch wood frame with a clean, airy aesthetic. Perfect for creating gallery walls.",
                95, "ST-NB-010", 4.6m, 201, Ids(Sz4x6, Sz5x7, Sz8x10, Sz11x14));

            // Rustic
            Seed(Prod5,  CatRustic,  "Barnwood Rustic Frame",   54.99m,  74.99m, true,
                "Reclaimed barnwood frame with natural weathered texture. Each piece is unique with authentic character.",
                33, "ST-BR-005", 4.7m, 145, Ids(Sz5x7, Sz8x10, Sz11x14, Sz16x20));

            Seed(Prod11, CatRustic,  "Driftwood Coastal Frame", 64.99m,  79.99m, true,
                "Genuine driftwood frame with ocean-weathered character. Brings coastal charm to any room.",
                22, "ST-DC-011", 4.7m, 112, Ids(Sz5x7, Sz8x10, Sz11x14));

            // Gallery
            Seed(Prod6,  CatGallery, "Gallery Slim Frame",      39.99m,  null,   false,
                "Ultra-slim profile frame used by professional galleries. Museum-quality with UV-protective glazing.",
                65, "ST-GS-006", 4.4m, 267, Ids(Sz8x10, Sz11x14, Sz16x20, Sz24x36));

            Seed(Prod12, CatGallery, "Shadow Box Deep Frame",   49.99m,  null,   false,
                "Deep profile shadow box for displaying 3D objects, memorabilia, and layered art compositions.",
                41, "ST-SB-012", 4.5m, 178, Ids(Sz8x10, Sz11x14, Sz12x12, Sz16x20));
        }

        public override void Down()
        {
            Execute.Sql($@"
                DELETE FROM public.""Products"" WHERE ""Id"" IN (
                    '{Prod1}','{Prod2}','{Prod3}','{Prod4}','{Prod5}','{Prod6}',
                    '{Prod7}','{Prod8}','{Prod9}','{Prod10}','{Prod11}','{Prod12}')");
        }

        private void Seed(
            string id, string categoryId, string name,
            decimal price, decimal? originalPrice, bool isSale,
            string description, int stock, string sku,
            decimal rating, int reviewCount, string sizeIds)
        {
            var (thumb, overlay, aperture) = CategoryAssets(categoryId);
            var origVal = originalPrice.HasValue ? originalPrice.Value.ToString("F2") : "NULL";

            Execute.Sql($@"
                INSERT INTO public.""Products""
                    (""Id"", ""CategoryId"", ""Name"", ""Price"", ""OriginalPrice"", ""IsSale"",
                     ""Description"", ""Stock"", ""Sku"", ""Rating"", ""ReviewCount"",
                     ""SizeIds"", ""Images"", ""OverlayImage"", ""AperturePercent"", ""CreatedAt"", ""UpdatedAt"")
                VALUES (
                    '{id}', '{categoryId}', '{name}', {price:F2}, {origVal}, {(isSale ? "true" : "false")},
                    '{description}', {stock}, '{sku}', {rating:F1}, {reviewCount},
                    '{sizeIds}', '[""{thumb}""]', '{overlay}', {aperture}, NOW(), NOW()
                )");
        }
    }
}
