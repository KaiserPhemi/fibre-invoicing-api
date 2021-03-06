// Update with your config settings.
// require("ts-node/register");
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "fibre_db",
      user: "oluwafemiakinwa",
      password: null,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./knex/seeds",
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
  
    },
    pool: {
      min: 1,
      max: 50,
    },
    migrations: {
      directory: "./knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./knex/seeds",
    },
  },
};
