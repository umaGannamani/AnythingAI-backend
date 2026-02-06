const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Use absolute path (avoids issues when running from different folders)
const dbPath = path.join(__dirname, "../../database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite:", err.message);
  } else {
    console.log("SQLite connected");
  }
});

// Enable foreign key constraints
db.run(`PRAGMA foreign_keys = ON`);

db.serialize(() => {
  // USERS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('user', 'admin')) DEFAULT 'user'
    )
  `);

  // TASKS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
