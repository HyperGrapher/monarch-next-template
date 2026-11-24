import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Data-only migration (no schema change).
 *
 * The home page global used to be readable by anyone (`read: () => true`), so visitors saw the MAIN
 * row whatever its `_status` was — and `pnpm seed` (updateGlobal without `_status`) left it as 'draft'.
 * Read access is now "published or staff", so mark the main row as published: it is exactly the
 * content visitors see today. Draft saves only write to `_home_page_v`, so no unpublished edit is exposed.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "home_page" SET "_status" = 'published' WHERE "_status" IS DISTINCT FROM 'published';`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Nothing to undo: with the old read access the status did not matter.
}
