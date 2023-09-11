import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb () {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}

export async function initTables() {
  const db = await openDb();

  // @ts-ignore
  return db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `
  ); // create users table
}