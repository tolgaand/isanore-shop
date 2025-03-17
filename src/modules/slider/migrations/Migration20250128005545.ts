import { Migration } from '@mikro-orm/migrations';

export class Migration20250128005545 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "slider" add column if not exists "rank" integer not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "slider" drop column if exists "rank";`);
  }

}
