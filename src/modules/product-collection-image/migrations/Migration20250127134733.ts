import { Migration } from '@mikro-orm/migrations';

export class Migration20250127134733 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "product_collection_image" ("id" text not null, "rank" integer not null, "url" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_collection_image_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_collection_image_deleted_at" ON "product_collection_image" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product_collection_image" cascade;`);
  }

}
