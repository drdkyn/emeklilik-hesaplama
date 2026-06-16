/**
 * TÜRKIYE EMEKLİLİK ŞARTLARI - TAM KÜMESİ
 * 
 * ÜÇ TİP EMEKLİLİK:
 * 1. NORMAL EMEKLİLİK - Hizmet yılı + Yaş şartı
 * 2. YAŞTAN EMEKLİLİK - Sadece yaş şartı (kademeli geçiş: 08.09.1999+)
 * 3. MALÜLLÜK/ENGELLİ - SK 28/4 (ilk işe girişte) + SK 28/5 (çalışırken)
 */

export interface RetirementCondition {
  serviceYears?: number | null;
  days?: number | null;
  ageWoman?: number | null;
  ageMan?: number | null;
  age?: number | null;
}

// ============================================================================
// SK 28/4 - İLK İŞE GİRİŞTE MALÜL (YAŞSIZ)
// ============================================================================

export const SK284_4A = [
  { dateFrom: new Date(1981, 8, 9), dateTo: new Date(1999, 8, 7), serviceYears: 15, days: 3600 },
  { dateFrom: new Date(1999, 8, 8), dateTo: new Date(2099, 11, 31), serviceYears: 15, days: 3960 },
];

export const SK284_4B = [
  { dateFrom: new Date(1981, 8, 9), dateTo: new Date(1999, 8, 7), serviceYears: 20, days: 7200 },
  { dateFrom: new Date(1999, 8, 8), dateTo: new Date(2008, 3, 30), serviceYears: 15, days: 5400 },
  { dateFrom: new Date(2008, 4, 1), dateTo: new Date(2099, 11, 31), serviceYears: null, days: 9000 },
];

export const SK284_4C = [
  { dateFrom: new Date(1981, 8, 9), dateTo: new Date(1999, 8, 7), serviceYears: 25, days: 9000 },
  { dateFrom: new Date(1999, 8, 8), dateTo: new Date(2008, 3, 30), serviceYears: 25, days: 9000 },
  { dateFrom: new Date(2008, 4, 1), dateTo: new Date(2099, 11, 31), serviceYears: null, days: 9000 },
];

export const SK284_2925_DEGREE = {
  '%40-%49': { serviceYears: 18, days: 6480 },
  '%50-%59': { serviceYears: 16, days: 5760 },
  '%60+': { serviceYears: 10, days: 3600 },
};

// ============================================================================
// SK 28/5 - ÇALIŞIRKEN MALÜL (DERECE + TARİH BAZLI)
// ============================================================================

export const SK285_4A_DEGREE = {
  '%40-%49': { serviceYears: 18, days: 4680 },
  '%50-%59': { serviceYears: 16, days: 4320 },
};

// 2925 SK 28/5 - Tarım (Derece + Tarih Kombinasyonu)
export const SK285_2925 = [
  { derece: '%50-%59', dateFrom: new Date(2008, 9, 1), dateTo: new Date(2008, 11, 31), serviceYears: 16, days: 3700 },
  { derece: '%50-%59', dateFrom: new Date(2009, 0, 1), dateTo: new Date(2009, 11, 31), serviceYears: 16, days: 3800 },
  { derece: '%50-%59', dateFrom: new Date(2010, 0, 1), dateTo: new Date(2010, 11, 31), serviceYears: 16, days: 3900 },
  { derece: '%50-%59', dateFrom: new Date(2011, 0, 1), dateTo: new Date(2011, 11, 31), serviceYears: 16, days: 4000 },
  { derece: '%50-%59', dateFrom: new Date(2012, 0, 1), dateTo: new Date(2012, 11, 31), serviceYears: 16, days: 4100 },
  { derece: '%50-%59', dateFrom: new Date(2013, 0, 1), dateTo: new Date(2013, 11, 31), serviceYears: 16, days: 4200 },
  { derece: '%50-%59', dateFrom: new Date(2014, 0, 1), dateTo: new Date(2014, 11, 31), serviceYears: 16, days: 4300 },
  { derece: '%50-%59', dateFrom: new Date(2015, 0, 1), dateTo: new Date(2099, 11, 31), serviceYears: 16, days: 4320 },
  { derece: '%40-%49', dateFrom: new Date(2008, 9, 1), dateTo: new Date(2008, 11, 31), serviceYears: 18, days: 4100 },
  { derece: '%40-%49', dateFrom: new Date(2009, 0, 1), dateTo: new Date(2009, 11, 31), serviceYears: 18, days: 4200 },
  { derece: '%40-%49', dateFrom: new Date(2010, 0, 1), dateTo: new Date(2010, 11, 31), serviceYears: 18, days: 4300 },
  { derece: '%40-%49', dateFrom: new Date(2011, 0, 1), dateTo: new Date(2011, 11, 31), serviceYears: 18, days: 4400 },
  { derece: '%40-%49', dateFrom: new Date(2012, 0, 1), dateTo: new Date(2012, 11, 31), serviceYears: 18, days: 4500 },
  { derece: '%40-%49', dateFrom: new Date(2013, 0, 1), dateTo: new Date(2013, 11, 31), serviceYears: 18, days: 4600 },
  { derece: '%40-%49', dateFrom: new Date(2014, 0, 1), dateTo: new Date(2099, 11, 31), serviceYears: 18, days: 4680 },
];

