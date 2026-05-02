using FluentMigrator;

namespace SnapTalesAPI.Data.Migrations
{
    [Migration(202505020001)]
    public class AddGoogleSubToUsers : Migration
    {
        public override void Up()
        {
            // ── Add GoogleSub ─────────────────────────────────────────────────
            Alter.Table("Users").AddColumn("GoogleSub").AsString(int.MaxValue).Nullable();

            Execute.Sql(@"
                CREATE UNIQUE INDEX ix_users_google_sub
                ON public.""Users""(""GoogleSub"")
                WHERE ""GoogleSub"" IS NOT NULL");

            // ── Remove FirebaseUid — no longer used ───────────────────────────
            Execute.Sql(@"DROP INDEX IF EXISTS ix_users_firebase_uid");
            Delete.Column("FirebaseUid").FromTable("Users");

            // ── Replace identifier constraint ─────────────────────────────────
            Execute.Sql(@"ALTER TABLE public.""Users"" DROP CONSTRAINT IF EXISTS chk_users_email_or_phone");
            Execute.Sql(@"ALTER TABLE public.""Users"" DROP CONSTRAINT IF EXISTS chk_users_identifier");
            Execute.Sql(@"
                ALTER TABLE public.""Users""
                ADD CONSTRAINT chk_users_identifier
                CHECK (
                    ""Email""     IS NOT NULL OR
                    ""Phone""     IS NOT NULL OR
                    ""GoogleSub"" IS NOT NULL
                )");
        }

        public override void Down()
        {
            Execute.Sql(@"ALTER TABLE public.""Users"" DROP CONSTRAINT IF EXISTS chk_users_identifier");
            Execute.Sql(@"DROP INDEX IF EXISTS ix_users_google_sub");
            Delete.Column("GoogleSub").FromTable("Users");

            // Restore FirebaseUid
            Alter.Table("Users").AddColumn("FirebaseUid").AsString(int.MaxValue).Nullable();
            Execute.Sql(@"
                CREATE UNIQUE INDEX ix_users_firebase_uid
                ON public.""Users""(""FirebaseUid"")
                WHERE ""FirebaseUid"" IS NOT NULL");

            Execute.Sql(@"
                ALTER TABLE public.""Users""
                ADD CONSTRAINT chk_users_email_or_phone
                CHECK (""Email"" IS NOT NULL OR ""Phone"" IS NOT NULL)");
        }
    }
}
