import Database from 'better-sqlite3';
import path from 'path';
import { mkdirSync } from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'retirement.db');
mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

export function initializeDatabase() {
  // Basit kurallar tablosu
  db.exec(`
    CREATE TABLE IF NOT EXISTS retirement_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      dateFrom TEXT NOT NULL,
      dateTo TEXT NOT NULL,
      serviceYears INTEGER,
      days INTEGER,
      ageWoman INTEGER,
      ageMan INTEGER,
      degree TEXT,
      notes TEXT,
      source TEXT DEFAULT 'excel'
    )
  `);

  // Kademeli kurallar tablosu (01.05.2008+ gibi)
  db.exec(`
    CREATE TABLE IF NOT EXISTS retirement_rules_gradual (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      baseRule TEXT,
      periodStart TEXT NOT NULL,
      periodEnd TEXT NOT NULL,
      serviceYears INTEGER,
      days INTEGER,
      ageWoman INTEGER,
      ageMan INTEGER,
      degree TEXT,
      notes TEXT,
      source TEXT DEFAULT 'excel'
    )
  `);

  // Statüler
  db.exec(`
    CREATE TABLE IF NOT EXISTS statuses (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  // Ödeme tarihleri (opsiyonel)
  db.exec(`
    CREATE TABLE IF NOT EXISTS payment_dates (
      tahsis_no INTEGER PRIMARY KEY,
      day INTEGER NOT NULL
    )
  `);
}

export default db;