// ============================================================================
// YAŞTAN EMEKLİLİK (KADEMELİ GEÇIŞ - 08.09.1999+)
// ============================================================================

export const AGE_BASED_4B = [
  { dateFrom: new Date(1981, 8, 9), dateTo: new Date(1999, 8, 7), serviceYears: 30, days: 10950 },
  { dateFrom: new Date(1999, 8, 8), dateTo: new Date(2008, 3, 30), serviceYears: 25, days: 9000, ageWoman: 60, ageMan: 62 },
  { dateFrom: new Date(2008, 4, 1), dateTo: new Date(2035, 11, 31), serviceYears: null, days: 9000, ageWoman: 58, ageMan: 60 },
  { dateFrom: new Date(2036, 0, 1), dateTo: new Date(2037, 11, 31), serviceYears: null, days: 9000, ageWoman: 59, ageMan: 61 },
  { dateFrom: new Date(2038, 0, 1), dateTo: new Date(2039, 11, 31), serviceYears: null, days: 9000, ageWoman: 60, ageMan: 62 },
  { dateFrom: new Date(2040, 0, 1), dateTo: new Date(2041, 11, 31), serviceYears: null, days: 9000, ageWoman: 61, ageMan: 63 },
  { dateFrom: new Date(2042, 0, 1), dateTo: new Date(2043, 11, 31), serviceYears: null, days: 9000, ageWoman: 62, ageMan: 64 },
  { dateFrom: new Date(2044, 0, 1), dateTo: new Date(2045, 11, 31), serviceYears: null, days: 9000, ageWoman: 63, ageMan: 65 },
  { dateFrom: new Date(2046, 0, 1), dateTo: new Date(2047, 11, 31), serviceYears: null, days: 9000, ageWoman: 64, ageMan: 65 },
  { dateFrom: new Date(2048, 0, 1), dateTo: new Date(2099, 11, 31), serviceYears: null, days: 9000, ageWoman: 65, ageMan: 65 },
];

export const AGE_BASED_4C = [
  { dateFrom: new Date(1981, 8, 9), dateTo: new Date(1999, 8, 7), serviceYears: 20, days: 7200 },
  { dateFrom: new Date(1999, 8, 8), dateTo: new Date(2008, 3, 30), serviceYears: 20, days: 7200, ageWoman: 58, ageMan: 60 },
  { dateFrom: new Date(2008, 4, 1), dateTo: new Date(2035, 11, 31), type: 'tam', serviceYears: null, days: 9000, ageWoman: 58, ageMan: 60 },
  { dateFrom: new Date(2008, 4, 1), dateTo: new Date(2035, 11, 31), type: 'kismi', serviceYears: null, days: 5400, ageWoman: 61, ageMan: 63 },
  { dateFrom: new Date(2036, 0, 1), dateTo: new Date(2037, 11, 31), type: 'tam', serviceYears: null, days: 9000, ageWoman: 59, ageMan: 61 },
  { dateFrom: new Date(2036, 0, 1), dateTo: new Date(2037, 11, 31), type: 'kismi', serviceYears: null, days: 5400, ageWoman: 62, ageMan: 64 },
  { dateFrom: new Date(2038, 0, 1), dateTo: new Date(2039, 11, 31), type: 'tam', serviceYears: null, days: 9000, ageWoman: 60, ageMan: 62 },
  { dateFrom: new Date(2038, 0, 1), dateTo: new Date(2039, 11, 31), type: 'kismi', serviceYears: null, days: 5400, ageWoman: 63, ageMan: 65 },
];

export function calculateAge(birthDate: Date, referenceDate: Date = new Date()): number {
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function calculateServiceYears(entryDate: Date, exitDate: Date = new Date()): number {
  let years = exitDate.getFullYear() - entryDate.getFullYear();
  const monthDiff = exitDate.getMonth() - entryDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && exitDate.getDate() < entryDate.getDate())) {
    years--;
  }
  return years;
}

export function calculateServiceDays(entryDate: Date, exitDate: Date = new Date()): number {
  return Math.floor((exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
}

export function parseDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split('.').map(Number);
  if (!day || !month || !year || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day) {
    return null;
  }
  return date;
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
