// import Knex from 'knex';
// import config from '../../knexfile';

// async function runMigrations() {
//     const knex = Knex(config.development);
//     try {
//         console.log('Running migrations from:', config?.development?.migrations?.directory);
//         await knex.migrate.latest();
//         console.log('Migrations completed successfully');
//     } catch (error) {
//         console.error('Migration error:', error);
//         process.exit(1);
//     } finally {
//         await knex.destroy();
//     }
// }

// runMigrations();