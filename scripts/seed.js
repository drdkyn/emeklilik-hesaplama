const Database = require('better-sqlite3');
const path = require('path');
const { mkdirSync } = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'retirement.db');
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

// 4/a
insertRule.run('4a', 'normal', '08.09.1999 Öncesi - Erkek', '1976-09-08', '1999-09-08', 25, 5000, null, 60, null, 'EYT');
insertRule.run('4a', 'normal', '08.09.1999 Öncesi - Kadın', '1981-09-08', '1999-09-08', 20, 5000, 58, null, null, 'EYT');
insertRule.run('4a', 'normal', '09.09.1999-30.04.2008 TAM', '1999-09-09', '2008-04-30', null, 7000, 58, 60, null, 'TAM');

for (let year = 2008; year <= 2050; year++) {
  const start = year === 2008 ? '2008-05-01' : year + '-01-01';
  const end = (year + 2) + '-12-31';
  let ageW = 58, ageM = 60;
  
  if (year > 2008) {
    ageW = Math.min(58 + Math.floor((year - 2008) / 2), 65);
    ageM = Math.min(60 + Math.floor((year - 2008) / 2), 65);
  }
  
  insertRule.run('4a', 'normal', `01.05.2008+ TAM ${year}`, start, end, null, 9000, ageW, ageM, null, null);
  insertRule.run('4a', 'age', `01.05.2008+ KISMİ ${year}`, start, end, null, 5400, Math.min(ageW + 3, 65), Math.min(ageM + 3, 65), null, null);
}

insertRule.run('4a', 'age', '08.09.1999 Öncesi YAŞTAN', '1976-09-08', '2099-12-31', 15, 3600, 50, 55, null, null);

// Malüllük
insertRule.run('4a', 'disability', 'SK 28/4', '2008-10-01', '2099-12-31', 15, 3960, null, null, null, null);
insertRule.run('4a', 'disability', 'SK 28/5 %50-%59', '2015-01-01', '2099-12-31', 16, 4320, null, null, '%50-%59', null);
insertRule.run('4a', 'disability', 'SK 28/5 %40-%49', '2014-01-01', '2099-12-31', 18, 4680, null, null, '%40-%49', null);
insertRule.run('4a', 'disability', 'SK 28/5 %60+', '2008-10-01', '2099-12-31', 10, 1800, null, null, '%60+', 'Bakıma muhtaç varsa 10 yıl şartı yok');

// 2925
insertRule.run('2925', 'normal', '2925 08.09.1999 Öncesi', '1976-09-08', '1999-09-08', 15, 3600, null, null, null, null);
insertRule.run('2925', 'normal', '2925 09.09.1999-30.04.2008', '1999-09-09', '2008-04-30', 15, 3600, 58, 60, null, null);
insertRule.run('2925', 'normal', '2925 01.05.2008+', '2008-05-01', '2099-12-31', null, 7200, 58, 60, null, null);

// 4/b
insertRule.run('4b', 'normal', '4b 08.09.1999 Öncesi', '1976-09-08', '1999-09-08', 20, 7200, null, null, null, null);
insertRule.run('4b', 'normal', '4b 09.09.1999-30.04.2008 TAM', '1999-09-09', '2008-04-30', 25, 9000, 58, 60, null, 'TAM');

for (let year = 2008; year <= 2050; year++) {
  const start = year === 2008 ? '2008-05-01' : year + '-01-01';
  const end = (year + 2) + '-12-31';
  let ageW = 58, ageM = 60;
  
  if (year > 2008) {
    ageW = Math.min(58 + Math.floor((year - 2008) / 2), 65);
    ageM = Math.min(60 + Math.floor((year - 2008) / 2), 65);
  }
  
  insertRule.run('4b', 'normal', `4b TAM ${year}`, start, end, null, 9000, ageW, ageM, null, null);
  insertRule.run('4b', 'age', `4b KISMİ ${year}`, start, end, null, 5400, Math.min(ageW + 3, 65), Math.min(ageM + 3, 65), null, null);
}

insertRule.run('4b', 'age', '4b YAŞTAN 08.09.1999 Öncesi', '1976-09-08', '1999-09-08', 15, 5400, 56, 58, null, null);
insertRule.run('4b', 'age', '4b YAŞTAN 09.09.1999-30.04.2008', '1999-09-09', '2008-04-30', 15, 5400, 60, 62, null, null);

// Malüllük 4/b
insertRule.run('4b', 'disability', '4b SK 28/4', '2008-10-01', '2099-12-31', 15, 3960, null, null, null, null);
insertRule.run('4b', 'disability', '4b SK 28/5 %50-%59', '2008-10-01', '2099-12-31', 16, 4320, null, null, '%50-%59', null);
insertRule.run('4b', 'disability', '4b SK 28/5 %40-%49', '2008-10-01', '2099-12-31', 18, 4680, null, null, '%40-%49', null);
insertRule.run('4b', 'disability', '4b SK 28/5 %60+', '2008-10-01', '2099-12-31', 10, 1800, null, null, '%60+', 'Bakıma muhtaç varsa 10 yıl şartı yok');

console.log(`\n════════════════════════════════════════════════════════════════════════════════`);
console.log(`✅ VERİTABANI BAŞARILI İLE YÜKLENDI`);
console.log(`════════════════════════════════════════════════════════════════════════════════`);
console.log(`📊 KURAL SAYILARI: 50+`);
console.log(`════════════════════════════════════════════════════════════════════════════════\n`);

db.close();
