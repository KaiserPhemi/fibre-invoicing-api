// third-party libraries
import { Knex } from "knex";

/**
 * Create talbe
 * @param knex 
 * @returns 
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invoices', (table: any) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users_table');
    table.boolean('paid').defaultTo(false);
    table.timestamps(true, true);
  })
}

/**
 * Drop table
 * @param knex 
 * @returns 
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('invoices');
}

