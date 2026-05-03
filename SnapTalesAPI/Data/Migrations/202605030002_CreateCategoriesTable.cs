using FluentMigrator;

namespace SnapTalesAPI.Data.Migrations
{
    [Migration(202605030002)]
    public class CreateCategoriesTable : Migration
    {
        public override void Up()
        {
            Create.Table("Categories")
                .WithColumn("Id").AsGuid().PrimaryKey().NotNullable()
                .WithColumn("Name").AsString(int.MaxValue).NotNullable()
                .WithColumn("CreatedAt").AsDateTimeOffset().NotNullable();

            Execute.Sql(@"ALTER TABLE public.""Categories"" ALTER COLUMN ""CreatedAt"" SET DEFAULT NOW()");
        }

        public override void Down()
        {
            Delete.Table("Categories");
        }
    }

    [Migration(202605030003)]
    public class SeedCategoriesData : Migration
    {
        private const string CatClassic = "a1b2c3d4-0001-0000-0000-000000000001";
        private const string CatModern  = "a1b2c3d4-0001-0000-0000-000000000002";
        private const string CatOrnate  = "a1b2c3d4-0001-0000-0000-000000000003";
        private const string CatMinimal = "a1b2c3d4-0001-0000-0000-000000000004";
        private const string CatRustic  = "a1b2c3d4-0001-0000-0000-000000000005";
        private const string CatGallery = "a1b2c3d4-0001-0000-0000-000000000006";

        public override void Up()
        {
            Execute.Sql($@"
                INSERT INTO public.""Categories"" (""Id"", ""Name"", ""CreatedAt"") VALUES
                ('{CatClassic}', 'Classic', NOW()),
                ('{CatModern}',  'Modern',  NOW()),
                ('{CatOrnate}',  'Ornate',  NOW()),
                ('{CatMinimal}', 'Minimal', NOW()),
                ('{CatRustic}',  'Rustic',  NOW()),
                ('{CatGallery}', 'Gallery', NOW())");
        }

        public override void Down()
        {
            Execute.Sql($@"
                DELETE FROM public.""Categories"" WHERE ""Id"" IN (
                    '{CatClassic}', '{CatModern}', '{CatOrnate}',
                    '{CatMinimal}', '{CatRustic}',  '{CatGallery}')");
        }
    }
}
