using FluentMigrator;

namespace SnapTalesAPI.Data.Migrations
{
    [Migration(202604220001)]
    public class CreateUsersTable : Migration
    {
        public override void Up()
        {
            Create.Table("Users")
                .WithColumn("Id").AsGuid().PrimaryKey().NotNullable()
                .WithColumn("Name").AsString(int.MaxValue).Nullable()
                .WithColumn("Email").AsString(int.MaxValue).Nullable()
                .WithColumn("Phone").AsString(int.MaxValue).Nullable()
                .WithColumn("Role").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("AvatarUrl").AsString(int.MaxValue).Nullable()
                .WithColumn("Addresses").AsCustom("jsonb").NotNullable()
                .WithColumn("FirebaseUid").AsString(int.MaxValue).Nullable()
                .WithColumn("CreatedAt").AsDateTimeOffset().NotNullable()
                .WithColumn("UpdatedAt").AsDateTimeOffset().NotNullable();

            Execute.Sql(@"ALTER TABLE public.""Users"" ALTER COLUMN ""Addresses"" SET DEFAULT '[]'::jsonb");
            Execute.Sql(@"ALTER TABLE public.""Users"" ALTER COLUMN ""CreatedAt"" SET DEFAULT NOW()");
            Execute.Sql(@"ALTER TABLE public.""Users"" ALTER COLUMN ""UpdatedAt"" SET DEFAULT NOW()");

            Execute.Sql(@"CREATE UNIQUE INDEX ix_users_email ON public.""Users""(""Email"") WHERE ""Email"" IS NOT NULL");
            Execute.Sql(@"CREATE UNIQUE INDEX ix_users_phone ON public.""Users""(""Phone"") WHERE ""Phone"" IS NOT NULL");
            Execute.Sql(@"CREATE UNIQUE INDEX ix_users_firebase_uid ON public.""Users""(""FirebaseUid"") WHERE ""FirebaseUid"" IS NOT NULL");

            Execute.Sql(@"ALTER TABLE public.""Users"" ADD CONSTRAINT chk_users_email_or_phone CHECK (""Email"" IS NOT NULL OR ""Phone"" IS NOT NULL)");
        }

        public override void Down()
        {
            Delete.Table("Users");
        }
    }
}
