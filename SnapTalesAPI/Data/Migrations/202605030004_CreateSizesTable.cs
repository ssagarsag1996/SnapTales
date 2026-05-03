using FluentMigrator;

namespace SnapTalesAPI.Data.Migrations
{
    [Migration(202605030004)]
    public class CreateSizesTable : Migration
    {
        public override void Up()
        {
            Create.Table("Sizes")
                .WithColumn("Id").AsGuid().PrimaryKey().NotNullable()
                .WithColumn("Label").AsString(100).NotNullable()
                .WithColumn("CreatedAt").AsDateTimeOffset().NotNullable();

            Execute.Sql(@"ALTER TABLE public.""Sizes"" ALTER COLUMN ""CreatedAt"" SET DEFAULT NOW()");
            Execute.Sql(@"CREATE UNIQUE INDEX ix_sizes_label ON public.""Sizes""(""Label"")");
        }

        public override void Down()
        {
            Delete.Table("Sizes");
        }
    }

    [Migration(202605030005)]
    public class SeedSizesData : Migration
    {
        private const string Sz4x6   = "b2c3d4e5-0002-0000-0000-000000000001";
        private const string Sz5x7   = "b2c3d4e5-0002-0000-0000-000000000002";
        private const string Sz8x10  = "b2c3d4e5-0002-0000-0000-000000000003";
        private const string Sz11x14 = "b2c3d4e5-0002-0000-0000-000000000004";
        private const string Sz12x12 = "b2c3d4e5-0002-0000-0000-000000000005";
        private const string Sz12x16 = "b2c3d4e5-0002-0000-0000-000000000006";
        private const string Sz16x20 = "b2c3d4e5-0002-0000-0000-000000000007";
        private const string Sz20x24 = "b2c3d4e5-0002-0000-0000-000000000008";
        private const string Sz24x36 = "b2c3d4e5-0002-0000-0000-000000000009";

        public override void Up()
        {
            Execute.Sql($@"
                INSERT INTO public.""Sizes"" (""Id"", ""Label"", ""CreatedAt"") VALUES
                ('{Sz4x6}',   '4×6',   NOW()),
                ('{Sz5x7}',   '5×7',   NOW()),
                ('{Sz8x10}',  '8×10',  NOW()),
                ('{Sz11x14}', '11×14', NOW()),
                ('{Sz12x12}', '12×12', NOW()),
                ('{Sz12x16}', '12×16', NOW()),
                ('{Sz16x20}', '16×20', NOW()),
                ('{Sz20x24}', '20×24', NOW()),
                ('{Sz24x36}', '24×36', NOW())");
        }

        public override void Down()
        {
            Execute.Sql($@"
                DELETE FROM public.""Sizes"" WHERE ""Id"" IN (
                    '{Sz4x6}',  '{Sz5x7}',  '{Sz8x10}',  '{Sz11x14}', '{Sz12x12}',
                    '{Sz12x16}', '{Sz16x20}', '{Sz20x24}', '{Sz24x36}')");
        }
    }
}
