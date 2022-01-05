import { Pool } from 'pg';

const pgPool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'comfy-backend',
  password: 'postgres',
  port: 5432
});

pgPool.on('error', (err, client) => {
  console.error("Unexpected error on idle client", err);
});

export default pgPool;
