// third-party libraries
import { Knex } from "knex";

/**
 * Create table
 * @param knex 
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_table', (table: any) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('company_name').notNullable();
    table.timestamps(true, true);

  })
}

/**
 * Drop table
 * @param knex 
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users_table');
}

