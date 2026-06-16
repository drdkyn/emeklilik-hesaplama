import Database from 'better-sqlite3';
import path from 'path';
import { mkdirSync } from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'retirement.db');
mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

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

db.prepare('DELETE FROM retirement_rules').run();

const rules = [
  // 4/a - İSTEKLE (Kademeli)
  ['4a', 'age', 'İstekle (24.05.1984-23.05.1985)', '1984-05-24', '1985-05-23', 20, 5000, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1985-23.05.1986)', '1985-05-24', '1986-05-23', 20, 5075, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1986-23.05.1987)', '1986-05-24', '1987-05-23', 20, 5150, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1987-23.05.1988)', '1987-05-24', '1988-05-23', 20, 5225, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1988-23.05.1989)', '1988-05-24', '1989-05-23', 20, 5300, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1989-23.05.1990)', '1989-05-24', '1990-05-23', 20, 5375, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1990-23.05.1991)', '1990-05-24', '1991-05-23', 20, 5450, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1991-23.05.1992)', '1991-05-24', '1992-05-23', 20, 5525, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1992-23.05.1993)', '1992-05-24', '1993-05-23', 20, 5600, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1993-23.05.1994)', '1993-05-24', '1994-05-23', 20, 5675, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1994-23.05.1995)', '1994-05-24', '1995-05-23', 20, 5750, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1995-23.05.1996)', '1995-05-24', '1996-05-23', 20, 5825, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1996-23.05.1997)', '1996-05-24', '1997-05-23', 20, 5900, 58, 60, null, null],
  ['4a', 'age', 'İstekle (24.05.1997-08.09.1999)', '1997-05-24', '1999-09-08', 20, 5975, 58, 60, null, null],
  ['4a', 'age', 'İstekle TAM (09.09.1999-30.04.2008)', '1999-09-09', '2008-04-30', 25, 7200, 58, 60, null, 'TAM'],
  ['4a', 'age', 'İstekle KISMİ (09.09.1999-30.04.2008)', '1999-09-09', '2008-04-30', 15, 4500, 58, 60, null, 'KISMİ'],
  ['4a', 'disability', 'SK 28/4', '1981-09-08', '2099-12-31', 15, 3960, null, null, null, null],
  ['4a', 'disability', 'SK 28/5 (%40-%49, 2008-Ekim-Aralık)', '2008-10-01', '2008-12-31', 18, 4100, null, null, '%40-%49', null],
  ['4a', 'disability', 'SK 28/5 (%40-%49, 2009)', '2009-01-01', '2009-12-31', 18, 4200, null, null, '%40-%49', null],
  ['4a', 'disability', 'SK 28/5 (%40-%49, 2010)', '2010-01-01', '2010-12-31', 18, 4300, null, null, '%40-%49', null],
  ['4a', 'disability', 'SK 28/5 (%40-%49, 2011)', '2011-01-01', '2011-12-31', 18, 4400, null, null, '%40-%49', null],
  ['4a', 'disability', 'SK 28/5 (%40-%49, 2012)', '2012-01-01', '2012-12-31', 18, 4500, null, null, '%40-%49', null],
  ['4a', 'disability', 'SK 28/5 (%40-%49, 2013)', '2013-01-01', '2013-12-31', 18, 4600, null, null, '%40-%49', null],
  ['4a', 'disability', 'SK 28/5 (%40-%49, 2014+)', '2014-01-01', '2099-12-31', 18, 4680, null, null, '%40-%49', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2008-Ekim-Aralık)', '2008-10-01', '2008-12-31', 16, 3700, null, null, '%50-%59', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2009)', '2009-01-01', '2009-12-31', 16, 3800, null, null, '%50-%59', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2010)', '2010-01-01', '2010-12-31', 16, 3900, null, null, '%50-%59', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2011)', '2011-01-01', '2011-12-31', 16, 4000, null, null, '%50-%59', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2012)', '2012-01-01', '2012-12-31', 16, 4100, null, null, '%50-%59', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2013)', '2013-01-01', '2013-12-31', 16, 4200, null, null, '%50-%59', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2014)', '2014-01-01', '2014-12-31', 16, 4300, null, null, '%50-%59', null],
  ['4a', 'disability', 'SK 28/5 (%50-%59, 2015+)', '2015-01-01', '2099-12-31', 16, 4320, null, null, '%50-%59', null],

  // 4/b - İSTEKLE EMEKLILIK + SK 28
  ['4b', 'age', 'İstekle (08.09.1999 Öncesi)', '1981-09-08', '1999-09-08', 20, 7200, 58, 58, null, null],
  ['4b', 'age', 'İstekle TAM (09.09.1999-30.04.2008)', '1999-09-09', '2008-04-30', 25, 9000, 58, 60, null, 'TAM'],
  ['4b', 'age', 'İstekle KISMİ (09.09.1999-30.04.2008)', '1999-09-09', '2008-04-30', 15, 5400, 60, 62, null, 'KISMİ'],
  ['4b', 'age', 'İstekle TAM (01.05.2008-31.12.2035)', '2008-05-01', '2035-12-31', null, 9000, 58, 60, null, 'TAM'],
  ['4b', 'age', 'İstekle TAM (01.01.2036-31.12.2037)', '2036-01-01', '2037-12-31', null, 9000, 59, 61, null, 'TAM'],
  ['4b', 'age', 'İstekle TAM (01.01.2038+)', '2038-01-01', '2099-12-31', null, 9000, 60, 62, null, 'TAM Kademeli'],
  ['4b', 'age', 'İstekle KISMİ (01.05.2008-31.12.2035)', '2008-05-01', '2035-12-31', null, 5400, 61, 63, null, 'KISMİ'],
  ['4b', 'age', 'İstekle KISMİ (01.01.2036+)', '2036-01-01', '2099-12-31', null, 5400, 62, 64, null, 'KISMİ Kademeli'],
  ['4b', 'disability', 'SK 28/4 (%50-%59)', '2008-01-01', '2099-12-31', null, 5760, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/4 (%40-%49)', '2008-01-01', '2099-12-31', null, 6480, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%40-%49, 2008-Ekim-Aralık)', '2008-10-01', '2008-12-31', 18, 4100, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%40-%49, 2009)', '2009-01-01', '2009-12-31', 18, 4200, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%40-%49, 2010)', '2010-01-01', '2010-12-31', 18, 4300, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%40-%49, 2011)', '2011-01-01', '2011-12-31', 18, 4400, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%40-%49, 2012)', '2012-01-01', '2012-12-31', 18, 4500, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%40-%49, 2013)', '2013-01-01', '2013-12-31', 18, 4600, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%40-%49, 2014+)', '2014-01-01', '2099-12-31', 18, 4680, null, null, '%40-%49', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2008-Ekim-Aralık)', '2008-10-01', '2008-12-31', 16, 3700, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2009)', '2009-01-01', '2009-12-31', 16, 3800, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2010)', '2010-01-01', '2010-12-31', 16, 3900, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2011)', '2011-01-01', '2011-12-31', 16, 4000, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2012)', '2012-01-01', '2012-12-31', 16, 4100, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2013)', '2013-01-01', '2013-12-31', 16, 4200, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2014)', '2014-01-01', '2014-12-31', 16, 4300, null, null, '%50-%59', null],
  ['4b', 'disability', 'SK 28/5 (%50-%59, 2015+)', '2015-01-01', '2099-12-31', 16, 4320, null, null, '%50-%59', null],

  // 4/c - İSTEKLE EMEKLILIK + SK 28
  ['4c', 'age', 'İstekle (08.09.1999 Öncesi)', '1981-09-08', '1999-09-08', 20, 7200, 58, 60, null, null],
  ['4c', 'age', 'İstekle (09.09.1999-30.04.2008)', '1999-09-09', '2008-04-30', 25, 9000, 58, 60, null, null],
  ['4c', 'age', 'İstekle TAM (01.05.2008-31.12.2035)', '2008-05-01', '2035-12-31', null, 9000, 58, 60, null, 'TAM'],
  ['4c', 'age', 'İstekle TAM (01.01.2036+)', '2036-01-01', '2099-12-31', null, 9000, 59, 61, null, 'TAM Kademeli'],
  ['4c', 'age', 'İstekle KISMİ (01.05.2008-31.12.2035)', '2008-05-01', '2035-12-31', null, 5400, 61, 63, null, 'KISMİ'],
  ['4c', 'age', 'İstekle KISMİ (01.01.2036+)', '2036-01-01', '2099-12-31', null, 5400, 62, 64, null, 'KISMİ Kademeli'],
  ['4c', 'disability', 'SK 28/4 (%50-%59)', '2008-01-01', '2099-12-31', null, 5760, null, null, '%50-%59', null],
  ['4c', 'disability', 'SK 28/4 (%40-%49)', '2008-01-01', '2099-12-31', null, 6480, null, null, '%40-%49', null],

  // 2925 - NORMAL + SK 28
  ['2925', 'normal', 'Normal (08.09.1999 Öncesi)', '1981-09-08', '1999-09-08', 15, 3600, null, null, null, null],
  ['2925', 'normal', 'Normal (09.09.1999-30.04.2008)', '1999-09-09', '2008-04-30', 15, 3600, null, null, null, null],
  ['2925', 'normal', 'Normal (01.05.2008+)', '2008-05-01', '2099-12-31', 15, 7200, null, null, null, null],
  ['2925', 'disability', 'SK 28/5 (%40-%49, 2008-Ekim-Aralık)', '2008-10-01', '2008-12-31', 18, 4100, null, null, '%40-%49', null],
  ['2925', 'disability', 'SK 28/5 (%40-%49, 2009)', '2009-01-01', '2009-12-31', 18, 4200, null, null, '%40-%49', null],
  ['2925', 'disability', 'SK 28/5 (%40-%49, 2010)', '2010-01-01', '2010-12-31', 18, 4300, null, null, '%40-%49', null],
  ['2925', 'disability', 'SK 28/5 (%40-%49, 2011)', '2011-01-01', '2011-12-31', 18, 4400, null, null, '%40-%49', null],
  ['2925', 'disability', 'SK 28/5 (%40-%49, 2012)', '2012-01-01', '2012-12-31', 18, 4500, null, null, '%40-%49', null],
  ['2925', 'disability', 'SK 28/5 (%40-%49, 2013)', '2013-01-01', '2013-12-31', 18, 4600, null, null, '%40-%49', null],
  ['2925', 'disability', 'SK 28/5 (%40-%49, 2014+)', '2014-01-01', '2099-12-31', 18, 4680, null, null, '%40-%49', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2008-Ekim-Aralık)', '2008-10-01', '2008-12-31', 16, 3700, null, null, '%50-%59', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2009)', '2009-01-01', '2009-12-31', 16, 3800, null, null, '%50-%59', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2010)', '2010-01-01', '2010-12-31', 16, 3900, null, null, '%50-%59', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2011)', '2011-01-01', '2011-12-31', 16, 4000, null, null, '%50-%59', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2012)', '2012-01-01', '2012-12-31', 16, 4100, null, null, '%50-%59', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2013)', '2013-01-01', '2013-12-31', 16, 4200, null, null, '%50-%59', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2014)', '2014-01-01', '2014-12-31', 16, 4300, null, null, '%50-%59', null],
  ['2925', 'disability', 'SK 28/5 (%50-%59, 2015+)', '2015-01-01', '2099-12-31', 16, 4320, null, null, '%50-%59', null],
];

const insertRule = db.prepare(`
  INSERT INTO retirement_rules 
  (status, type, name, dateFrom, dateTo, serviceYears, days, ageWoman, ageMan, degree, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((rules: any[]) => {
  for (const rule of rules) {
    insertRule.run(...rule);
  }
});

insertMany(rules);

console.log(`✅ ${rules.length} kural yüklendi (SADECE %40-%49 ve %50-%59)`);
db.close();
