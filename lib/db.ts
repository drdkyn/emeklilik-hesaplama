import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'retirement.db');

// Ensure data directory exists
import { mkdirSync } from 'fs';
try {
  mkdirSync(path.dirname(dbPath), { recursive: true });
} catch (e) {
  // Directory might already exist
}

const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export default db;

export function initializeDatabase() {
  // Rules table
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
      source TEXT DEFAULT 'excel',
      UNIQUE(status, type, name, dateFrom, dateTo, degree)
    )
  `);

  // Statuses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS statuses (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  // Disability types table
  db.exec(`
    CREATE TABLE IF NOT EXISTS disability_types (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  // Insert statuses if not exist
  const insertStatus = db.prepare(
    'INSERT OR IGNORE INTO statuses (code, name, description) VALUES (?, ?, ?)'
  );
  insertStatus.run('4a', 'SSK', 'Sosyal Sigortalar Kurumu');
  insertStatus.run('4b', 'Bağ-Kur', 'Esnaf ve Sanatkârlar Kurumu');
  insertStatus.run('4c', 'Memur', 'Devlet Memurları');
  insertStatus.run('2925', 'Tarım', 'Tarım Sigortası');

  // Insert disability types if not exist
  const insertDisability = db.prepare(
    'INSERT OR IGNORE INTO disability_types (code, name, description) VALUES (?, ?, ?)'
  );
  insertDisability.run('yok', 'Yok', 'Malüllük yok');
  insertDisability.run('sk284', 'SK 28/4', 'İlk İşe Girişte Malül');
  insertDisability.run('sk285', 'SK 28/5', 'Sonradan Malül');
}
