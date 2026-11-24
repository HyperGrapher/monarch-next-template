import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_pages_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_services_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_projects_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_home_page_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "_pages_v_autosave_idx";
  DROP INDEX "_services_v_autosave_idx";
  DROP INDEX "_projects_v_autosave_idx";
  DROP INDEX "_posts_v_autosave_idx";
  DROP INDEX "_home_page_v_autosave_idx";
  ALTER TABLE "_pages_v" DROP COLUMN "autosave";
  ALTER TABLE "_services_v" DROP COLUMN "autosave";
  ALTER TABLE "_projects_v" DROP COLUMN "autosave";
  ALTER TABLE "_posts_v" DROP COLUMN "autosave";
  ALTER TABLE "_home_page_v" DROP COLUMN "autosave";`)
}
