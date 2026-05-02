using FluentMigrator;

namespace SnapTalesAPI.Data.Migrations
{
    [Migration(202604280001)]
    public class SeedProductImages : Migration
    {
        private const string Prod1  = "c3d4e5f6-0003-0000-0000-000000000001";
        private const string Prod2  = "c3d4e5f6-0003-0000-0000-000000000002";
        private const string Prod3  = "c3d4e5f6-0003-0000-0000-000000000003";
        private const string Prod4  = "c3d4e5f6-0003-0000-0000-000000000004";
        private const string Prod5  = "c3d4e5f6-0003-0000-0000-000000000005";
        private const string Prod6  = "c3d4e5f6-0003-0000-0000-000000000006";

        public override void Up()
        {
            // Assign one dummy frame image to the first 6 products
            Execute.Sql($@"UPDATE public.""Products"" SET ""Images"" = '[""images/products/frame-classic.svg""]' WHERE ""Id"" = '{Prod1}'");
            Execute.Sql($@"UPDATE public.""Products"" SET ""Images"" = '[""images/products/frame-modern.svg""]'  WHERE ""Id"" = '{Prod2}'");
            Execute.Sql($@"UPDATE public.""Products"" SET ""Images"" = '[""images/products/frame-ornate.svg""]'  WHERE ""Id"" = '{Prod3}'");
            Execute.Sql($@"UPDATE public.""Products"" SET ""Images"" = '[""images/products/frame-rustic.svg""]'  WHERE ""Id"" = '{Prod4}'");
            Execute.Sql($@"UPDATE public.""Products"" SET ""Images"" = '[""images/products/frame-minimal.svg""]' WHERE ""Id"" = '{Prod5}'");
            Execute.Sql($@"UPDATE public.""Products"" SET ""Images"" = '[""images/products/frame-gallery.svg""]' WHERE ""Id"" = '{Prod6}'");
        }

        public override void Down()
        {
            Execute.Sql($@"UPDATE public.""Products"" SET ""Images"" = '[]' WHERE ""Id"" IN ('{Prod1}','{Prod2}','{Prod3}','{Prod4}','{Prod5}','{Prod6}')");
        }
    }
}
