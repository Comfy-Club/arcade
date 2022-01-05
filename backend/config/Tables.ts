import pgPool from './postgres'

const sqlUser = `
  CREATE TABLE IF NOT EXISTS Users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
  )`;

class TablesConfig {
  public async init() {
    const client = await pgPool.connect();
    try {
      client.query(sqlUser);
      console.log('Tables initialized sucessfully');
    } catch (err) {
      console.log(`Table initialization error: ${err}`);
      process.exit(-1);
    } finally {
      client.release();
    }
  }
}

export default TablesConfig;
