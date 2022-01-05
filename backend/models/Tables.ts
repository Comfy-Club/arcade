import pgPool from '../config/postgres';

export default class Table {
  public async init() {
    const sqlUser = `
        CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL)`;

    const client = await pgPool.connect();
    client.query(sqlUser)
  }
}
