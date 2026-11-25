import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('tr', 'en');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pages_blocks_hero_layout" AS ENUM('split', 'stacked');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_text_image_background" AS ENUM('paper', 'mist');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('staggered', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_cta_background" AS ENUM('ink', 'mist', 'paper');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_layout" AS ENUM('split', 'stacked');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_background" AS ENUM('paper', 'mist');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('staggered', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background" AS ENUM('ink', 'mist', 'paper');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('tr', 'en');
  CREATE TYPE "public"."enum_services_blocks_hero_layout" AS ENUM('split', 'stacked');
  CREATE TYPE "public"."enum_services_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_services_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_services_blocks_text_image_background" AS ENUM('paper', 'mist');
  CREATE TYPE "public"."enum_services_blocks_gallery_layout" AS ENUM('staggered', 'grid');
  CREATE TYPE "public"."enum_services_blocks_cta_background" AS ENUM('ink', 'mist', 'paper');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_hero_layout" AS ENUM('split', 'stacked');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__services_v_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__services_v_blocks_text_image_background" AS ENUM('paper', 'mist');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_layout" AS ENUM('staggered', 'grid');
  CREATE TYPE "public"."enum__services_v_blocks_cta_background" AS ENUM('ink', 'mist', 'paper');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('tr', 'en');
  CREATE TYPE "public"."enum_projects_blocks_hero_layout" AS ENUM('split', 'stacked');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_projects_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_projects_blocks_text_image_background" AS ENUM('paper', 'mist');
  CREATE TYPE "public"."enum_projects_blocks_gallery_layout" AS ENUM('staggered', 'grid');
  CREATE TYPE "public"."enum_projects_blocks_cta_background" AS ENUM('ink', 'mist', 'paper');
  CREATE TYPE "public"."enum_projects_type" AS ENUM('cultural', 'residential', 'housing', 'public', 'commercial', 'interiors');
  CREATE TYPE "public"."enum_projects_build_status" AS ENUM('built', 'inConstruction');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_layout" AS ENUM('split', 'stacked');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__projects_v_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__projects_v_blocks_text_image_background" AS ENUM('paper', 'mist');
  CREATE TYPE "public"."enum__projects_v_blocks_gallery_layout" AS ENUM('staggered', 'grid');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_background" AS ENUM('ink', 'mist', 'paper');
  CREATE TYPE "public"."enum__projects_v_version_type" AS ENUM('cultural', 'residential', 'housing', 'public', 'commercial', 'interiors');
  CREATE TYPE "public"."enum__projects_v_version_build_status" AS ENUM('built', 'inConstruction');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('tr', 'en');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('tr', 'en');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_published_locale" AS ENUM('tr', 'en');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_ctas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"layout" "enum_pages_blocks_hero_layout" DEFAULT 'split',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT 'narrow',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_text_image_image_position" DEFAULT 'right',
  	"background" "enum_pages_blocks_text_image_background" DEFAULT 'paper',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_image_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'staggered',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_url" varchar,
  	"background" "enum_pages_blocks_cta_background" DEFAULT 'ink',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_image_id" integer,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"layout" "enum__pages_v_blocks_hero_layout" DEFAULT 'split',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_text_image_image_position" DEFAULT 'right',
  	"background" "enum__pages_v_blocks_text_image_background" DEFAULT 'paper',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_image_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'staggered',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_url" varchar,
  	"background" "enum__pages_v_blocks_cta_background" DEFAULT 'ink',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_featured_image_id" integer,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_intro" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "services_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "services_blocks_hero_ctas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"layout" "enum_services_blocks_hero_layout" DEFAULT 'split',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_services_blocks_rich_text_width" DEFAULT 'narrow',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_services_blocks_text_image_image_position" DEFAULT 'right',
  	"background" "enum_services_blocks_text_image_background" DEFAULT 'paper',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_text_image_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "services_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_services_blocks_gallery_layout" DEFAULT 'staggered',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_projects_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_url" varchar,
  	"background" "enum_services_blocks_cta_background" DEFAULT 'ink',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"order" numeric DEFAULT 10,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "_services_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_ctas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"layout" "enum__services_v_blocks_hero_layout" DEFAULT 'split',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__services_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__services_v_blocks_text_image_image_position" DEFAULT 'right',
  	"background" "enum__services_v_blocks_text_image_background" DEFAULT 'paper',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_text_image_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__services_v_blocks_gallery_layout" DEFAULT 'staggered',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_services_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_projects_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_url" varchar,
  	"background" "enum__services_v_blocks_cta_background" DEFAULT 'ink',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 10,
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "projects_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "projects_blocks_hero_ctas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"layout" "enum_projects_blocks_hero_layout" DEFAULT 'split',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_projects_blocks_rich_text_width" DEFAULT 'narrow',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_projects_blocks_text_image_image_position" DEFAULT 'right',
  	"background" "enum_projects_blocks_text_image_background" DEFAULT 'paper',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_text_image_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "projects_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_projects_blocks_gallery_layout" DEFAULT 'staggered',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_services_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_projects_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "projects_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_url" varchar,
  	"background" "enum_projects_blocks_cta_background" DEFAULT 'ink',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_cta_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"type" "enum_projects_type" DEFAULT 'cultural',
  	"year" numeric,
  	"area_m2" numeric,
  	"build_status" "enum_projects_build_status" DEFAULT 'built',
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"order" numeric DEFAULT 10,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"location" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_ctas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"layout" "enum__projects_v_blocks_hero_layout" DEFAULT 'split',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__projects_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__projects_v_blocks_text_image_image_position" DEFAULT 'right',
  	"background" "enum__projects_v_blocks_text_image_background" DEFAULT 'paper',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text_image_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__projects_v_blocks_gallery_layout" DEFAULT 'staggered',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_services_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_projects_grid_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_url" varchar,
  	"background" "enum__projects_v_blocks_cta_background" DEFAULT 'ink',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_cta_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_type" "enum__projects_v_version_type" DEFAULT 'cultural',
  	"version_year" numeric,
  	"version_area_m2" numeric,
  	"version_build_status" "enum__projects_v_version_build_status" DEFAULT 'built',
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 10,
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_location" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_image_id" integer,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"author" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_featured_image_id" integer,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"credit" varchar,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_w480_url" varchar,
  	"sizes_w480_width" numeric,
  	"sizes_w480_height" numeric,
  	"sizes_w480_mime_type" varchar,
  	"sizes_w480_filesize" numeric,
  	"sizes_w480_filename" varchar,
  	"sizes_w800_url" varchar,
  	"sizes_w800_width" numeric,
  	"sizes_w800_height" numeric,
  	"sizes_w800_mime_type" varchar,
  	"sizes_w800_filesize" numeric,
  	"sizes_w800_filename" varchar,
  	"sizes_w1200_url" varchar,
  	"sizes_w1200_width" numeric,
  	"sizes_w1200_height" numeric,
  	"sizes_w1200_mime_type" varchar,
  	"sizes_w1200_filesize" numeric,
  	"sizes_w1200_filename" varchar,
  	"sizes_w1600_url" varchar,
  	"sizes_w1600_width" numeric,
  	"sizes_w1600_height" numeric,
  	"sizes_w1600_mime_type" varchar,
  	"sizes_w1600_filesize" numeric,
  	"sizes_w1600_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"message" varchar NOT NULL,
  	"locale" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"contact_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_address" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"wordmark" varchar NOT NULL,
  	"legal_name" varchar,
  	"email" varchar NOT NULL,
  	"careers_email" varchar,
  	"phone" varchar,
  	"map_url" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar,
  	"footer_description" varchar,
  	"copyright" varchar,
  	"announcement" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_intro_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "home_page_intro_facts_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_archive_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric
  );
  
  CREATE TABLE "home_page_archive_numbers_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_archive_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"count" numeric
  );
  
  CREATE TABLE "home_page_archive_categories_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_archive_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_approach_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_approach_principles_locales" (
  	"name" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_studio_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "home_page_studio_people_locales" (
  	"role" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_left_image_id" integer,
  	"hero_right_image_id" integer,
  	"approach_image_id" integer,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_statement" varchar,
  	"hero_caption" varchar,
  	"hero_cta_label" varchar,
  	"intro_statement" varchar,
  	"work_heading" varchar,
  	"work_more_label" varchar,
  	"archive_categories_label" varchar,
  	"archive_strip_label" varchar,
  	"services_heading" varchar,
  	"approach_title" varchar,
  	"approach_intro" varchar,
  	"approach_caption" varchar,
  	"studio_heading" varchar,
  	"journal_heading" varchar,
  	"journal_more_label" varchar,
  	"contact_lead" varchar,
  	"contact_cta_label" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_home_page_v_version_intro_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_intro_facts_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_archive_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_archive_numbers_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_archive_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"count" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_archive_categories_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_archive_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_approach_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_approach_principles_locales" (
  	"name" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_studio_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_studio_people_locales" (
  	"role" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_left_image_id" integer,
  	"version_hero_right_image_id" integer,
  	"version_approach_image_id" integer,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_home_page_v_locales" (
  	"version_hero_statement" varchar,
  	"version_hero_caption" varchar,
  	"version_hero_cta_label" varchar,
  	"version_intro_statement" varchar,
  	"version_work_heading" varchar,
  	"version_work_more_label" varchar,
  	"version_archive_categories_label" varchar,
  	"version_archive_strip_label" varchar,
  	"version_services_heading" varchar,
  	"version_approach_title" varchar,
  	"version_approach_intro" varchar,
  	"version_approach_caption" varchar,
  	"version_studio_heading" varchar,
  	"version_journal_heading" varchar,
  	"version_journal_more_label" varchar,
  	"version_contact_lead" varchar,
  	"version_contact_cta_label" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "services_landing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_landing_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_landing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects_landing_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journal_landing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "journal_landing_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"form_intro" varchar,
  	"hours" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas_locales" ADD CONSTRAINT "pages_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image" ADD CONSTRAINT "pages_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image" ADD CONSTRAINT "pages_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image_locales" ADD CONSTRAINT "pages_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images_locales" ADD CONSTRAINT "pages_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_locales" ADD CONSTRAINT "pages_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_grid" ADD CONSTRAINT "pages_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_grid_locales" ADD CONSTRAINT "pages_blocks_projects_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items_locales" ADD CONSTRAINT "pages_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image" ADD CONSTRAINT "_pages_v_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image" ADD CONSTRAINT "_pages_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image_locales" ADD CONSTRAINT "_pages_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_locales" ADD CONSTRAINT "_pages_v_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_grid" ADD CONSTRAINT "_pages_v_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_grid_locales" ADD CONSTRAINT "_pages_v_blocks_projects_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_ctas" ADD CONSTRAINT "services_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_ctas_locales" ADD CONSTRAINT "services_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_locales" ADD CONSTRAINT "services_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text_locales" ADD CONSTRAINT "services_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_image" ADD CONSTRAINT "services_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_text_image" ADD CONSTRAINT "services_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_image_locales" ADD CONSTRAINT "services_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_images" ADD CONSTRAINT "services_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_images" ADD CONSTRAINT "services_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_images_locales" ADD CONSTRAINT "services_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery" ADD CONSTRAINT "services_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items_locales" ADD CONSTRAINT "services_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_locales" ADD CONSTRAINT "services_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_grid" ADD CONSTRAINT "services_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_grid_locales" ADD CONSTRAINT "services_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_projects_grid" ADD CONSTRAINT "services_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_projects_grid_locales" ADD CONSTRAINT "services_blocks_projects_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_projects_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items" ADD CONSTRAINT "services_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items_locales" ADD CONSTRAINT "services_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_locales" ADD CONSTRAINT "services_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_locales" ADD CONSTRAINT "services_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items" ADD CONSTRAINT "services_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items_locales" ADD CONSTRAINT "services_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_locales" ADD CONSTRAINT "services_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_ctas" ADD CONSTRAINT "_services_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_ctas_locales" ADD CONSTRAINT "_services_v_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_locales" ADD CONSTRAINT "_services_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text" ADD CONSTRAINT "_services_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text_locales" ADD CONSTRAINT "_services_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_text_image" ADD CONSTRAINT "_services_v_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_text_image" ADD CONSTRAINT "_services_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_text_image_locales" ADD CONSTRAINT "_services_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery_images" ADD CONSTRAINT "_services_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery_images" ADD CONSTRAINT "_services_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery_images_locales" ADD CONSTRAINT "_services_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery" ADD CONSTRAINT "_services_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items_locales" ADD CONSTRAINT "_services_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_locales" ADD CONSTRAINT "_services_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_grid" ADD CONSTRAINT "_services_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_grid_locales" ADD CONSTRAINT "_services_v_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_projects_grid" ADD CONSTRAINT "_services_v_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_projects_grid_locales" ADD CONSTRAINT "_services_v_blocks_projects_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_projects_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items" ADD CONSTRAINT "_services_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_services_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_locales" ADD CONSTRAINT "_services_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_locales" ADD CONSTRAINT "_services_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_items" ADD CONSTRAINT "_services_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_items_locales" ADD CONSTRAINT "_services_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq" ADD CONSTRAINT "_services_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_locales" ADD CONSTRAINT "_services_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery_locales" ADD CONSTRAINT "projects_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_ctas" ADD CONSTRAINT "projects_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_ctas_locales" ADD CONSTRAINT "projects_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_locales" ADD CONSTRAINT "projects_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD CONSTRAINT "projects_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_image" ADD CONSTRAINT "projects_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_image" ADD CONSTRAINT "projects_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_image_locales" ADD CONSTRAINT "projects_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images_locales" ADD CONSTRAINT "projects_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items_locales" ADD CONSTRAINT "projects_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_locales" ADD CONSTRAINT "projects_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_services_grid" ADD CONSTRAINT "projects_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_services_grid_locales" ADD CONSTRAINT "projects_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_projects_grid" ADD CONSTRAINT "projects_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_projects_grid_locales" ADD CONSTRAINT "projects_blocks_projects_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_projects_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_items" ADD CONSTRAINT "projects_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_items_locales" ADD CONSTRAINT "projects_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials" ADD CONSTRAINT "projects_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_locales" ADD CONSTRAINT "projects_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta" ADD CONSTRAINT "projects_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_locales" ADD CONSTRAINT "projects_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items" ADD CONSTRAINT "projects_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items_locales" ADD CONSTRAINT "projects_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq" ADD CONSTRAINT "projects_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_locales" ADD CONSTRAINT "projects_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery_locales" ADD CONSTRAINT "_projects_v_version_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_ctas" ADD CONSTRAINT "_projects_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_ctas_locales" ADD CONSTRAINT "_projects_v_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD CONSTRAINT "_projects_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD CONSTRAINT "_projects_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_image" ADD CONSTRAINT "_projects_v_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_image" ADD CONSTRAINT "_projects_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_image_locales" ADD CONSTRAINT "_projects_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items_locales" ADD CONSTRAINT "_projects_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_locales" ADD CONSTRAINT "_projects_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_services_grid" ADD CONSTRAINT "_projects_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_services_grid_locales" ADD CONSTRAINT "_projects_v_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_projects_grid" ADD CONSTRAINT "_projects_v_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_projects_grid_locales" ADD CONSTRAINT "_projects_v_blocks_projects_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_projects_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_items" ADD CONSTRAINT "_projects_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_projects_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials" ADD CONSTRAINT "_projects_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_locales" ADD CONSTRAINT "_projects_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta" ADD CONSTRAINT "_projects_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta_locales" ADD CONSTRAINT "_projects_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_items" ADD CONSTRAINT "_projects_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_items_locales" ADD CONSTRAINT "_projects_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq" ADD CONSTRAINT "_projects_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_locales" ADD CONSTRAINT "_projects_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_address" ADD CONSTRAINT "site_settings_address_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_intro_facts" ADD CONSTRAINT "home_page_intro_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_intro_facts_locales" ADD CONSTRAINT "home_page_intro_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_intro_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_archive_numbers" ADD CONSTRAINT "home_page_archive_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_archive_numbers_locales" ADD CONSTRAINT "home_page_archive_numbers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_archive_numbers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_archive_categories" ADD CONSTRAINT "home_page_archive_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_archive_categories_locales" ADD CONSTRAINT "home_page_archive_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_archive_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_archive_images" ADD CONSTRAINT "home_page_archive_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_archive_images" ADD CONSTRAINT "home_page_archive_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_approach_principles" ADD CONSTRAINT "home_page_approach_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_approach_principles_locales" ADD CONSTRAINT "home_page_approach_principles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_approach_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_studio_people" ADD CONSTRAINT "home_page_studio_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_studio_people_locales" ADD CONSTRAINT "home_page_studio_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_studio_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_left_image_id_media_id_fk" FOREIGN KEY ("hero_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_right_image_id_media_id_fk" FOREIGN KEY ("hero_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_approach_image_id_media_id_fk" FOREIGN KEY ("approach_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_intro_facts" ADD CONSTRAINT "_home_page_v_version_intro_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_intro_facts_locales" ADD CONSTRAINT "_home_page_v_version_intro_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_intro_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_archive_numbers" ADD CONSTRAINT "_home_page_v_version_archive_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_archive_numbers_locales" ADD CONSTRAINT "_home_page_v_version_archive_numbers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_archive_numbers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_archive_categories" ADD CONSTRAINT "_home_page_v_version_archive_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_archive_categories_locales" ADD CONSTRAINT "_home_page_v_version_archive_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_archive_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_archive_images" ADD CONSTRAINT "_home_page_v_version_archive_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_archive_images" ADD CONSTRAINT "_home_page_v_version_archive_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_approach_principles" ADD CONSTRAINT "_home_page_v_version_approach_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_approach_principles_locales" ADD CONSTRAINT "_home_page_v_version_approach_principles_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_approach_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_studio_people" ADD CONSTRAINT "_home_page_v_version_studio_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_studio_people_locales" ADD CONSTRAINT "_home_page_v_version_studio_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_studio_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_left_image_id_media_id_fk" FOREIGN KEY ("version_hero_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_right_image_id_media_id_fk" FOREIGN KEY ("version_hero_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_approach_image_id_media_id_fk" FOREIGN KEY ("version_approach_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_locales" ADD CONSTRAINT "_home_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_landing" ADD CONSTRAINT "services_landing_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_landing_locales" ADD CONSTRAINT "services_landing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_landing" ADD CONSTRAINT "projects_landing_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_landing_locales" ADD CONSTRAINT "projects_landing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_landing" ADD CONSTRAINT "journal_landing_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_landing_locales" ADD CONSTRAINT "journal_landing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_ctas_locales_locale_parent_id_unique" ON "pages_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_locales_parent_id_idx" ON "pages_blocks_hero_ctas_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_locales_parent_id_idx" ON "pages_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_image_order_idx" ON "pages_blocks_text_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_image_parent_id_idx" ON "pages_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_image_path_idx" ON "pages_blocks_text_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_image_image_idx" ON "pages_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_text_image_locales_locale_parent_id_unique" ON "pages_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_image_locales_parent_id_idx" ON "pages_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_images_locales_locale_parent_id_unique" ON "pages_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_locales_parent_id_idx" ON "pages_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locales_parent_id_idx" ON "pages_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stats_locales_locale_parent_id_unique" ON "pages_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_locales_parent_id_idx" ON "pages_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_services_grid_locales_locale_parent_id_unique" ON "pages_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_grid_locales_parent_id_idx" ON "pages_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_grid_order_idx" ON "pages_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_grid_parent_id_idx" ON "pages_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_grid_path_idx" ON "pages_blocks_projects_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_projects_grid_locales_locale_parent_id_unique" ON "pages_blocks_projects_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_projects_grid_locales_parent_id_idx" ON "pages_blocks_projects_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_items_locales_locale_parent_id_uni" ON "pages_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_locales_parent_id_idx" ON "pages_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_locales_parent_id_idx" ON "pages_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_featured_image_idx" ON "pages" USING btree ("featured_image_id");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_order_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_ctas_parent_id_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_ctas_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_locales_parent_id_idx" ON "_pages_v_blocks_hero_ctas_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_locales_parent_id_idx" ON "_pages_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_order_idx" ON "_pages_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_image_parent_id_idx" ON "_pages_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_path_idx" ON "_pages_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_image_image_idx" ON "_pages_v_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_text_image_locales_locale_parent_id_unique" ON "_pages_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_locales_parent_id_idx" ON "_pages_v_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_images_locales_locale_parent_id_uniq" ON "_pages_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_locales_parent_id_idx" ON "_pages_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_locales_parent_id_idx" ON "_pages_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_locales_parent_id_idx" ON "_pages_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_services_grid_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_locales_parent_id_idx" ON "_pages_v_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_grid_order_idx" ON "_pages_v_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_grid_parent_id_idx" ON "_pages_v_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_grid_path_idx" ON "_pages_v_blocks_projects_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_projects_grid_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_projects_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_grid_locales_parent_id_idx" ON "_pages_v_blocks_projects_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_items_locales_locale_parent_id_" ON "_pages_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_locales_parent_id_idx" ON "_pages_v_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_locales_parent_id_idx" ON "_pages_v_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_locales_parent_id_idx" ON "_pages_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_featured_image_idx" ON "_pages_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "services_blocks_hero_ctas_order_idx" ON "services_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_ctas_parent_id_idx" ON "services_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hero_ctas_locales_locale_parent_id_unique" ON "services_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_ctas_locales_parent_id_idx" ON "services_blocks_hero_ctas_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_image_idx" ON "services_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_blocks_hero_locales_locale_parent_id_unique" ON "services_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_locales_parent_id_idx" ON "services_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_rich_text_locales_locale_parent_id_unique" ON "services_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_rich_text_locales_parent_id_idx" ON "services_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_image_order_idx" ON "services_blocks_text_image" USING btree ("_order");
  CREATE INDEX "services_blocks_text_image_parent_id_idx" ON "services_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_image_path_idx" ON "services_blocks_text_image" USING btree ("_path");
  CREATE INDEX "services_blocks_text_image_image_idx" ON "services_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_blocks_text_image_locales_locale_parent_id_unique" ON "services_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_text_image_locales_parent_id_idx" ON "services_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_images_order_idx" ON "services_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_images_parent_id_idx" ON "services_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_images_image_idx" ON "services_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_blocks_gallery_images_locales_locale_parent_id_uniq" ON "services_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_gallery_images_locales_parent_id_idx" ON "services_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_order_idx" ON "services_blocks_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_parent_id_idx" ON "services_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_path_idx" ON "services_blocks_gallery" USING btree ("_path");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_stats_items_locales_locale_parent_id_unique" ON "services_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_items_locales_parent_id_idx" ON "services_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_stats_locales_locale_parent_id_unique" ON "services_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_locales_parent_id_idx" ON "services_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_grid_order_idx" ON "services_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_services_grid_parent_id_idx" ON "services_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_grid_path_idx" ON "services_blocks_services_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_services_grid_locales_locale_parent_id_uniqu" ON "services_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_services_grid_locales_parent_id_idx" ON "services_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_projects_grid_order_idx" ON "services_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_projects_grid_parent_id_idx" ON "services_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_projects_grid_path_idx" ON "services_blocks_projects_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_projects_grid_locales_locale_parent_id_uniqu" ON "services_blocks_projects_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_projects_grid_locales_parent_id_idx" ON "services_blocks_projects_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_items_order_idx" ON "services_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_items_parent_id_idx" ON "services_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_testimonials_items_locales_locale_parent_id_" ON "services_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_testimonials_items_locales_parent_id_idx" ON "services_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_testimonials_locales_locale_parent_id_unique" ON "services_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_testimonials_locales_parent_id_idx" ON "services_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_cta_locales_locale_parent_id_unique" ON "services_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_cta_locales_parent_id_idx" ON "services_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_items_order_idx" ON "services_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_items_parent_id_idx" ON "services_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_faq_items_locales_locale_parent_id_unique" ON "services_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_items_locales_parent_id_idx" ON "services_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_faq_locales_locale_parent_id_unique" ON "services_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_locales_parent_id_idx" ON "services_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "services_cover_image_idx" ON "services" USING btree ("cover_image_id");
  CREATE INDEX "services_seo_seo_image_idx" ON "services" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_projects_id_idx" ON "services_rels" USING btree ("projects_id");
  CREATE INDEX "_services_v_blocks_hero_ctas_order_idx" ON "_services_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_ctas_parent_id_idx" ON "_services_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_ctas_locales_locale_parent_id_unique" ON "_services_v_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_ctas_locales_parent_id_idx" ON "_services_v_blocks_hero_ctas_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_image_idx" ON "_services_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_locales_locale_parent_id_unique" ON "_services_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_locales_parent_id_idx" ON "_services_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_order_idx" ON "_services_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_parent_id_idx" ON "_services_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_path_idx" ON "_services_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_services_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_locales_parent_id_idx" ON "_services_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_text_image_order_idx" ON "_services_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_text_image_parent_id_idx" ON "_services_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_text_image_path_idx" ON "_services_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_text_image_image_idx" ON "_services_v_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "_services_v_blocks_text_image_locales_locale_parent_id_uniqu" ON "_services_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_text_image_locales_parent_id_idx" ON "_services_v_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_images_order_idx" ON "_services_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_gallery_images_parent_id_idx" ON "_services_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_images_image_idx" ON "_services_v_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_services_v_blocks_gallery_images_locales_locale_parent_id_u" ON "_services_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_images_locales_parent_id_idx" ON "_services_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_order_idx" ON "_services_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_gallery_parent_id_idx" ON "_services_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_path_idx" ON "_services_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_services_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_stats_items_locales_parent_id_idx" ON "_services_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_stats_locales_locale_parent_id_unique" ON "_services_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_stats_locales_parent_id_idx" ON "_services_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_grid_order_idx" ON "_services_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_services_grid_parent_id_idx" ON "_services_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_grid_path_idx" ON "_services_v_blocks_services_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_services_grid_locales_locale_parent_id_un" ON "_services_v_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_services_grid_locales_parent_id_idx" ON "_services_v_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_projects_grid_order_idx" ON "_services_v_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_projects_grid_parent_id_idx" ON "_services_v_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_projects_grid_path_idx" ON "_services_v_blocks_projects_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_projects_grid_locales_locale_parent_id_un" ON "_services_v_blocks_projects_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_projects_grid_locales_parent_id_idx" ON "_services_v_blocks_projects_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_items_order_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_items_parent_id_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_testimonials_items_locales_locale_parent_" ON "_services_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_items_locales_parent_id_idx" ON "_services_v_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_testimonials_locales_locale_parent_id_uni" ON "_services_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_locales_parent_id_idx" ON "_services_v_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_cta_locales_locale_parent_id_unique" ON "_services_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_cta_locales_parent_id_idx" ON "_services_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_items_order_idx" ON "_services_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_items_parent_id_idx" ON "_services_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_services_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_faq_items_locales_parent_id_idx" ON "_services_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_order_idx" ON "_services_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_parent_id_idx" ON "_services_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_path_idx" ON "_services_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_faq_locales_locale_parent_id_unique" ON "_services_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_faq_locales_parent_id_idx" ON "_services_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_cover_image_idx" ON "_services_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_services_v_version_seo_version_seo_image_idx" ON "_services_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_locales_parent_id_idx" ON "_services_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_projects_id_idx" ON "_services_v_rels" USING btree ("projects_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_gallery_locales_locale_parent_id_unique" ON "projects_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_gallery_locales_parent_id_idx" ON "projects_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_ctas_order_idx" ON "projects_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_ctas_parent_id_idx" ON "projects_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_hero_ctas_locales_locale_parent_id_unique" ON "projects_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_ctas_locales_parent_id_idx" ON "projects_blocks_hero_ctas_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_order_idx" ON "projects_blocks_hero" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_parent_id_idx" ON "projects_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_path_idx" ON "projects_blocks_hero" USING btree ("_path");
  CREATE INDEX "projects_blocks_hero_image_idx" ON "projects_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_blocks_hero_locales_locale_parent_id_unique" ON "projects_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_locales_parent_id_idx" ON "projects_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_rich_text_locales_locale_parent_id_unique" ON "projects_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_rich_text_locales_parent_id_idx" ON "projects_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_image_order_idx" ON "projects_blocks_text_image" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_image_parent_id_idx" ON "projects_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_image_path_idx" ON "projects_blocks_text_image" USING btree ("_path");
  CREATE INDEX "projects_blocks_text_image_image_idx" ON "projects_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_blocks_text_image_locales_locale_parent_id_unique" ON "projects_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_text_image_locales_parent_id_idx" ON "projects_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_order_idx" ON "projects_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_images_parent_id_idx" ON "projects_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_image_idx" ON "projects_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_blocks_gallery_images_locales_locale_parent_id_uniq" ON "projects_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_locales_parent_id_idx" ON "projects_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_stats_items_locales_locale_parent_id_unique" ON "projects_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_items_locales_parent_id_idx" ON "projects_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_stats_locales_locale_parent_id_unique" ON "projects_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_locales_parent_id_idx" ON "projects_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_services_grid_order_idx" ON "projects_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_services_grid_parent_id_idx" ON "projects_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_services_grid_path_idx" ON "projects_blocks_services_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_services_grid_locales_locale_parent_id_uniqu" ON "projects_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_services_grid_locales_parent_id_idx" ON "projects_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_projects_grid_order_idx" ON "projects_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_projects_grid_parent_id_idx" ON "projects_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_projects_grid_path_idx" ON "projects_blocks_projects_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_projects_grid_locales_locale_parent_id_uniqu" ON "projects_blocks_projects_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_projects_grid_locales_parent_id_idx" ON "projects_blocks_projects_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_items_order_idx" ON "projects_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_items_parent_id_idx" ON "projects_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_testimonials_items_locales_locale_parent_id_" ON "projects_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_testimonials_items_locales_parent_id_idx" ON "projects_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_order_idx" ON "projects_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_parent_id_idx" ON "projects_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_path_idx" ON "projects_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_testimonials_locales_locale_parent_id_unique" ON "projects_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_testimonials_locales_parent_id_idx" ON "projects_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_order_idx" ON "projects_blocks_cta" USING btree ("_order");
  CREATE INDEX "projects_blocks_cta_parent_id_idx" ON "projects_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_path_idx" ON "projects_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_cta_locales_locale_parent_id_unique" ON "projects_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_cta_locales_parent_id_idx" ON "projects_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_items_order_idx" ON "projects_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_items_parent_id_idx" ON "projects_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_faq_items_locales_locale_parent_id_unique" ON "projects_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_items_locales_parent_id_idx" ON "projects_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_order_idx" ON "projects_blocks_faq" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_parent_id_idx" ON "projects_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_path_idx" ON "projects_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_faq_locales_locale_parent_id_unique" ON "projects_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_locales_parent_id_idx" ON "projects_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "_projects_v_version_gallery_locales_locale_parent_id_unique" ON "_projects_v_version_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_gallery_locales_parent_id_idx" ON "_projects_v_version_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_ctas_order_idx" ON "_projects_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_ctas_parent_id_idx" ON "_projects_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_hero_ctas_locales_locale_parent_id_unique" ON "_projects_v_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_ctas_locales_parent_id_idx" ON "_projects_v_blocks_hero_ctas_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_order_idx" ON "_projects_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_parent_id_idx" ON "_projects_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_path_idx" ON "_projects_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_hero_image_idx" ON "_projects_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_hero_locales_locale_parent_id_unique" ON "_projects_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_locales_parent_id_idx" ON "_projects_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_order_idx" ON "_projects_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_parent_id_idx" ON "_projects_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_path_idx" ON "_projects_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_projects_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_locales_parent_id_idx" ON "_projects_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_image_order_idx" ON "_projects_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_image_parent_id_idx" ON "_projects_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_image_path_idx" ON "_projects_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_text_image_image_idx" ON "_projects_v_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_text_image_locales_locale_parent_id_uniqu" ON "_projects_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_text_image_locales_parent_id_idx" ON "_projects_v_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_order_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_images_parent_id_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_image_idx" ON "_projects_v_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_gallery_images_locales_locale_parent_id_u" ON "_projects_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_locales_parent_id_idx" ON "_projects_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_projects_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_items_locales_parent_id_idx" ON "_projects_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_stats_locales_locale_parent_id_unique" ON "_projects_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_locales_parent_id_idx" ON "_projects_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_services_grid_order_idx" ON "_projects_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_services_grid_parent_id_idx" ON "_projects_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_services_grid_path_idx" ON "_projects_v_blocks_services_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_services_grid_locales_locale_parent_id_un" ON "_projects_v_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_services_grid_locales_parent_id_idx" ON "_projects_v_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_projects_grid_order_idx" ON "_projects_v_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_projects_grid_parent_id_idx" ON "_projects_v_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_projects_grid_path_idx" ON "_projects_v_blocks_projects_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_projects_grid_locales_locale_parent_id_un" ON "_projects_v_blocks_projects_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_projects_grid_locales_parent_id_idx" ON "_projects_v_blocks_projects_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_items_order_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_items_parent_id_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_testimonials_items_locales_locale_parent_" ON "_projects_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_items_locales_parent_id_idx" ON "_projects_v_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_order_idx" ON "_projects_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_parent_id_idx" ON "_projects_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_path_idx" ON "_projects_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_testimonials_locales_locale_parent_id_uni" ON "_projects_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_locales_parent_id_idx" ON "_projects_v_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_order_idx" ON "_projects_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_cta_parent_id_idx" ON "_projects_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_path_idx" ON "_projects_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_cta_locales_locale_parent_id_unique" ON "_projects_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_locales_parent_id_idx" ON "_projects_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_items_order_idx" ON "_projects_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_items_parent_id_idx" ON "_projects_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_projects_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_items_locales_parent_id_idx" ON "_projects_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_order_idx" ON "_projects_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_parent_id_idx" ON "_projects_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_path_idx" ON "_projects_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_faq_locales_locale_parent_id_unique" ON "_projects_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_locales_parent_id_idx" ON "_projects_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_image_idx" ON "_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_services_id_idx" ON "_projects_v_rels" USING btree ("services_id");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_seo_seo_image_idx" ON "posts" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_locales_parent_id_idx" ON "posts_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_image_idx" ON "_posts_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_locales_parent_id_idx" ON "_posts_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_locales_parent_id_idx" ON "categories_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_w480_sizes_w480_filename_idx" ON "media" USING btree ("sizes_w480_filename");
  CREATE INDEX "media_sizes_w800_sizes_w800_filename_idx" ON "media" USING btree ("sizes_w800_filename");
  CREATE INDEX "media_sizes_w1200_sizes_w1200_filename_idx" ON "media" USING btree ("sizes_w1200_filename");
  CREATE INDEX "media_sizes_w1600_sizes_w1600_filename_idx" ON "media" USING btree ("sizes_w1600_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_address_order_idx" ON "site_settings_address" USING btree ("_order");
  CREATE INDEX "site_settings_address_parent_id_idx" ON "site_settings_address" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_image_idx" ON "site_settings" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_intro_facts_order_idx" ON "home_page_intro_facts" USING btree ("_order");
  CREATE INDEX "home_page_intro_facts_parent_id_idx" ON "home_page_intro_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_intro_facts_locales_locale_parent_id_unique" ON "home_page_intro_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_intro_facts_locales_parent_id_idx" ON "home_page_intro_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_archive_numbers_order_idx" ON "home_page_archive_numbers" USING btree ("_order");
  CREATE INDEX "home_page_archive_numbers_parent_id_idx" ON "home_page_archive_numbers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_archive_numbers_locales_locale_parent_id_unique" ON "home_page_archive_numbers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_archive_numbers_locales_parent_id_idx" ON "home_page_archive_numbers_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_archive_categories_order_idx" ON "home_page_archive_categories" USING btree ("_order");
  CREATE INDEX "home_page_archive_categories_parent_id_idx" ON "home_page_archive_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_archive_categories_locales_locale_parent_id_unique" ON "home_page_archive_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_archive_categories_locales_parent_id_idx" ON "home_page_archive_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_archive_images_order_idx" ON "home_page_archive_images" USING btree ("_order");
  CREATE INDEX "home_page_archive_images_parent_id_idx" ON "home_page_archive_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_archive_images_image_idx" ON "home_page_archive_images" USING btree ("image_id");
  CREATE INDEX "home_page_approach_principles_order_idx" ON "home_page_approach_principles" USING btree ("_order");
  CREATE INDEX "home_page_approach_principles_parent_id_idx" ON "home_page_approach_principles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_approach_principles_locales_locale_parent_id_uniqu" ON "home_page_approach_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_approach_principles_locales_parent_id_idx" ON "home_page_approach_principles_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_studio_people_order_idx" ON "home_page_studio_people" USING btree ("_order");
  CREATE INDEX "home_page_studio_people_parent_id_idx" ON "home_page_studio_people" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_studio_people_locales_locale_parent_id_unique" ON "home_page_studio_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_studio_people_locales_parent_id_idx" ON "home_page_studio_people_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_hero_left_image_idx" ON "home_page" USING btree ("hero_left_image_id");
  CREATE INDEX "home_page_hero_hero_right_image_idx" ON "home_page" USING btree ("hero_right_image_id");
  CREATE INDEX "home_page_approach_approach_image_idx" ON "home_page" USING btree ("approach_image_id");
  CREATE INDEX "home_page_seo_seo_image_idx" ON "home_page" USING btree ("seo_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_locales_parent_id_idx" ON "home_page_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_projects_id_idx" ON "home_page_rels" USING btree ("projects_id");
  CREATE INDEX "home_page_rels_services_id_idx" ON "home_page_rels" USING btree ("services_id");
  CREATE INDEX "_home_page_v_version_intro_facts_order_idx" ON "_home_page_v_version_intro_facts" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_intro_facts_parent_id_idx" ON "_home_page_v_version_intro_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_intro_facts_locales_locale_parent_id_un" ON "_home_page_v_version_intro_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_intro_facts_locales_parent_id_idx" ON "_home_page_v_version_intro_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_archive_numbers_order_idx" ON "_home_page_v_version_archive_numbers" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_archive_numbers_parent_id_idx" ON "_home_page_v_version_archive_numbers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_archive_numbers_locales_locale_parent_i" ON "_home_page_v_version_archive_numbers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_archive_numbers_locales_parent_id_idx" ON "_home_page_v_version_archive_numbers_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_archive_categories_order_idx" ON "_home_page_v_version_archive_categories" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_archive_categories_parent_id_idx" ON "_home_page_v_version_archive_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_archive_categories_locales_locale_paren" ON "_home_page_v_version_archive_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_archive_categories_locales_parent_i_idx" ON "_home_page_v_version_archive_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_archive_images_order_idx" ON "_home_page_v_version_archive_images" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_archive_images_parent_id_idx" ON "_home_page_v_version_archive_images" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_archive_images_image_idx" ON "_home_page_v_version_archive_images" USING btree ("image_id");
  CREATE INDEX "_home_page_v_version_approach_principles_order_idx" ON "_home_page_v_version_approach_principles" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_approach_principles_parent_id_idx" ON "_home_page_v_version_approach_principles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_approach_principles_locales_locale_pare" ON "_home_page_v_version_approach_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_approach_principles_locales_parent__idx" ON "_home_page_v_version_approach_principles_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_studio_people_order_idx" ON "_home_page_v_version_studio_people" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_studio_people_parent_id_idx" ON "_home_page_v_version_studio_people" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_studio_people_locales_locale_parent_id_" ON "_home_page_v_version_studio_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_studio_people_locales_parent_id_idx" ON "_home_page_v_version_studio_people_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_version_hero_left_image_idx" ON "_home_page_v" USING btree ("version_hero_left_image_id");
  CREATE INDEX "_home_page_v_version_hero_version_hero_right_image_idx" ON "_home_page_v" USING btree ("version_hero_right_image_id");
  CREATE INDEX "_home_page_v_version_approach_version_approach_image_idx" ON "_home_page_v" USING btree ("version_approach_image_id");
  CREATE INDEX "_home_page_v_version_seo_version_seo_image_idx" ON "_home_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_snapshot_idx" ON "_home_page_v" USING btree ("snapshot");
  CREATE INDEX "_home_page_v_published_locale_idx" ON "_home_page_v" USING btree ("published_locale");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_home_page_v_locales_locale_parent_id_unique" ON "_home_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_locales_parent_id_idx" ON "_home_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_rels_order_idx" ON "_home_page_v_rels" USING btree ("order");
  CREATE INDEX "_home_page_v_rels_parent_idx" ON "_home_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_page_v_rels_path_idx" ON "_home_page_v_rels" USING btree ("path");
  CREATE INDEX "_home_page_v_rels_projects_id_idx" ON "_home_page_v_rels" USING btree ("projects_id");
  CREATE INDEX "_home_page_v_rels_services_id_idx" ON "_home_page_v_rels" USING btree ("services_id");
  CREATE INDEX "services_landing_seo_seo_image_idx" ON "services_landing" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "services_landing_locales_locale_parent_id_unique" ON "services_landing_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_landing_locales_parent_id_idx" ON "services_landing_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_landing_seo_seo_image_idx" ON "projects_landing" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "projects_landing_locales_locale_parent_id_unique" ON "projects_landing_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_landing_locales_parent_id_idx" ON "projects_landing_locales" USING btree ("_parent_id");
  CREATE INDEX "journal_landing_seo_seo_image_idx" ON "journal_landing" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "journal_landing_locales_locale_parent_id_unique" ON "journal_landing_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journal_landing_locales_parent_id_idx" ON "journal_landing_locales" USING btree ("_parent_id");
  CREATE INDEX "contact_page_seo_seo_image_idx" ON "contact_page" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_locales_parent_id_idx" ON "contact_page_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_text_image" CASCADE;
  DROP TABLE "pages_blocks_text_image_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_services_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_projects_grid" CASCADE;
  DROP TABLE "pages_blocks_projects_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_text_image" CASCADE;
  DROP TABLE "_pages_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services_blocks_hero_ctas" CASCADE;
  DROP TABLE "services_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_hero_locales" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_rich_text_locales" CASCADE;
  DROP TABLE "services_blocks_text_image" CASCADE;
  DROP TABLE "services_blocks_text_image_locales" CASCADE;
  DROP TABLE "services_blocks_gallery_images" CASCADE;
  DROP TABLE "services_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "services_blocks_gallery" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats_items_locales" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_stats_locales" CASCADE;
  DROP TABLE "services_blocks_services_grid" CASCADE;
  DROP TABLE "services_blocks_services_grid_locales" CASCADE;
  DROP TABLE "services_blocks_projects_grid" CASCADE;
  DROP TABLE "services_blocks_projects_grid_locales" CASCADE;
  DROP TABLE "services_blocks_testimonials_items" CASCADE;
  DROP TABLE "services_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_testimonials_locales" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_cta_locales" CASCADE;
  DROP TABLE "services_blocks_faq_items" CASCADE;
  DROP TABLE "services_blocks_faq_items_locales" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_faq_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_services_v_blocks_text_image" CASCADE;
  DROP TABLE "_services_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "_services_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_services_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_services_v_blocks_gallery" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_services_v_blocks_services_grid" CASCADE;
  DROP TABLE "_services_v_blocks_services_grid_locales" CASCADE;
  DROP TABLE "_services_v_blocks_projects_grid" CASCADE;
  DROP TABLE "_services_v_blocks_projects_grid_locales" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_services_v_blocks_faq_items" CASCADE;
  DROP TABLE "_services_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_faq" CASCADE;
  DROP TABLE "_services_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_hero_ctas" CASCADE;
  DROP TABLE "projects_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "projects_blocks_hero" CASCADE;
  DROP TABLE "projects_blocks_hero_locales" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects_blocks_rich_text_locales" CASCADE;
  DROP TABLE "projects_blocks_text_image" CASCADE;
  DROP TABLE "projects_blocks_text_image_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_images" CASCADE;
  DROP TABLE "projects_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats_items_locales" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_stats_locales" CASCADE;
  DROP TABLE "projects_blocks_services_grid" CASCADE;
  DROP TABLE "projects_blocks_services_grid_locales" CASCADE;
  DROP TABLE "projects_blocks_projects_grid" CASCADE;
  DROP TABLE "projects_blocks_projects_grid_locales" CASCADE;
  DROP TABLE "projects_blocks_testimonials_items" CASCADE;
  DROP TABLE "projects_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "projects_blocks_testimonials" CASCADE;
  DROP TABLE "projects_blocks_testimonials_locales" CASCADE;
  DROP TABLE "projects_blocks_cta" CASCADE;
  DROP TABLE "projects_blocks_cta_locales" CASCADE;
  DROP TABLE "projects_blocks_faq_items" CASCADE;
  DROP TABLE "projects_blocks_faq_items_locales" CASCADE;
  DROP TABLE "projects_blocks_faq" CASCADE;
  DROP TABLE "projects_blocks_faq_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v_version_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_hero" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_text_image" CASCADE;
  DROP TABLE "_projects_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_stats" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_services_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_services_grid_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_projects_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_projects_grid_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_cta" CASCADE;
  DROP TABLE "_projects_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_items" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_faq" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_address" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "home_page_intro_facts" CASCADE;
  DROP TABLE "home_page_intro_facts_locales" CASCADE;
  DROP TABLE "home_page_archive_numbers" CASCADE;
  DROP TABLE "home_page_archive_numbers_locales" CASCADE;
  DROP TABLE "home_page_archive_categories" CASCADE;
  DROP TABLE "home_page_archive_categories_locales" CASCADE;
  DROP TABLE "home_page_archive_images" CASCADE;
  DROP TABLE "home_page_approach_principles" CASCADE;
  DROP TABLE "home_page_approach_principles_locales" CASCADE;
  DROP TABLE "home_page_studio_people" CASCADE;
  DROP TABLE "home_page_studio_people_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "_home_page_v_version_intro_facts" CASCADE;
  DROP TABLE "_home_page_v_version_intro_facts_locales" CASCADE;
  DROP TABLE "_home_page_v_version_archive_numbers" CASCADE;
  DROP TABLE "_home_page_v_version_archive_numbers_locales" CASCADE;
  DROP TABLE "_home_page_v_version_archive_categories" CASCADE;
  DROP TABLE "_home_page_v_version_archive_categories_locales" CASCADE;
  DROP TABLE "_home_page_v_version_archive_images" CASCADE;
  DROP TABLE "_home_page_v_version_approach_principles" CASCADE;
  DROP TABLE "_home_page_v_version_approach_principles_locales" CASCADE;
  DROP TABLE "_home_page_v_version_studio_people" CASCADE;
  DROP TABLE "_home_page_v_version_studio_people_locales" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_locales" CASCADE;
  DROP TABLE "_home_page_v_rels" CASCADE;
  DROP TABLE "services_landing" CASCADE;
  DROP TABLE "services_landing_locales" CASCADE;
  DROP TABLE "projects_landing" CASCADE;
  DROP TABLE "projects_landing_locales" CASCADE;
  DROP TABLE "journal_landing" CASCADE;
  DROP TABLE "journal_landing_locales" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_pages_blocks_hero_layout";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_text_image_image_position";
  DROP TYPE "public"."enum_pages_blocks_text_image_background";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_cta_background";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_layout";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_background";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_services_blocks_hero_layout";
  DROP TYPE "public"."enum_services_blocks_rich_text_width";
  DROP TYPE "public"."enum_services_blocks_text_image_image_position";
  DROP TYPE "public"."enum_services_blocks_text_image_background";
  DROP TYPE "public"."enum_services_blocks_gallery_layout";
  DROP TYPE "public"."enum_services_blocks_cta_background";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_hero_layout";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__services_v_blocks_text_image_image_position";
  DROP TYPE "public"."enum__services_v_blocks_text_image_background";
  DROP TYPE "public"."enum__services_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__services_v_blocks_cta_background";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_projects_blocks_hero_layout";
  DROP TYPE "public"."enum_projects_blocks_rich_text_width";
  DROP TYPE "public"."enum_projects_blocks_text_image_image_position";
  DROP TYPE "public"."enum_projects_blocks_text_image_background";
  DROP TYPE "public"."enum_projects_blocks_gallery_layout";
  DROP TYPE "public"."enum_projects_blocks_cta_background";
  DROP TYPE "public"."enum_projects_type";
  DROP TYPE "public"."enum_projects_build_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_blocks_hero_layout";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__projects_v_blocks_text_image_image_position";
  DROP TYPE "public"."enum__projects_v_blocks_text_image_background";
  DROP TYPE "public"."enum__projects_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__projects_v_blocks_cta_background";
  DROP TYPE "public"."enum__projects_v_version_type";
  DROP TYPE "public"."enum__projects_v_version_build_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum__home_page_v_published_locale";`)
}
