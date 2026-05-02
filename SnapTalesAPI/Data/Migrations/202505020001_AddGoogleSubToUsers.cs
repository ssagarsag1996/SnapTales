using FluentMigrator;

namespace SnapTalesAPI.Data.Migrations
{
    [Migration(202505020001)]
    public class AddGoogleSubToUsers : Migration
    {
        public override void Up()
        {
            // Add GoogleSub column — stores Google's stable "sub" claim from the ID token
            Alter.Table("Users").AddColumn("GoogleSub").AsString(int.MaxValue).Nullable();

            // Unique partial index (only enforced for non-null values)
            Execute.Sql(@"
                CREATE UNIQUE INDEX ix_users_google_sub
                ON public.""Users""(""GoogleSub"")
                WHERE ""GoogleSub"" IS NOT NULL");

            // Relax the identifier constraint so GoogleSub alone is enough to create an account
            // (Google always provides an email, but being future-proof here)
            Execute.Sql(@"ALTER TABLE public.""Users"" DROP CONSTRAINT IF EXISTS chk_users_email_or_phone");
            Execute.Sql(@"
                ALTER TABLE public.""Users""
                ADD CONSTRAINT chk_users_identifier
                CHECK (
                    ""Email""      IS NOT NULL OR
                    ""Phone""      IS NOT NULL OR
                    ""FirebaseUid"" IS NOT NULL OR
                    ""GoogleSub""  IS NOT NULL
                )");
        }

        public override void Down()
        {
            Execute.Sql(@"ALTER TABLE public.""Users"" DROP CONSTRAINT IF EXISTS chk_users_identifier");
            Execute.Sql(@"DROP INDEX IF EXISTS ix_users_google_sub");
            Delete.Column("GoogleSub").FromTable("Users");
            Execute.Sql(@"
                ALTER TABLE public.""Users""
                ADD CONSTRAINT chk_users_email_or_phone
                CHECK (""Email"" IS NOT NULL OR ""Phone"" IS NOT NULL)");
        }
    }
}
