// third-party libraries
import { Knex } from "knex";

/**
 * create table
 * @param knex 
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table: any) => {
    table.increments('id').primary();
    table.string('item_name').notNullable();
    table.integer('item_price').notNullable();
    table.integer('invoice_id').unsigned().notNullable();
    table.foreign('invoice_id').references('id').inTable('invoices');
    table.timestamps(true, true);
  })
}

/**
 * Drop table
 * @param knex 
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('transactions');
}

