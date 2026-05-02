using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace SnapTalesAPI.Services
{
    /// <summary>
    /// Generates sample frame PNG images on first API startup:
    ///  • Overlays  — transparent center, opaque frame border (used by Preview tool)
    ///  • Thumbnails — same border but opaque warm-white center (used as product images in shop)
    /// Both are skipped if the files already exist.
    /// Admin replaces thumbnails with real product photos via the admin panel.
    /// Admin replaces overlays with real transparent PNGs via the admin panel.
    /// </summary>
    public class SampleOverlayService
    {
        // Warm off-white center for thumbnails — simulates empty glass in a frame
        private static readonly Rgba32 ThumbnailCenter = new(245, 242, 238, 255);

        private static readonly FrameSpec[] Specs =
        [
            // ── Classic Walnut ─────────────────────────────────────────────────
            F("sample-classic", 18,
                (0.00f, "#2E1A0A"), (0.05f, "#7A4E28"), (0.38f, "#9B6B3A"),
                (0.52f, "#7A4E28"), (0.80f, "#4A2D14"), (0.90f, "#3D2010"),
                (0.94f, "#C8A020"), (0.98f, "#A08010"), (1.00f, "#1E0D04")),

            // ── Modern Matte Black ─────────────────────────────────────────────
            F("sample-modern", 10,
                (0.00f, "#111111"), (0.06f, "#2C2C2C"), (0.70f, "#383838"),
                (0.88f, "#505050"), (0.95f, "#909090"), (1.00f, "#1A1A1A")),

            // ── Ornate Baroque Gold ────────────────────────────────────────────
            F("sample-ornate", 19,
                (0.00f, "#4A3800"), (0.04f, "#B8920A"), (0.16f, "#E8D040"),
                (0.32f, "#C8A020"), (0.55f, "#DCC030"), (0.68f, "#B89000"),
                (0.80f, "#E8D040"), (0.92f, "#C8A020"), (0.97f, "#8A6A00"),
                (1.00f, "#5A4400")),

            // ── Rustic Reclaimed Wood ──────────────────────────────────────────
            F("sample-rustic", 16,
                (0.00f, "#1E0E00"), (0.06f, "#6B3D15"), (0.28f, "#8B5A2B"),
                (0.50f, "#9C6A35"), (0.68f, "#7A4E20"), (0.84f, "#5C3010"),
                (0.95f, "#3D1E08"), (1.00f, "#1E0A00")),

            // ── Minimal Paper White ────────────────────────────────────────────
            F("sample-minimal", 5,
                (0.00f, "#A8A098"), (0.18f, "#D0C8C0"), (0.50f, "#EEEAE4"),
                (0.80f, "#E4E0DC"), (1.00f, "#C4C0BC")),

            // ── Gallery Black + White Mat ──────────────────────────────────────
            F("sample-gallery", 12,
                (0.00f, "#111111"), (0.05f, "#1C1C1C"), (0.48f, "#1A1A1A"),
                (0.52f, "#C0BCB6"), (0.60f, "#F0EDE8"), (0.88f, "#E8E5E0"),
                (1.00f, "#D0CCC6")),
        ];

        public async Task GenerateSamplesAsync(string webRootPath)
        {
            var overlayFolder    = Path.Combine(webRootPath, "images", "products", "overlays");
            var thumbnailFolder  = Path.Combine(webRootPath, "images", "products", "thumbnails");
            Directory.CreateDirectory(overlayFolder);
            Directory.CreateDirectory(thumbnailFolder);

            foreach (var spec in Specs)
            {
                var overlayPath   = Path.Combine(overlayFolder,   $"{spec.BaseName}.png");
                var thumbPath     = Path.Combine(thumbnailFolder, $"{spec.BaseName}-thumb.png");

                var tasks = new List<Task>();

                if (!File.Exists(overlayPath))
                    tasks.Add(Task.Run(() => WriteOverlayPng(overlayPath, spec)));

                if (!File.Exists(thumbPath))
                    tasks.Add(Task.Run(() => WriteThumbnailPng(thumbPath, spec)));

                await Task.WhenAll(tasks);
            }
        }

        // ── Overlay PNG — transparent center ─────────────────────────────────

        private static void WriteOverlayPng(string outputPath, FrameSpec spec)
        {
            WritePng(outputPath, spec, centerColor: null);
        }

        // ── Thumbnail PNG — opaque warm-white center (empty frame look) ───────

        private static void WriteThumbnailPng(string outputPath, FrameSpec spec)
        {
            WritePng(outputPath, spec, centerColor: ThumbnailCenter);
        }

        // ── Shared pixel writer ───────────────────────────────────────────────

        private static void WritePng(string outputPath, FrameSpec spec, Rgba32? centerColor)
        {
            const int Size = 800;
            int aperturePx = Size * spec.AperturePct / 100;
            var stops = spec.Stops;
            var center = centerColor ?? new Rgba32(0, 0, 0, 0); // null = transparent

            using var image = new Image<Rgba32>(Size, Size);

            image.ProcessPixelRows(accessor =>
            {
                for (int y = 0; y < Size; y++)
                {
                    var row = accessor.GetRowSpan(y);
                    for (int x = 0; x < Size; x++)
                    {
                        int dist = Math.Min(
                            Math.Min(x, Size - 1 - x),
                            Math.Min(y, Size - 1 - y));

                        row[x] = dist < aperturePx
                            ? GradientColor(stops, (float)dist / aperturePx)
                            : center;
                    }
                }
            });

            image.SaveAsPng(outputPath);
        }

        // ── Gradient helpers ──────────────────────────────────────────────────

        private static Rgba32 GradientColor((float t, Rgba32 c)[] stops, float t)
        {
            for (int i = 0; i < stops.Length - 1; i++)
            {
                if (t <= stops[i + 1].t)
                {
                    float f = (t - stops[i].t) / (stops[i + 1].t - stops[i].t);
                    return Lerp(stops[i].c, stops[i + 1].c, f);
                }
            }
            return stops[^1].c;
        }

        private static Rgba32 Lerp(Rgba32 a, Rgba32 b, float f) =>
            new((byte)(a.R + (b.R - a.R) * f),
                (byte)(a.G + (b.G - a.G) * f),
                (byte)(a.B + (b.B - a.B) * f),
                255);

        // ── Helpers ───────────────────────────────────────────────────────────

        private static FrameSpec F(string baseName, int pct, params (float t, string hex)[] raw) =>
            new(baseName, pct, raw.Select(r => (r.t, Hex(r.hex))).ToArray());

        private static Rgba32 Hex(string h)
        {
            h = h.TrimStart('#');
            return new Rgba32(
                Convert.ToByte(h[0..2], 16),
                Convert.ToByte(h[2..4], 16),
                Convert.ToByte(h[4..6], 16),
                255);
        }

        private sealed record FrameSpec(string BaseName, int AperturePct, (float t, Rgba32 c)[] Stops);
    }
}
