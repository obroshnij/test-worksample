import User from "../models/user";
import { openDb } from "../../../infra/db";
import FetchUserById from "./fetchUserById";

export default class CreateUser {
  constructor(public firstName: string, public lastName: string) {}

  async create() : Promise<User> {
    const db = await openDb();

    // insert into db
    // @ts-ignore
    const insertUser = db.run('INSERT INTO users(first_name, last_name) VALUES(?, ?)', [this.firstName, this.lastName])

    const user = insertUser.then(
      result => new FetchUserById(result.lastID).fetch()
    )

    return user;
  }
}