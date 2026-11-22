import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_ctas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_ctas_order_idx\` ON \`pages_blocks_hero_ctas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_ctas_parent_id_idx\` ON \`pages_blocks_hero_ctas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_ctas_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_ctas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_ctas_locales_locale_parent_id_unique\` ON \`pages_blocks_hero_ctas_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_ctas_locales_parent_id_idx\` ON \`pages_blocks_hero_ctas_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`layout\` text DEFAULT 'split',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_image_idx\` ON \`pages_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_locales_locale_parent_id_unique\` ON \`pages_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_locales_parent_id_idx\` ON \`pages_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'narrow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_order_idx\` ON \`pages_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_parent_id_idx\` ON \`pages_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_path_idx\` ON \`pages_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_rich_text_locales_locale_parent_id_unique\` ON \`pages_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_locales_parent_id_idx\` ON \`pages_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'paper',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_order_idx\` ON \`pages_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_parent_id_idx\` ON \`pages_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_path_idx\` ON \`pages_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_image_idx\` ON \`pages_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_image_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_image_locales_locale_parent_id_unique\` ON \`pages_blocks_text_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_locales_parent_id_idx\` ON \`pages_blocks_text_image_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_order_idx\` ON \`pages_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_parent_id_idx\` ON \`pages_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_image_idx\` ON \`pages_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_images_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_gallery_images_locales_locale_parent_id_unique\` ON \`pages_blocks_gallery_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_locales_parent_id_idx\` ON \`pages_blocks_gallery_images_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'staggered',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_order_idx\` ON \`pages_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_parent_id_idx\` ON \`pages_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_stats_items_locales_locale_parent_id_unique\` ON \`pages_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_locales_parent_id_idx\` ON \`pages_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_stats_locales_locale_parent_id_unique\` ON \`pages_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_locales_parent_id_idx\` ON \`pages_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_order_idx\` ON \`pages_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_parent_id_idx\` ON \`pages_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_path_idx\` ON \`pages_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_services_grid_locales_locale_parent_id_unique\` ON \`pages_blocks_services_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_locales_parent_id_idx\` ON \`pages_blocks_services_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_projects_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`limit\` numeric DEFAULT 4,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_projects_grid_order_idx\` ON \`pages_blocks_projects_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_projects_grid_parent_id_idx\` ON \`pages_blocks_projects_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_projects_grid_path_idx\` ON \`pages_blocks_projects_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_projects_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_projects_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_projects_grid_locales_locale_parent_id_unique\` ON \`pages_blocks_projects_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_projects_grid_locales_parent_id_idx\` ON \`pages_blocks_projects_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_order_idx\` ON \`pages_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_parent_id_idx\` ON \`pages_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_items_locales_locale_parent_id_uni\` ON \`pages_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_locales_parent_id_idx\` ON \`pages_blocks_testimonials_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_locales_locale_parent_id_unique\` ON \`pages_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_locales_parent_id_idx\` ON \`pages_blocks_testimonials_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`button_url\` text,
  	\`background\` text DEFAULT 'ink',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_locales\` (
  	\`heading\` text,
  	\`description\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_locales_parent_id_idx\` ON \`pages_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_order_idx\` ON \`pages_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_parent_id_idx\` ON \`pages_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_items_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_locales_parent_id_idx\` ON \`pages_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_locales_parent_id_idx\` ON \`pages_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`featured_image_id\` integer,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_featured_image_idx\` ON \`pages\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_seo_seo_image_idx\` ON \`pages\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text,
  	\`intro\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_locales_parent_id_idx\` ON \`pages_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_services_id_idx\` ON \`pages_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_projects_id_idx\` ON \`pages_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_ctas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_ctas_order_idx\` ON \`_pages_v_blocks_hero_ctas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_ctas_parent_id_idx\` ON \`_pages_v_blocks_hero_ctas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_ctas_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero_ctas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_hero_ctas_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_hero_ctas_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_ctas_locales_parent_id_idx\` ON \`_pages_v_blocks_hero_ctas_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`layout\` text DEFAULT 'split',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_image_idx\` ON \`_pages_v_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_hero_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_locales_parent_id_idx\` ON \`_pages_v_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'narrow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_order_idx\` ON \`_pages_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_parent_id_idx\` ON \`_pages_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_path_idx\` ON \`_pages_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_text_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_locales_parent_id_idx\` ON \`_pages_v_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'paper',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_image_order_idx\` ON \`_pages_v_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_image_parent_id_idx\` ON \`_pages_v_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_image_path_idx\` ON \`_pages_v_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_image_image_idx\` ON \`_pages_v_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_text_image_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_text_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_text_image_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_text_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_image_locales_parent_id_idx\` ON \`_pages_v_blocks_text_image_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_images_order_idx\` ON \`_pages_v_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_images_parent_id_idx\` ON \`_pages_v_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_images_image_idx\` ON \`_pages_v_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery_images_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_gallery_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_gallery_images_locales_locale_parent_id_uniq\` ON \`_pages_v_blocks_gallery_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_images_locales_parent_id_idx\` ON \`_pages_v_blocks_gallery_images_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'staggered',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_order_idx\` ON \`_pages_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_parent_id_idx\` ON \`_pages_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_path_idx\` ON \`_pages_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_items_order_idx\` ON \`_pages_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_items_parent_id_idx\` ON \`_pages_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_stats_items_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_items_locales_parent_id_idx\` ON \`_pages_v_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_order_idx\` ON \`_pages_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_parent_id_idx\` ON \`_pages_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_path_idx\` ON \`_pages_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_stats_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_locales_parent_id_idx\` ON \`_pages_v_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_order_idx\` ON \`_pages_v_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_parent_id_idx\` ON \`_pages_v_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_path_idx\` ON \`_pages_v_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_services_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_services_grid_locales_locale_parent_id_uniqu\` ON \`_pages_v_blocks_services_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_locales_parent_id_idx\` ON \`_pages_v_blocks_services_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_projects_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`limit\` numeric DEFAULT 4,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_projects_grid_order_idx\` ON \`_pages_v_blocks_projects_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_projects_grid_parent_id_idx\` ON \`_pages_v_blocks_projects_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_projects_grid_path_idx\` ON \`_pages_v_blocks_projects_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_projects_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_projects_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_projects_grid_locales_locale_parent_id_uniqu\` ON \`_pages_v_blocks_projects_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_projects_grid_locales_parent_id_idx\` ON \`_pages_v_blocks_projects_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_items_order_idx\` ON \`_pages_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_items_parent_id_idx\` ON \`_pages_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_testimonials_items_locales_locale_parent_id_\` ON \`_pages_v_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_items_locales_parent_id_idx\` ON \`_pages_v_blocks_testimonials_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_path_idx\` ON \`_pages_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_testimonials_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_locales_parent_id_idx\` ON \`_pages_v_blocks_testimonials_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`button_url\` text,
  	\`background\` text DEFAULT 'ink',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_locales\` (
  	\`heading\` text,
  	\`description\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_locales_parent_id_idx\` ON \`_pages_v_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_items_order_idx\` ON \`_pages_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_items_parent_id_idx\` ON \`_pages_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_faq_items_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_items_locales_parent_id_idx\` ON \`_pages_v_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_order_idx\` ON \`_pages_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_parent_id_idx\` ON \`_pages_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_path_idx\` ON \`_pages_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_faq_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_locales_parent_id_idx\` ON \`_pages_v_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_featured_image_id\` integer,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_featured_image_idx\` ON \`_pages_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_seo_version_seo_image_idx\` ON \`_pages_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_title\` text,
  	\`version_intro\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_locales_parent_id_idx\` ON \`_pages_v_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_services_id_idx\` ON \`_pages_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_projects_id_idx\` ON \`_pages_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero_ctas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_ctas_order_idx\` ON \`services_blocks_hero_ctas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_ctas_parent_id_idx\` ON \`services_blocks_hero_ctas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero_ctas_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_hero_ctas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_hero_ctas_locales_locale_parent_id_unique\` ON \`services_blocks_hero_ctas_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_ctas_locales_parent_id_idx\` ON \`services_blocks_hero_ctas_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`layout\` text DEFAULT 'split',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_order_idx\` ON \`services_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_parent_id_idx\` ON \`services_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_path_idx\` ON \`services_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_image_idx\` ON \`services_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_hero_locales_locale_parent_id_unique\` ON \`services_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_locales_parent_id_idx\` ON \`services_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'narrow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_order_idx\` ON \`services_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_parent_id_idx\` ON \`services_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_path_idx\` ON \`services_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_rich_text_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_rich_text_locales_locale_parent_id_unique\` ON \`services_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_locales_parent_id_idx\` ON \`services_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'paper',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_text_image_order_idx\` ON \`services_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_image_parent_id_idx\` ON \`services_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_image_path_idx\` ON \`services_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_image_image_idx\` ON \`services_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_text_image_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_text_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_text_image_locales_locale_parent_id_unique\` ON \`services_blocks_text_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_image_locales_parent_id_idx\` ON \`services_blocks_text_image_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_images_order_idx\` ON \`services_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_images_parent_id_idx\` ON \`services_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_images_image_idx\` ON \`services_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_images_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_gallery_images_locales_locale_parent_id_uniq\` ON \`services_blocks_gallery_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_images_locales_parent_id_idx\` ON \`services_blocks_gallery_images_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'staggered',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_order_idx\` ON \`services_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_parent_id_idx\` ON \`services_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_path_idx\` ON \`services_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_items_order_idx\` ON \`services_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_items_parent_id_idx\` ON \`services_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_stats_items_locales_locale_parent_id_unique\` ON \`services_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_items_locales_parent_id_idx\` ON \`services_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_order_idx\` ON \`services_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_parent_id_idx\` ON \`services_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_path_idx\` ON \`services_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_stats_locales_locale_parent_id_unique\` ON \`services_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_locales_parent_id_idx\` ON \`services_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_services_grid_order_idx\` ON \`services_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_grid_parent_id_idx\` ON \`services_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_grid_path_idx\` ON \`services_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_services_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_services_grid_locales_locale_parent_id_uniqu\` ON \`services_blocks_services_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_grid_locales_parent_id_idx\` ON \`services_blocks_services_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_projects_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`limit\` numeric DEFAULT 4,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_projects_grid_order_idx\` ON \`services_blocks_projects_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_projects_grid_parent_id_idx\` ON \`services_blocks_projects_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_projects_grid_path_idx\` ON \`services_blocks_projects_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_projects_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_projects_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_projects_grid_locales_locale_parent_id_uniqu\` ON \`services_blocks_projects_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_projects_grid_locales_parent_id_idx\` ON \`services_blocks_projects_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_order_idx\` ON \`services_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_parent_id_idx\` ON \`services_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_testimonials_items_locales_locale_parent_id_\` ON \`services_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_locales_parent_id_idx\` ON \`services_blocks_testimonials_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_order_idx\` ON \`services_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_parent_id_idx\` ON \`services_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_path_idx\` ON \`services_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_testimonials_locales_locale_parent_id_unique\` ON \`services_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_locales_parent_id_idx\` ON \`services_blocks_testimonials_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`button_url\` text,
  	\`background\` text DEFAULT 'ink',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_order_idx\` ON \`services_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_parent_id_idx\` ON \`services_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_path_idx\` ON \`services_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta_locales\` (
  	\`heading\` text,
  	\`description\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_cta_locales_locale_parent_id_unique\` ON \`services_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_locales_parent_id_idx\` ON \`services_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_order_idx\` ON \`services_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_parent_id_idx\` ON \`services_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_faq_items_locales_locale_parent_id_unique\` ON \`services_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_locales_parent_id_idx\` ON \`services_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_order_idx\` ON \`services_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_parent_id_idx\` ON \`services_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_path_idx\` ON \`services_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_faq_locales_locale_parent_id_unique\` ON \`services_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_locales_parent_id_idx\` ON \`services_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cover_image_id\` integer,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`slug\` text,
  	\`order\` numeric DEFAULT 10,
  	\`featured\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_cover_image_idx\` ON \`services\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_seo_seo_image_idx\` ON \`services\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`services_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_locales_locale_parent_id_unique\` ON \`services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_locales_parent_id_idx\` ON \`services_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_rels_order_idx\` ON \`services_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_parent_idx\` ON \`services_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_path_idx\` ON \`services_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_services_id_idx\` ON \`services_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_projects_id_idx\` ON \`services_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_hero_ctas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_ctas_order_idx\` ON \`_services_v_blocks_hero_ctas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_ctas_parent_id_idx\` ON \`_services_v_blocks_hero_ctas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_hero_ctas_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_hero_ctas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_hero_ctas_locales_locale_parent_id_unique\` ON \`_services_v_blocks_hero_ctas_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_ctas_locales_parent_id_idx\` ON \`_services_v_blocks_hero_ctas_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`layout\` text DEFAULT 'split',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_order_idx\` ON \`_services_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_parent_id_idx\` ON \`_services_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_path_idx\` ON \`_services_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_image_idx\` ON \`_services_v_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_hero_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_hero_locales_locale_parent_id_unique\` ON \`_services_v_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_locales_parent_id_idx\` ON \`_services_v_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'narrow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_rich_text_order_idx\` ON \`_services_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_rich_text_parent_id_idx\` ON \`_services_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_rich_text_path_idx\` ON \`_services_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_rich_text_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_services_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_rich_text_locales_parent_id_idx\` ON \`_services_v_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'paper',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_image_order_idx\` ON \`_services_v_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_image_parent_id_idx\` ON \`_services_v_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_image_path_idx\` ON \`_services_v_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_image_image_idx\` ON \`_services_v_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_text_image_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_text_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_text_image_locales_locale_parent_id_uniqu\` ON \`_services_v_blocks_text_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_image_locales_parent_id_idx\` ON \`_services_v_blocks_text_image_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_gallery_images_order_idx\` ON \`_services_v_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_gallery_images_parent_id_idx\` ON \`_services_v_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_gallery_images_image_idx\` ON \`_services_v_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_gallery_images_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_gallery_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_gallery_images_locales_locale_parent_id_u\` ON \`_services_v_blocks_gallery_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_gallery_images_locales_parent_id_idx\` ON \`_services_v_blocks_gallery_images_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'staggered',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_gallery_order_idx\` ON \`_services_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_gallery_parent_id_idx\` ON \`_services_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_gallery_path_idx\` ON \`_services_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stats_items_order_idx\` ON \`_services_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stats_items_parent_id_idx\` ON \`_services_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_stats_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_stats_items_locales_locale_parent_id_uniq\` ON \`_services_v_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stats_items_locales_parent_id_idx\` ON \`_services_v_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stats_order_idx\` ON \`_services_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stats_parent_id_idx\` ON \`_services_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stats_path_idx\` ON \`_services_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_stats_locales_locale_parent_id_unique\` ON \`_services_v_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stats_locales_parent_id_idx\` ON \`_services_v_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_grid_order_idx\` ON \`_services_v_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_grid_parent_id_idx\` ON \`_services_v_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_grid_path_idx\` ON \`_services_v_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_services_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_services_grid_locales_locale_parent_id_un\` ON \`_services_v_blocks_services_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_grid_locales_parent_id_idx\` ON \`_services_v_blocks_services_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_projects_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`limit\` numeric DEFAULT 4,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_projects_grid_order_idx\` ON \`_services_v_blocks_projects_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_projects_grid_parent_id_idx\` ON \`_services_v_blocks_projects_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_projects_grid_path_idx\` ON \`_services_v_blocks_projects_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_projects_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_projects_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_projects_grid_locales_locale_parent_id_un\` ON \`_services_v_blocks_projects_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_projects_grid_locales_parent_id_idx\` ON \`_services_v_blocks_projects_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_order_idx\` ON \`_services_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_parent_id_idx\` ON \`_services_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_testimonials_items_locales_locale_parent_\` ON \`_services_v_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_locales_parent_id_idx\` ON \`_services_v_blocks_testimonials_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_order_idx\` ON \`_services_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_parent_id_idx\` ON \`_services_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_path_idx\` ON \`_services_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_testimonials_locales_locale_parent_id_uni\` ON \`_services_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_locales_parent_id_idx\` ON \`_services_v_blocks_testimonials_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`button_url\` text,
  	\`background\` text DEFAULT 'ink',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_cta_order_idx\` ON \`_services_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_cta_parent_id_idx\` ON \`_services_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_cta_path_idx\` ON \`_services_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_cta_locales\` (
  	\`heading\` text,
  	\`description\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_cta_locales_locale_parent_id_unique\` ON \`_services_v_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_cta_locales_parent_id_idx\` ON \`_services_v_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_items_order_idx\` ON \`_services_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_items_parent_id_idx\` ON \`_services_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_faq_items_locales_locale_parent_id_unique\` ON \`_services_v_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_items_locales_parent_id_idx\` ON \`_services_v_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_order_idx\` ON \`_services_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_parent_id_idx\` ON \`_services_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_path_idx\` ON \`_services_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_blocks_faq_locales_locale_parent_id_unique\` ON \`_services_v_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_locales_parent_id_idx\` ON \`_services_v_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_cover_image_id\` integer,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 10,
  	\`version_featured\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_cover_image_idx\` ON \`_services_v\` (\`version_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_seo_version_seo_image_idx\` ON \`_services_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_snapshot_idx\` ON \`_services_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_published_locale_idx\` ON \`_services_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_locales_locale_parent_id_unique\` ON \`_services_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_locales_parent_id_idx\` ON \`_services_v_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_rels_order_idx\` ON \`_services_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_parent_idx\` ON \`_services_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_path_idx\` ON \`_services_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_services_id_idx\` ON \`_services_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_projects_id_idx\` ON \`_services_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_gallery_order_idx\` ON \`projects_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_parent_id_idx\` ON \`projects_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_image_idx\` ON \`projects_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_gallery_locales_locale_parent_id_unique\` ON \`projects_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_locales_parent_id_idx\` ON \`projects_gallery_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero_ctas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_ctas_order_idx\` ON \`projects_blocks_hero_ctas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_ctas_parent_id_idx\` ON \`projects_blocks_hero_ctas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero_ctas_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_hero_ctas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_hero_ctas_locales_locale_parent_id_unique\` ON \`projects_blocks_hero_ctas_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_ctas_locales_parent_id_idx\` ON \`projects_blocks_hero_ctas_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`layout\` text DEFAULT 'split',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_order_idx\` ON \`projects_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_parent_id_idx\` ON \`projects_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_path_idx\` ON \`projects_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_image_idx\` ON \`projects_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_hero_locales_locale_parent_id_unique\` ON \`projects_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_locales_parent_id_idx\` ON \`projects_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'narrow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_order_idx\` ON \`projects_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_parent_id_idx\` ON \`projects_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_path_idx\` ON \`projects_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_rich_text_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_rich_text_locales_locale_parent_id_unique\` ON \`projects_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_locales_parent_id_idx\` ON \`projects_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'paper',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_image_order_idx\` ON \`projects_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_image_parent_id_idx\` ON \`projects_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_image_path_idx\` ON \`projects_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_image_image_idx\` ON \`projects_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_text_image_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_text_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_text_image_locales_locale_parent_id_unique\` ON \`projects_blocks_text_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_image_locales_parent_id_idx\` ON \`projects_blocks_text_image_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_images_order_idx\` ON \`projects_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_images_parent_id_idx\` ON \`projects_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_images_image_idx\` ON \`projects_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery_images_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_gallery_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_gallery_images_locales_locale_parent_id_uniq\` ON \`projects_blocks_gallery_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_images_locales_parent_id_idx\` ON \`projects_blocks_gallery_images_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'staggered',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_order_idx\` ON \`projects_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_parent_id_idx\` ON \`projects_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_path_idx\` ON \`projects_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_items_order_idx\` ON \`projects_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_items_parent_id_idx\` ON \`projects_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_stats_items_locales_locale_parent_id_unique\` ON \`projects_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_items_locales_parent_id_idx\` ON \`projects_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_order_idx\` ON \`projects_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_parent_id_idx\` ON \`projects_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_path_idx\` ON \`projects_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_stats_locales_locale_parent_id_unique\` ON \`projects_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_locales_parent_id_idx\` ON \`projects_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_services_grid_order_idx\` ON \`projects_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_services_grid_parent_id_idx\` ON \`projects_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_services_grid_path_idx\` ON \`projects_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_services_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_services_grid_locales_locale_parent_id_uniqu\` ON \`projects_blocks_services_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_services_grid_locales_parent_id_idx\` ON \`projects_blocks_services_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_projects_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`limit\` numeric DEFAULT 4,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_projects_grid_order_idx\` ON \`projects_blocks_projects_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_projects_grid_parent_id_idx\` ON \`projects_blocks_projects_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_projects_grid_path_idx\` ON \`projects_blocks_projects_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_projects_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_projects_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_projects_grid_locales_locale_parent_id_uniqu\` ON \`projects_blocks_projects_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_projects_grid_locales_parent_id_idx\` ON \`projects_blocks_projects_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_testimonials_items_order_idx\` ON \`projects_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_testimonials_items_parent_id_idx\` ON \`projects_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_testimonials_items_locales_locale_parent_id_\` ON \`projects_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_testimonials_items_locales_parent_id_idx\` ON \`projects_blocks_testimonials_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_testimonials_order_idx\` ON \`projects_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_testimonials_parent_id_idx\` ON \`projects_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_testimonials_path_idx\` ON \`projects_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_testimonials_locales_locale_parent_id_unique\` ON \`projects_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_testimonials_locales_parent_id_idx\` ON \`projects_blocks_testimonials_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`button_url\` text,
  	\`background\` text DEFAULT 'ink',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_order_idx\` ON \`projects_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_parent_id_idx\` ON \`projects_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_path_idx\` ON \`projects_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cta_locales\` (
  	\`heading\` text,
  	\`description\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_cta_locales_locale_parent_id_unique\` ON \`projects_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_locales_parent_id_idx\` ON \`projects_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_items_order_idx\` ON \`projects_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_items_parent_id_idx\` ON \`projects_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_faq_items_locales_locale_parent_id_unique\` ON \`projects_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_items_locales_parent_id_idx\` ON \`projects_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_order_idx\` ON \`projects_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_parent_id_idx\` ON \`projects_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_path_idx\` ON \`projects_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_faq_locales_locale_parent_id_unique\` ON \`projects_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_locales_parent_id_idx\` ON \`projects_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cover_image_id\` integer,
  	\`type\` text DEFAULT 'cultural',
  	\`year\` numeric,
  	\`area_m2\` numeric,
  	\`status\` text DEFAULT 'built',
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`slug\` text,
  	\`order\` numeric DEFAULT 10,
  	\`featured\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_cover_image_idx\` ON \`projects\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_seo_seo_image_idx\` ON \`projects\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`projects_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`location\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_locales_locale_parent_id_unique\` ON \`projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_locales_parent_id_idx\` ON \`projects_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_services_id_idx\` ON \`projects_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_projects_id_idx\` ON \`projects_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_order_idx\` ON \`_projects_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_parent_id_idx\` ON \`_projects_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_image_idx\` ON \`_projects_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_version_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_version_gallery_locales_locale_parent_id_unique\` ON \`_projects_v_version_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_locales_parent_id_idx\` ON \`_projects_v_version_gallery_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_hero_ctas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_ctas_order_idx\` ON \`_projects_v_blocks_hero_ctas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_ctas_parent_id_idx\` ON \`_projects_v_blocks_hero_ctas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_hero_ctas_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_hero_ctas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_hero_ctas_locales_locale_parent_id_unique\` ON \`_projects_v_blocks_hero_ctas_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_ctas_locales_parent_id_idx\` ON \`_projects_v_blocks_hero_ctas_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`layout\` text DEFAULT 'split',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_order_idx\` ON \`_projects_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_parent_id_idx\` ON \`_projects_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_path_idx\` ON \`_projects_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_image_idx\` ON \`_projects_v_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_hero_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_hero_locales_locale_parent_id_unique\` ON \`_projects_v_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_hero_locales_parent_id_idx\` ON \`_projects_v_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'narrow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_rich_text_order_idx\` ON \`_projects_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_rich_text_parent_id_idx\` ON \`_projects_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_rich_text_path_idx\` ON \`_projects_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_rich_text_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_projects_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_rich_text_locales_parent_id_idx\` ON \`_projects_v_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'paper',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_text_image_order_idx\` ON \`_projects_v_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_text_image_parent_id_idx\` ON \`_projects_v_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_text_image_path_idx\` ON \`_projects_v_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_text_image_image_idx\` ON \`_projects_v_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_text_image_locales\` (
  	\`heading\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_text_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_text_image_locales_locale_parent_id_uniqu\` ON \`_projects_v_blocks_text_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_text_image_locales_parent_id_idx\` ON \`_projects_v_blocks_text_image_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_gallery_images_order_idx\` ON \`_projects_v_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_gallery_images_parent_id_idx\` ON \`_projects_v_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_gallery_images_image_idx\` ON \`_projects_v_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_gallery_images_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_gallery_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_gallery_images_locales_locale_parent_id_u\` ON \`_projects_v_blocks_gallery_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_gallery_images_locales_parent_id_idx\` ON \`_projects_v_blocks_gallery_images_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'staggered',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_gallery_order_idx\` ON \`_projects_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_gallery_parent_id_idx\` ON \`_projects_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_gallery_path_idx\` ON \`_projects_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_stats_items_order_idx\` ON \`_projects_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_stats_items_parent_id_idx\` ON \`_projects_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_stats_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_stats_items_locales_locale_parent_id_uniq\` ON \`_projects_v_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_stats_items_locales_parent_id_idx\` ON \`_projects_v_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_stats_order_idx\` ON \`_projects_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_stats_parent_id_idx\` ON \`_projects_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_stats_path_idx\` ON \`_projects_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_stats_locales_locale_parent_id_unique\` ON \`_projects_v_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_stats_locales_parent_id_idx\` ON \`_projects_v_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_services_grid_order_idx\` ON \`_projects_v_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_services_grid_parent_id_idx\` ON \`_projects_v_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_services_grid_path_idx\` ON \`_projects_v_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_services_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_services_grid_locales_locale_parent_id_un\` ON \`_projects_v_blocks_services_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_services_grid_locales_parent_id_idx\` ON \`_projects_v_blocks_services_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_projects_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`limit\` numeric DEFAULT 4,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_projects_grid_order_idx\` ON \`_projects_v_blocks_projects_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_projects_grid_parent_id_idx\` ON \`_projects_v_blocks_projects_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_projects_grid_path_idx\` ON \`_projects_v_blocks_projects_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_projects_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_projects_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_projects_grid_locales_locale_parent_id_un\` ON \`_projects_v_blocks_projects_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_projects_grid_locales_parent_id_idx\` ON \`_projects_v_blocks_projects_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_testimonials_items_order_idx\` ON \`_projects_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_testimonials_items_parent_id_idx\` ON \`_projects_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_testimonials_items_locales_locale_parent_\` ON \`_projects_v_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_testimonials_items_locales_parent_id_idx\` ON \`_projects_v_blocks_testimonials_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_testimonials_order_idx\` ON \`_projects_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_testimonials_parent_id_idx\` ON \`_projects_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_testimonials_path_idx\` ON \`_projects_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_testimonials_locales_locale_parent_id_uni\` ON \`_projects_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_testimonials_locales_parent_id_idx\` ON \`_projects_v_blocks_testimonials_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`button_url\` text,
  	\`background\` text DEFAULT 'ink',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_cta_order_idx\` ON \`_projects_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_cta_parent_id_idx\` ON \`_projects_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_cta_path_idx\` ON \`_projects_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_cta_locales\` (
  	\`heading\` text,
  	\`description\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_cta_locales_locale_parent_id_unique\` ON \`_projects_v_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_cta_locales_parent_id_idx\` ON \`_projects_v_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_faq_items_order_idx\` ON \`_projects_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_faq_items_parent_id_idx\` ON \`_projects_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_faq_items_locales_locale_parent_id_unique\` ON \`_projects_v_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_faq_items_locales_parent_id_idx\` ON \`_projects_v_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_faq_order_idx\` ON \`_projects_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_faq_parent_id_idx\` ON \`_projects_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_faq_path_idx\` ON \`_projects_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_blocks_faq_locales_locale_parent_id_unique\` ON \`_projects_v_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_blocks_faq_locales_parent_id_idx\` ON \`_projects_v_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_cover_image_id\` integer,
  	\`version_type\` text DEFAULT 'cultural',
  	\`version_year\` numeric,
  	\`version_area_m2\` numeric,
  	\`version_status\` text DEFAULT 'built',
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 10,
  	\`version_featured\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_cover_image_idx\` ON \`_projects_v\` (\`version_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_seo_version_seo_image_idx\` ON \`_projects_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_snapshot_idx\` ON \`_projects_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_published_locale_idx\` ON \`_projects_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_location\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_locales_locale_parent_id_unique\` ON \`_projects_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_locales_parent_id_idx\` ON \`_projects_v_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_order_idx\` ON \`_projects_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_parent_idx\` ON \`_projects_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_path_idx\` ON \`_projects_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_services_id_idx\` ON \`_projects_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_projects_id_idx\` ON \`_projects_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`featured_image_id\` integer,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`slug\` text,
  	\`published_at\` text,
  	\`author\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_seo_seo_image_idx\` ON \`posts\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`content\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_locales_parent_id_idx\` ON \`posts_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_featured_image_id\` integer,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_slug\` text,
  	\`version_published_at\` text,
  	\`version_author\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_seo_version_seo_image_idx\` ON \`_posts_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_content\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_locales_parent_id_idx\` ON \`_posts_v_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`categories_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_locales_locale_parent_id_unique\` ON \`categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_locales_parent_id_idx\` ON \`categories_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_locales_parent_id_idx\` ON \`media_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`message\` text NOT NULL,
  	\`locale\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_submissions_updated_at_idx\` ON \`contact_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_submissions_created_at_idx\` ON \`contact_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_address\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_address_order_idx\` ON \`site_settings_address\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_address_parent_id_idx\` ON \`site_settings_address\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_social_order_idx\` ON \`site_settings_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_social_parent_id_idx\` ON \`site_settings_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company_name\` text NOT NULL,
  	\`wordmark\` text NOT NULL,
  	\`legal_name\` text,
  	\`email\` text NOT NULL,
  	\`careers_email\` text,
  	\`phone\` text,
  	\`map_url\` text,
  	\`seo_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_seo_image_idx\` ON \`site_settings\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_locales\` (
  	\`tagline\` text,
  	\`footer_description\` text,
  	\`copyright\` text,
  	\`announcement\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_locales_parent_id_idx\` ON \`site_settings_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_intro_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_intro_facts_order_idx\` ON \`home_page_intro_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_intro_facts_parent_id_idx\` ON \`home_page_intro_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_intro_facts_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_intro_facts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_intro_facts_locales_locale_parent_id_unique\` ON \`home_page_intro_facts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_intro_facts_locales_parent_id_idx\` ON \`home_page_intro_facts_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_archive_numbers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_archive_numbers_order_idx\` ON \`home_page_archive_numbers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_archive_numbers_parent_id_idx\` ON \`home_page_archive_numbers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_archive_numbers_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_archive_numbers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_archive_numbers_locales_locale_parent_id_unique\` ON \`home_page_archive_numbers_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_archive_numbers_locales_parent_id_idx\` ON \`home_page_archive_numbers_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_archive_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`count\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_archive_categories_order_idx\` ON \`home_page_archive_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_archive_categories_parent_id_idx\` ON \`home_page_archive_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_archive_categories_locales\` (
  	\`name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_archive_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_archive_categories_locales_locale_parent_id_unique\` ON \`home_page_archive_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_archive_categories_locales_parent_id_idx\` ON \`home_page_archive_categories_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_archive_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_archive_images_order_idx\` ON \`home_page_archive_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_archive_images_parent_id_idx\` ON \`home_page_archive_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_archive_images_image_idx\` ON \`home_page_archive_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_approach_principles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_approach_principles_order_idx\` ON \`home_page_approach_principles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_approach_principles_parent_id_idx\` ON \`home_page_approach_principles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_approach_principles_locales\` (
  	\`name\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_approach_principles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_approach_principles_locales_locale_parent_id_uniqu\` ON \`home_page_approach_principles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_approach_principles_locales_parent_id_idx\` ON \`home_page_approach_principles_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_studio_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_studio_people_order_idx\` ON \`home_page_studio_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_studio_people_parent_id_idx\` ON \`home_page_studio_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_studio_people_locales\` (
  	\`role\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_studio_people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_studio_people_locales_locale_parent_id_unique\` ON \`home_page_studio_people_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_studio_people_locales_parent_id_idx\` ON \`home_page_studio_people_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_left_image_id\` integer,
  	\`hero_right_image_id\` integer,
  	\`approach_image_id\` integer,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_left_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_right_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approach_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_hero_left_image_idx\` ON \`home_page\` (\`hero_left_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_hero_right_image_idx\` ON \`home_page\` (\`hero_right_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_approach_approach_image_idx\` ON \`home_page\` (\`approach_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_seo_seo_image_idx\` ON \`home_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page__status_idx\` ON \`home_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`home_page_locales\` (
  	\`hero_statement\` text,
  	\`hero_caption\` text,
  	\`hero_cta_label\` text,
  	\`intro_statement\` text,
  	\`work_heading\` text,
  	\`work_more_label\` text,
  	\`archive_categories_label\` text,
  	\`archive_strip_label\` text,
  	\`services_heading\` text,
  	\`approach_title\` text,
  	\`approach_intro\` text,
  	\`approach_caption\` text,
  	\`studio_heading\` text,
  	\`journal_heading\` text,
  	\`journal_more_label\` text,
  	\`contact_lead\` text,
  	\`contact_cta_label\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_locales_locale_parent_id_unique\` ON \`home_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_locales_parent_id_idx\` ON \`home_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` integer,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_rels_order_idx\` ON \`home_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_parent_idx\` ON \`home_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_path_idx\` ON \`home_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_projects_id_idx\` ON \`home_page_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_services_id_idx\` ON \`home_page_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_intro_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_intro_facts_order_idx\` ON \`_home_page_v_version_intro_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_intro_facts_parent_id_idx\` ON \`_home_page_v_version_intro_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_intro_facts_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v_version_intro_facts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_page_v_version_intro_facts_locales_locale_parent_id_un\` ON \`_home_page_v_version_intro_facts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_intro_facts_locales_parent_id_idx\` ON \`_home_page_v_version_intro_facts_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_archive_numbers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_numbers_order_idx\` ON \`_home_page_v_version_archive_numbers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_numbers_parent_id_idx\` ON \`_home_page_v_version_archive_numbers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_archive_numbers_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v_version_archive_numbers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_page_v_version_archive_numbers_locales_locale_parent_i\` ON \`_home_page_v_version_archive_numbers_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_numbers_locales_parent_id_idx\` ON \`_home_page_v_version_archive_numbers_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_archive_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`count\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_categories_order_idx\` ON \`_home_page_v_version_archive_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_categories_parent_id_idx\` ON \`_home_page_v_version_archive_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_archive_categories_locales\` (
  	\`name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v_version_archive_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_page_v_version_archive_categories_locales_locale_paren\` ON \`_home_page_v_version_archive_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_categories_locales_parent_i_idx\` ON \`_home_page_v_version_archive_categories_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_archive_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_images_order_idx\` ON \`_home_page_v_version_archive_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_images_parent_id_idx\` ON \`_home_page_v_version_archive_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_archive_images_image_idx\` ON \`_home_page_v_version_archive_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_approach_principles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_approach_principles_order_idx\` ON \`_home_page_v_version_approach_principles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_approach_principles_parent_id_idx\` ON \`_home_page_v_version_approach_principles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_approach_principles_locales\` (
  	\`name\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v_version_approach_principles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_page_v_version_approach_principles_locales_locale_pare\` ON \`_home_page_v_version_approach_principles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_approach_principles_locales_parent__idx\` ON \`_home_page_v_version_approach_principles_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_studio_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_studio_people_order_idx\` ON \`_home_page_v_version_studio_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_studio_people_parent_id_idx\` ON \`_home_page_v_version_studio_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_studio_people_locales\` (
  	\`role\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v_version_studio_people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_page_v_version_studio_people_locales_locale_parent_id_\` ON \`_home_page_v_version_studio_people_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_studio_people_locales_parent_id_idx\` ON \`_home_page_v_version_studio_people_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_left_image_id\` integer,
  	\`version_hero_right_image_id\` integer,
  	\`version_approach_image_id\` integer,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_left_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_right_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approach_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_hero_version_hero_left_image_idx\` ON \`_home_page_v\` (\`version_hero_left_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_hero_version_hero_right_image_idx\` ON \`_home_page_v\` (\`version_hero_right_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_approach_version_approach_image_idx\` ON \`_home_page_v\` (\`version_approach_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_seo_version_seo_image_idx\` ON \`_home_page_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_version__status_idx\` ON \`_home_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_created_at_idx\` ON \`_home_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_updated_at_idx\` ON \`_home_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_snapshot_idx\` ON \`_home_page_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_published_locale_idx\` ON \`_home_page_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_latest_idx\` ON \`_home_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_locales\` (
  	\`version_hero_statement\` text,
  	\`version_hero_caption\` text,
  	\`version_hero_cta_label\` text,
  	\`version_intro_statement\` text,
  	\`version_work_heading\` text,
  	\`version_work_more_label\` text,
  	\`version_archive_categories_label\` text,
  	\`version_archive_strip_label\` text,
  	\`version_services_heading\` text,
  	\`version_approach_title\` text,
  	\`version_approach_intro\` text,
  	\`version_approach_caption\` text,
  	\`version_studio_heading\` text,
  	\`version_journal_heading\` text,
  	\`version_journal_more_label\` text,
  	\`version_contact_lead\` text,
  	\`version_contact_cta_label\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_page_v_locales_locale_parent_id_unique\` ON \`_home_page_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_locales_parent_id_idx\` ON \`_home_page_v_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` integer,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_order_idx\` ON \`_home_page_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_parent_idx\` ON \`_home_page_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_path_idx\` ON \`_home_page_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_projects_id_idx\` ON \`_home_page_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_services_id_idx\` ON \`_home_page_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`services_landing\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_landing_seo_seo_image_idx\` ON \`services_landing\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_landing_locales\` (
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_landing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_landing_locales_locale_parent_id_unique\` ON \`services_landing_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_landing_locales_parent_id_idx\` ON \`services_landing_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_landing\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_landing_seo_seo_image_idx\` ON \`projects_landing\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_landing_locales\` (
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_landing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_landing_locales_locale_parent_id_unique\` ON \`projects_landing_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_landing_locales_parent_id_idx\` ON \`projects_landing_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`journal_landing\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`journal_landing_seo_seo_image_idx\` ON \`journal_landing\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`journal_landing_locales\` (
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_landing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_landing_locales_locale_parent_id_unique\` ON \`journal_landing_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_landing_locales_parent_id_idx\` ON \`journal_landing_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page_seo_seo_image_idx\` ON \`contact_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page_locales\` (
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`form_intro\` text,
  	\`hours\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contact_page_locales_locale_parent_id_unique\` ON \`contact_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_page_locales_parent_id_idx\` ON \`contact_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`credit\` text;`)
  // Data: keep existing alt text (default locale 'tr') and make existing users admins.
  await db.run(sql`INSERT INTO \`media_locales\` (\`alt\`, \`_locale\`, \`_parent_id\`) SELECT \`alt\`, 'tr', \`id\` FROM \`media\` WHERE \`alt\` IS NOT NULL;`)
  await db.run(sql`INSERT INTO \`users_roles\` (\`order\`, \`parent_id\`, \`value\`) SELECT 1, \`id\`, 'admin' FROM \`users\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`alt\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`services_id\` integer REFERENCES services(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`projects_id\` integer REFERENCES projects(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`categories_id\` integer REFERENCES categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`contact_submissions_id\` integer REFERENCES contact_submissions(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_ctas\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_ctas_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_image_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_images_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_projects_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_projects_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_ctas\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_ctas_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_text_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery_images_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_services_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_projects_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_projects_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero_ctas\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero_ctas_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_text_image_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_images_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_services_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_projects_grid\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_projects_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_locales\`;`)
  await db.run(sql`DROP TABLE \`services_rels\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_hero_ctas\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_hero_ctas_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_text_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_gallery_images_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_services_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_projects_grid\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_projects_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`_services_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_rels\`;`)
  await db.run(sql`DROP TABLE \`projects_gallery\`;`)
  await db.run(sql`DROP TABLE \`projects_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero_ctas\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero_ctas_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_text_image_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery_images_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_services_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_projects_grid\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_projects_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_rels\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_hero_ctas\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_hero_ctas_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_text_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_gallery_images_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_services_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_projects_grid\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_projects_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`categories_locales\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`contact_submissions\`;`)
  await db.run(sql`DROP TABLE \`site_settings_address\`;`)
  await db.run(sql`DROP TABLE \`site_settings_social\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_intro_facts\`;`)
  await db.run(sql`DROP TABLE \`home_page_intro_facts_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_archive_numbers\`;`)
  await db.run(sql`DROP TABLE \`home_page_archive_numbers_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_archive_categories\`;`)
  await db.run(sql`DROP TABLE \`home_page_archive_categories_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_archive_images\`;`)
  await db.run(sql`DROP TABLE \`home_page_approach_principles\`;`)
  await db.run(sql`DROP TABLE \`home_page_approach_principles_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_studio_people\`;`)
  await db.run(sql`DROP TABLE \`home_page_studio_people_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_rels\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_intro_facts\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_intro_facts_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_archive_numbers\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_archive_numbers_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_archive_categories\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_archive_categories_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_archive_images\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_approach_principles\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_approach_principles_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_studio_people\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_studio_people_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_rels\`;`)
  await db.run(sql`DROP TABLE \`services_landing\`;`)
  await db.run(sql`DROP TABLE \`services_landing_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_landing\`;`)
  await db.run(sql`DROP TABLE \`projects_landing_locales\`;`)
  await db.run(sql`DROP TABLE \`journal_landing\`;`)
  await db.run(sql`DROP TABLE \`journal_landing_locales\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`contact_page_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`alt\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`credit\`;`)
}
