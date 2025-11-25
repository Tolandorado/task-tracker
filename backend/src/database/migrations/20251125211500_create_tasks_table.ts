import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Создаем расширение для генерации UUID
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('description').notNullable();
    table.timestamp('start_at', { useTz: true }).notNullable();
    table.timestamp('end_at', { useTz: true }).nullable();
    table.enum('status', ['active', 'done']).notNullable().defaultTo('active');

  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
}
