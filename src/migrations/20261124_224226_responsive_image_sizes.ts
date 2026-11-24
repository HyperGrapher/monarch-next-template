import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "media" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w480_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w480_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w480_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w480_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w480_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w480_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w800_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w800_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w800_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w800_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w800_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w800_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1200_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1200_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1200_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1200_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1200_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1200_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_filename" varchar;
  CREATE INDEX "media_sizes_w480_sizes_w480_filename_idx" ON "media" USING btree ("sizes_w480_filename");
  CREATE INDEX "media_sizes_w800_sizes_w800_filename_idx" ON "media" USING btree ("sizes_w800_filename");
  CREATE INDEX "media_sizes_w1200_sizes_w1200_filename_idx" ON "media" USING btree ("sizes_w1200_filename");
  CREATE INDEX "media_sizes_w1600_sizes_w1600_filename_idx" ON "media" USING btree ("sizes_w1600_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "media_sizes_w480_sizes_w480_filename_idx";
  DROP INDEX "media_sizes_w800_sizes_w800_filename_idx";
  DROP INDEX "media_sizes_w1200_sizes_w1200_filename_idx";
  DROP INDEX "media_sizes_w1600_sizes_w1600_filename_idx";
  ALTER TABLE "media" DROP COLUMN "focal_x";
  ALTER TABLE "media" DROP COLUMN "focal_y";
  ALTER TABLE "media" DROP COLUMN "sizes_w480_url";
  ALTER TABLE "media" DROP COLUMN "sizes_w480_width";
  ALTER TABLE "media" DROP COLUMN "sizes_w480_height";
  ALTER TABLE "media" DROP COLUMN "sizes_w480_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_w480_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_w480_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_w800_url";
  ALTER TABLE "media" DROP COLUMN "sizes_w800_width";
  ALTER TABLE "media" DROP COLUMN "sizes_w800_height";
  ALTER TABLE "media" DROP COLUMN "sizes_w800_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_w800_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_w800_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_w1200_url";
  ALTER TABLE "media" DROP COLUMN "sizes_w1200_width";
  ALTER TABLE "media" DROP COLUMN "sizes_w1200_height";
  ALTER TABLE "media" DROP COLUMN "sizes_w1200_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_w1200_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_w1200_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_url";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_width";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_height";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_filename";`)
}
