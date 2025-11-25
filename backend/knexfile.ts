import { Knex } from 'knex';
import z from 'zod';

// const parseDatabaseUrl = (url: string) => {
//   const urlParts = new URL(url);
//   return {
//     host: urlParts.hostname,
//     port: Number(urlParts.port),
//     user: urlParts.username,
//     password: urlParts.password,
//     database: urlParts.pathname.substring(1),
//   };
// };

const connectionSchema = z.object({
  host: z.string(),
  port: z.number(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
});

// const connectionConfig = process.env.DATABASE_URL
//   ? parseDatabaseUrl(process.env.DATABASE_URL)
//   : {
//     host: process.env.DB_HOST || 'localhost',
//     port: Number(process.env.DB_PORT) || 5432,
//     user: process.env.DB_USER || 'postgres',
//     password: process.env.DB_PASSWORD || 'postgres',
//     database: process.env.DB_NAME || 'time_tracker',
//   };

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: () => connectionSchema.parse({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'time_tracker',
    }),
    migrations: {
      tableName: 'knex_migrations',
      directory: './dist/src/database/migrations',
      extension: 'js',
    },
    // seeds: {
    //   directory: './src/database/seeds',
    // },
  }
};

export default config;

