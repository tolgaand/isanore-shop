import { Migration } from '@mikro-orm/migrations';

export class Migration20250128005320 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "slider" ("id" text not null, "url" text not null, "handle" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "slider_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_slider_deleted_at" ON "slider" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "slider" cascade;`);
  }

}
