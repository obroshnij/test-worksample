import User from "../models/user";
import { openDb } from "../../../infra/db";

enum SortOrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

interface SortOrder {
  createdAt: SortOrderDirection
}

export default class FetchAllUsers {
  constructor(public sortOrder?: SortOrder) {}

  async fetch() : Promise<any> {
    const db = await openDb();
    
    const orderClause = this.sortOrder && this.sortOrder.hasOwnProperty('createdAt') && `ORDER BY created_at ${this.sortOrder.createdAt}`

    // @ts-ignore
    const readDb = db.all(`SELECT id, first_name, last_name, created_at FROM users ${orderClause}`)

    const users = readDb.then(
      result => result.map(row => new User(row.first_name, row.last_name, row.id, row.created_at))
    )

    return users;
  }
}

export { SortOrderDirection }