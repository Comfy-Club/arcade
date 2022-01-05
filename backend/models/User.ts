import { QueryResult } from 'pg';

import pgPool from '../config/postgres';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class UserDAO {
  static async addUser(username: string, email: string, password: string) {
    const sqlAddUser = `INSERT INTO Users(username, email, password) VALUES ($1, $2, $3);`;
    const client = await pgPool.connect();

    try {
      await client.query(sqlAddUser, [username, email, password]);
      return await UserDAO.findByEmail(email);
    } catch (err) {
      console.log(err);
    }
    finally {
      client.release();
    }
  }

  static async findByEmail(email: string) : Promise<User> {
    const sqlGetUser = `SELECT * FROM Users WHERE email=$1`;
    const sqlData = [email];
    const client = await pgPool.connect();

    let query = await client.query(sqlGetUser, sqlData);
    return UserDAO.userFactoryByQuery(query);
  }

  static async findById(id: number) : Promise<User> {
    const sqlGetUser = `SELECT * FROM Users WHERE id=$1`;
    const sqlData = [id.toString()];
    const client = await pgPool.connect();

    let query = await client.query(sqlGetUser, sqlData);
    return this.userFactoryByQuery(query);
  }

  private static userFactory(id: number, username: string, email: string, password: string) {
    let user: User = {
      id: id,
      name: username,
      email: email,
      password: password
    }   
    return user;
  }

  private static userFactoryByQuery(query: QueryResult) {
    let user: User = {
      id: query.rows[0].id,
      name: query.rows[0].username,
      email: query.rows[0].email,
      password: query.rows[0].password
    }
    return user;
  }
}
