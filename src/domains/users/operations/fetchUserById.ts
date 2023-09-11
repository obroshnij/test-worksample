
import User from "../models/user";
import { openDb } from "../../../infra/db";

export default class FetchUserById {
  constructor(public id: number) {}

  async fetch() : Promise<User> {
    const db = await openDb();
    
    // @ts-ignore
    const readDb = db.get('SELECT id, first_name, last_name, created_at FROM users WHERE id = ?', this.id)

    const user = readDb.then(
      result => new User(result.first_name, result.last_name, result.id, result.created_at)
    )

    return user;
  }
}