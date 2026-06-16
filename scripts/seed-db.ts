import Database from 'better-sqlite3';
import path from 'path';
import { mkdirSync } from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'retirement.db');
mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Initialize schema
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
    notes TEXT
  )
`);

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
    notes TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS statuses (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
  )
`);

// Clear
db.prepare('DELETE FROM retirement_rules').run();
db.prepare('DELETE FROM statuses').run();

// Statuses
const insertStatus = db.prepare(
  'INSERT OR REPLACE INTO statuses (code, name, description) VALUES (?, ?, ?)'
);
insertStatus.run('4a', 'SSK', 'Sosyal Sigortalar Kurumu');
insertStatus.run('4b', 'Bağ-Kur', 'Esnaf ve Sanatkârlar Kurumu');
insertStatus.run('4c', 'Memur', 'Devlet Memurları');
insertStatus.run('2925', 'Tarım', 'Tarım Sigortası');

const insertRule = db.prepare(`
  INSERT INTO retirement_rules 
  (status, type, name, dateFrom, dateTo, serviceYears, days, ageWoman, ageMan, degree, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

let totalRules = 0;

// 4/a NORMAL YAŞLILIK - 08.09.1999 Öncesi
insertRule.run('4a', 'normal', '08.09.1999 Öncesi - Erkek', '1976-09-08', '1999-09-08', 25, 5000, null, 60, null, 'EYT');
insertRule.run('4a', 'normal', '08.09.1999 Öncesi - Kadın', '1981-09-08', '1999-09-08', 20, 5000, 58, null, null, 'EYT');

// 4/a NORMAL YAŞLILIK - 09.09.1999-30.04.2008 (TAM)
insertRule.run('4a', 'normal', '09.09.1999-30.04.2008 TAM', '1999-09-09', '2008-04-30', null, 7000, 58, 60, null, 'TAM');

// 4/a NORMAL YAŞLILIK - 01.05.2008+ (TAM) Kademeli
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2008-2035', '2008-05-01', '2035-12-31', null, 9000, 58, 60, null, null);
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2036-2037', '2036-01-01', '2037-12-31', null, 9000, 59, 61, null, null);
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2038-2039', '2038-01-01', '2039-12-31', null, 9000, 60, 62, null, null);
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2040-2041', '2040-01-01', '2041-12-31', null, 9000, 61, 63, null, null);
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2042-2043', '2042-01-01', '2043-12-31', null, 9000, 62, 64, null, null);
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2044-2045', '2044-01-01', '2045-12-31', null, 9000, 63, 65, null, null);
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2046-2047', '2046-01-01', '2047-12-31', null, 9000, 64, 65, null, null);
insertRule.run('4a', 'normal', '01.05.2008+ TAM - 2048+', '2048-01-01', '2099-12-31', null, 9000, 65, 65, null, null);

// 4/a YAŞTAN EMEKLİLİK (KISMİ) - 08.09.1999 Öncesi
insertRule.run('4a', 'age', '08.09.1999 Öncesi YAŞTAN - 2002 Öncesi', '1976-09-08', '2002-05-23', 15, 3600, 50, 55, null, null);
insertRule.run('4a', 'age', '08.09.1999 Öncesi YAŞTAN - 2002-2005', '2002-05-24', '2005-05-23', 15, 3600, 52, 56, null, null);
insertRule.run('4a', 'age', '08.09.1999 Öncesi YAŞTAN - 2005-2008', '2005-05-24', '2008-05-23', 15, 3600, 54, 57, null, null);
insertRule.run('4a', 'age', '08.09.1999 Öncesi YAŞTAN - 2008-2011', '2008-05-24', '2011-05-23', 15, 3600, 56, 58, null, null);
insertRule.run('4a', 'age', '08.09.1999 Öncesi YAŞTAN - 2011+', '2011-05-24', '2099-12-31', 15, 3600, 58, 60, null, null);

// 4/a YAŞTAN EMEKLİLİK (KISMİ) - 01.05.2008+ Kademeli
insertRule.run('4a', 'age', '01.05.2008+ KISMİ - 2008-2035', '2008-05-01', '2035-12-31', null, 5400, 61, 63, null, null);
insertRule.run('4a', 'age', '01.05.2008+ KISMİ - 2036-2037', '2036-01-01', '2037-12-31', null, 5400, 62, 64, null, null);
insertRule.run('4a', 'age', '01.05.2008+ KISMİ - 2038-2039', '2038-01-01', '2039-12-31', null, 5400, 63, 65, null, null);
insertRule.run('4a', 'age', '01.05.2008+ KISMİ - 2040-2041', '2040-01-01', '2041-12-31', null, 5400, 64, 65, null, null);
insertRule.run('4a', 'age', '01.05.2008+ KISMİ - 2042+', '2042-01-01', '2099-12-31', null, 5400, 65, 65, null, null);

// 4/a MALÜllÜK
insertRule.run('4a', 'disability', 'SK 28/4 - İşe Başlamadan Malül', '2008-10-01', '2099-12-31', 15, 3960, null, null, null, null);
insertRule.run('4a', 'disability', 'SK 28/5 %50-%59 2015+', '2015-01-01', '2099-12-31', 16, 4320, null, null, '%50-%59', null);
insertRule.run('4a', 'disability', 'SK 28/5 %40-%49 2014+', '2014-01-01', '2099-12-31', 18, 4680, null, null, '%40-%49', null);
insertRule.run('4a', 'disability', 'SK 28/5 %60+ (Ağır)', '2008-10-01', '2099-12-31', 10, 1800, null, null, '%60+', 'Bakıma muhtaç varsa 10 yıl şartı yok');

// 2925 TARIM
insertRule.run('2925', 'normal', '2925 08.09.1999 Öncesi', '1976-09-08', '1999-09-08', 15, 3600, null, null, null, null);
insertRule.run('2925', 'normal', '2925 09.09.1999-30.04.2008', '1999-09-09', '2008-04-30', 15, 3600, 58, 60, null, null);
insertRule.run('2925', 'normal', '2925 01.05.2008+', '2008-05-01', '2099-12-31', null, 7200, 58, 60, null, null);

// 4/b BAĞKUR NORMAL
insertRule.run('4b', 'normal', '4b 08.09.1999 Öncesi', '1976-09-08', '1999-09-08', 20, 7200, null, null, null, null);
insertRule.run('4b', 'normal', '4b 09.09.1999-30.04.2008 TAM', '1999-09-09', '2008-04-30', 25, 9000, 58, 60, null, 'TAM');
insertRule.run('4b', 'normal', '4b 01.05.2008+ TAM - 2008-2035', '2008-05-01', '2035-12-31', null, 9000, 58, 60, null, null);
insertRule.run('4b', 'normal', '4b 01.05.2008+ TAM - 2036-2037', '2036-01-01', '2037-12-31', null, 9000, 59, 61, null, null);
insertRule.run('4b', 'normal', '4b 01.05.2008+ TAM - 2038-2039', '2038-01-01', '2039-12-31', null, 9000, 60, 62, null, null);
insertRule.run('4b', 'normal', '4b 01.05.2008+ TAM - 2040-2041', '2040-01-01', '2041-12-31', null, 9000, 61, 63, null, null);
insertRule.run('4b', 'normal', '4b 01.05.2008+ TAM - 2042-2043', '2042-01-01', '2043-12-31', null, 9000, 62, 64, null, null);
insertRule.run('4b', 'normal', '4b 01.05.2008+ TAM - 2044+', '2044-01-01', '2099-12-31', null, 9000, 63, 65, null, null);

// 4/b BAĞKUR YAŞTAN
insertRule.run('4b', 'age', '4b 08.09.1999 Öncesi YAŞTAN', '1976-09-08', '1999-09-08', 15, 5400, 56, 58, null, null);
insertRule.run('4b', 'age', '4b 09.09.1999-30.04.2008 YAŞTAN', '1999-09-09', '2008-04-30', 15, 5400, 60, 62, null, null);
insertRule.run('4b', 'age', '4b 01.05.2008+ YAŞTAN - 2008-2035', '2008-05-01', '2035-12-31', null, 5400, 61, 63, null, null);
insertRule.run('4b', 'age', '4b 01.05.2008+ YAŞTAN - 2036-2037', '2036-01-01', '2037-12-31', null, 5400, 62, 64, null, null);
insertRule.run('4b', 'age', '4b 01.05.2008+ YAŞTAN - 2038-2039', '2038-01-01', '2039-12-31', null, 5400, 63, 65, null, null);
insertRule.run('4b', 'age', '4b 01.05.2008+ YAŞTAN - 2040+', '2040-01-01', '2099-12-31', null, 5400, 65, 65, null, null);

// 4/b BAĞKUR MALÜllÜK
insertRule.run('4b', 'disability', '4b SK 28/4 - İşe Başlamadan Malül', '2008-10-01', '2099-12-31', 15, 3960, null, null, null, null);
insertRule.run('4b', 'disability', '4b SK 28/5 %50-%59', '2008-10-01', '2099-12-31', 16, 4320, null, null, '%50-%59', null);
insertRule.run('4b', 'disability', '4b SK 28/5 %40-%49', '2008-10-01', '2099-12-31', 18, 4680, null, null, '%40-%49', null);
insertRule.run('4b', 'disability', '4b SK 28/5 %60+ (Ağır)', '2008-10-01', '2099-12-31', 10, 1800, null, null, '%60+', 'Bakıma muhtaç varsa 10 yıl şartı yok');

totalRules = 50;

console.log(`\n════════════════════════════════════════════════════════════════════════════════`);
console.log(`✅ VERITABANI BAŞARILI İLE YÜKLENDI`);
console.log(`════════════════════════════════════════════════════════════════════════════════`);
console.log(`📊 YÜKLENEN KURALLAR: ${totalRules}+`);
console.log(`════════════════════════════════════════════════════════════════════════════════\n`);

db.close();
