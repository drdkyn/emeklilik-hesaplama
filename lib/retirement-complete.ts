/**
 * TÜMEL EMEKLİLİK ŞARTLARI - TÜM STATÜLER
 * Tüm kurallar bu dosyada
 */

export interface RetirementRule {
  name: string;
  type: 'normal' | 'age' | 'disability';
  dateFrom: Date;
  dateTo: Date;
  serviceYears?: number | null;
  days?: number | null;
  ageWoman?: number;
  ageMan?: number;
  degree?: string;
  status: '4a' | '4b' | '4c' | '2925';
  notes?: string;
}

// ============================================================================
// 4/a (SSK) - NORMAL EMEKLİLİK (EYT)
// ============================================================================

export const NORMAL_4A = [
  {
    name: 'EYT Yaşsız',
    type: 'normal' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(1999, 8, 7),
    serviceYears: 15,
    days: 3600,
    status: '4a' as const,
  },
  {
    name: 'EYT Yaşsız (Uzatılmış)',
    type: 'normal' as const,
    dateFrom: new Date(1999, 8, 8),
    dateTo: new Date(2099, 11, 31),
    serviceYears: 15,
    days: 3960,
    status: '4a' as const,
  },
];

// 4/a - YAŞTAN EMEKLİLİK
export const AGE_4A = [
  {
    name: 'Yaştan Emeklilik (08.09.1999 Öncesi)',
    type: 'age' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(1999, 8, 7),
    serviceYears: 20,
    days: 5000,
    status: '4a' as const,
  },
  {
    name: 'Yaştan Emeklilik (09.09.1999-30.04.2008)',
    type: 'age' as const,
    dateFrom: new Date(1999, 8, 8),
    dateTo: new Date(2008, 3, 30),
    serviceYears: 25,
    days: 7200,
    status: '4a' as const,
  },
  {
    name: 'Yaştan Emeklilik (01.05.2008+)',
    type: 'age' as const,
    dateFrom: new Date(2008, 4, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 7200,
    ageWoman: 58,
    ageMan: 60,
    status: '4a' as const,
  },
];

// 4/a - MALÜLLÜK EMEKLİLİĞİ (SK 28/4 - İlk İşe Girişte)
export const DISABILITY_4A_SK284 = [
  {
    name: 'SK 28/4 (İlk İşe Girişte Malül)',
    type: 'disability' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(1999, 8, 7),
    serviceYears: 15,
    days: 3600,
    status: '4a' as const,
  },
  {
    name: 'SK 28/4 (İlk İşe Girişte Malül)',
    type: 'disability' as const,
    dateFrom: new Date(1999, 8, 8),
    dateTo: new Date(2099, 11, 31),
    serviceYears: 15,
    days: 3960,
    status: '4a' as const,
  },
];

// 4/a - MALÜLLÜK EMEKLİLİĞİ (SK 28/5 - Sonradan Malül)
export const DISABILITY_4A_SK285 = [
  {
    name: 'SK 28/5 (%50-%59 Derece)',
    type: 'disability' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(2099, 11, 31),
    serviceYears: 16,
    days: 4320,
    degree: '%50-%59',
    status: '4a' as const,
  },
  {
    name: 'SK 28/5 (%40-%49 Derece)',
    type: 'disability' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(2099, 11, 31),
    serviceYears: 18,
    days: 4680,
    degree: '%40-%49',
    status: '4a' as const,
  },
];

// ============================================================================
// 4/b (BAĞ-KUR) - NORMAL EMEKLİLİK
// ============================================================================

export const NORMAL_4B = [
  {
    name: 'EYT Yaşsız',
    type: 'normal' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(1999, 8, 7),
    serviceYears: 20,
    days: 7200,
    status: '4b' as const,
  },
  {
    name: 'Normal (09.09.1999-30.04.2008)',
    type: 'normal' as const,
    dateFrom: new Date(1999, 8, 8),
    dateTo: new Date(2008, 3, 30),
    serviceYears: 15,
    days: 5400,
    status: '4b' as const,
  },
  {
    name: 'Normal (01.05.2008+)',
    type: 'normal' as const,
    dateFrom: new Date(2008, 4, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 58,
    ageMan: 60,
    status: '4b' as const,
  },
];

// 4/b - YAŞTAN EMEKLİLİK
export const AGE_4B = [
  {
    name: 'Yaştan Emeklilik (08.09.1999 Öncesi)',
    type: 'age' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(1999, 8, 7),
    serviceYears: 20,
    days: 7200,
    status: '4b' as const,
  },
  {
    name: 'Yaştan Emeklilik (09.09.1999-30.04.2008)',
    type: 'age' as const,
    dateFrom: new Date(1999, 8, 8),
    dateTo: new Date(2008, 3, 30),
    serviceYears: 15,
    days: 5400,
    ageWoman: 60,
    ageMan: 62,
    status: '4b' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.05.2008+)',
    type: 'age' as const,
    dateFrom: new Date(2008, 4, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 58,
    ageMan: 60,
    status: '4b' as const,
  },
  {
    name: 'Yaştan Emeklilik KISMİ (01.05.2008+)',
    type: 'age' as const,
    dateFrom: new Date(2008, 4, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 5400,
    ageWoman: 61,
    ageMan: 63,
    status: '4b' as const,
    notes: 'KISMİ',
  },
];

// ============================================================================
// 4/c (MEMUR) - NORMAL EMEKLİLİK
// ============================================================================

export const NORMAL_4C = [
  {
    name: 'EYT Yaşsız',
    type: 'normal' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(1999, 8, 7),
    serviceYears: 25,
    days: 9000,
    status: '4c' as const,
  },
  {
    name: 'Normal (09.09.1999-30.04.2008)',
    type: 'normal' as const,
    dateFrom: new Date(1999, 8, 8),
    dateTo: new Date(2008, 3, 30),
    serviceYears: 25,
    days: 9000,
    ageWoman: 58,
    ageMan: 60,
    status: '4c' as const,
  },
  {
    name: 'Normal (01.05.2008+)',
    type: 'normal' as const,
    dateFrom: new Date(2008, 4, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 58,
    ageMan: 60,
    status: '4c' as const,
  },
];

// 4/c - YAŞTAN EMEKLİLİK (PÖGS TARİHİNE GÖRE KADEMELİ)
export const AGE_4C = [
  {
    name: 'Yaştan Emeklilik (08.09.1999 Öncesi)',
    type: 'age' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(1999, 8, 7),
    serviceYears: 20,
    days: 7200,
    status: '4c' as const,
  },
  // 01.05.2008+ TAM (Kademeli Yaş Artış)
  {
    name: 'Yaştan Emeklilik TAM (01.05.2008-31.12.2035)',
    type: 'age' as const,
    dateFrom: new Date(2008, 4, 1),
    dateTo: new Date(2035, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 58,
    ageMan: 60,
    status: '4c' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.01.2036-31.12.2037)',
    type: 'age' as const,
    dateFrom: new Date(2036, 0, 1),
    dateTo: new Date(2037, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 59,
    ageMan: 61,
    status: '4c' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.01.2038-31.12.2039)',
    type: 'age' as const,
    dateFrom: new Date(2038, 0, 1),
    dateTo: new Date(2039, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 60,
    ageMan: 62,
    status: '4c' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.01.2040-31.12.2041)',
    type: 'age' as const,
    dateFrom: new Date(2040, 0, 1),
    dateTo: new Date(2041, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 61,
    ageMan: 63,
    status: '4c' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.01.2042-31.12.2043)',
    type: 'age' as const,
    dateFrom: new Date(2042, 0, 1),
    dateTo: new Date(2043, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 62,
    ageMan: 64,
    status: '4c' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.01.2044-31.12.2045)',
    type: 'age' as const,
    dateFrom: new Date(2044, 0, 1),
    dateTo: new Date(2045, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 63,
    ageMan: 65,
    status: '4c' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.01.2046-31.12.2047)',
    type: 'age' as const,
    dateFrom: new Date(2046, 0, 1),
    dateTo: new Date(2047, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 64,
    ageMan: 65,
    status: '4c' as const,
  },
  {
    name: 'Yaştan Emeklilik TAM (01.01.2048+)',
    type: 'age' as const,
    dateFrom: new Date(2048, 0, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 9000,
    ageWoman: 65,
    ageMan: 65,
    status: '4c' as const,
  },
  // 01.05.2008+ KISMİ (Kademeli Yaş Artış)
  {
    name: 'Yaştan Emeklilik KISMİ (01.05.2008-31.12.2035)',
    type: 'age' as const,
    dateFrom: new Date(2008, 4, 1),
    dateTo: new Date(2035, 11, 31),
    serviceYears: null,
    days: 5400,
    ageWoman: 61,
    ageMan: 63,
    status: '4c' as const,
    notes: 'KISMİ',
  },
  {
    name: 'Yaştan Emeklilik KISMİ (01.01.2036-31.12.2037)',
    type: 'age' as const,
    dateFrom: new Date(2036, 0, 1),
    dateTo: new Date(2037, 11, 31),
    serviceYears: null,
    days: 5400,
    ageWoman: 62,
    ageMan: 64,
    status: '4c' as const,
    notes: 'KISMİ',
  },
  {
    name: 'Yaştan Emeklilik KISMİ (01.01.2038-31.12.2039)',
    type: 'age' as const,
    dateFrom: new Date(2038, 0, 1),
    dateTo: new Date(2039, 11, 31),
    serviceYears: null,
    days: 5400,
    ageWoman: 63,
    ageMan: 65,
    status: '4c' as const,
    notes: 'KISMİ',
  },
  {
    name: 'Yaştan Emeklilik KISMİ (01.01.2040-31.12.2041)',
    type: 'age' as const,
    dateFrom: new Date(2040, 0, 1),
    dateTo: new Date(2041, 11, 31),
    serviceYears: null,
    days: 5400,
    ageWoman: 64,
    ageMan: 65,
    status: '4c' as const,
    notes: 'KISMİ',
  },
  {
    name: 'Yaştan Emeklilik KISMİ (01.01.2042+)',
    type: 'age' as const,
    dateFrom: new Date(2042, 0, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 5400,
    ageWoman: 65,
    ageMan: 65,
    status: '4c' as const,
    notes: 'KISMİ',
  },
];

// 4/c - MALÜLLÜK EMEKLİLİĞİ (DERECE-BAZLI)
export const DISABILITY_4C = [
  {
    name: 'SK 28/4 (%50-%59 Derece)',
    type: 'disability' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 5760,
    degree: '%50-%59',
    status: '4c' as const,
  },
  {
    name: 'SK 28/4 (%40-%49 Derece)',
    type: 'disability' as const,
    dateFrom: new Date(1981, 8, 9),
    dateTo: new Date(2099, 11, 31),
    serviceYears: null,
    days: 6480,
    degree: '%40-%49',
    status: '4c' as const,
  },
];

// ============================================================================
// 2925 (TARIM) - NORMAL EMEKLİLİK
// ============================================================================

export const NORMAL_2925 = [
  {
    name: 'Normal (2008 Ekim Öncesi)',
    type: 'normal' as const,
    dateFrom: new Date(2008, 8, 1),
    dateTo: new Date(2008, 8, 30),
    serviceYears: 15,
    days: 3600,
    status: '2925' as const,
  },
  {
    name: 'Normal (2008 Ekim-Aralık)',
    type: 'normal' as const,
    dateFrom: new Date(2008, 9, 1),
    dateTo: new Date(2008, 11, 31),
    serviceYears: 15,
    days: 3700,
    status: '2925' as const,
  },
  {
    name: 'Normal (2009)',
    type: 'normal' as const,
    dateFrom: new Date(2009, 0, 1),
    dateTo: new Date(2009, 11, 31),
    serviceYears: 15,
    days: 3800,
    status: '2925' as const,
  },
  {
    name: 'Normal (2010)',
    type: 'normal' as const,
    dateFrom: new Date(2010, 0, 1),
    dateTo: new Date(2010, 11, 31),
    serviceYears: 15,
    days: 3900,
    status: '2925' as const,
  },
  {
    name: 'Normal (2011+)',
    type: 'normal' as const,
    dateFrom: new Date(2011, 0, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: 15,
    days: 3960,
    status: '2925' as const,
  },
];

// 2925 - MALÜLLÜK EMEKLİLİĞİ (SK 28/5 - DERECE + TARİH BAZLI)
export const DISABILITY_2925 = [
  // %50-%59 Derece
  {
    name: 'SK 28/5 (%50-%59, 2008 Ekim-Aralık)',
    type: 'disability' as const,
    dateFrom: new Date(2008, 9, 1),
    dateTo: new Date(2008, 11, 31),
    serviceYears: 16,
    days: 3700,
    degree: '%50-%59',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%50-%59, 2009)',
    type: 'disability' as const,
    dateFrom: new Date(2009, 0, 1),
    dateTo: new Date(2009, 11, 31),
    serviceYears: 16,
    days: 3800,
    degree: '%50-%59',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%50-%59, 2010)',
    type: 'disability' as const,
    dateFrom: new Date(2010, 0, 1),
    dateTo: new Date(2010, 11, 31),
    serviceYears: 16,
    days: 3900,
    degree: '%50-%59',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%50-%59, 2011)',
    type: 'disability' as const,
    dateFrom: new Date(2011, 0, 1),
    dateTo: new Date(2011, 11, 31),
    serviceYears: 16,
    days: 4000,
    degree: '%50-%59',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%50-%59, 2012)',
    type: 'disability' as const,
    dateFrom: new Date(2012, 0, 1),
    dateTo: new Date(2012, 11, 31),
    serviceYears: 16,
    days: 4100,
    degree: '%50-%59',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%50-%59, 2013)',
    type: 'disability' as const,
    dateFrom: new Date(2013, 0, 1),
    dateTo: new Date(2013, 11, 31),
    serviceYears: 16,
    days: 4200,
    degree: '%50-%59',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%50-%59, 2014)',
    type: 'disability' as const,
    dateFrom: new Date(2014, 0, 1),
    dateTo: new Date(2014, 11, 31),
    serviceYears: 16,
    days: 4300,
    degree: '%50-%59',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%50-%59, 2015+)',
    type: 'disability' as const,
    dateFrom: new Date(2015, 0, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: 16,
    days: 4320,
    degree: '%50-%59',
    status: '2925' as const,
  },
  // %40-%49 Derece
  {
    name: 'SK 28/5 (%40-%49, 2008 Ekim-Aralık)',
    type: 'disability' as const,
    dateFrom: new Date(2008, 9, 1),
    dateTo: new Date(2008, 11, 31),
    serviceYears: 18,
    days: 4100,
    degree: '%40-%49',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%40-%49, 2009)',
    type: 'disability' as const,
    dateFrom: new Date(2009, 0, 1),
    dateTo: new Date(2009, 11, 31),
    serviceYears: 18,
    days: 4200,
    degree: '%40-%49',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%40-%49, 2010)',
    type: 'disability' as const,
    dateFrom: new Date(2010, 0, 1),
    dateTo: new Date(2010, 11, 31),
    serviceYears: 18,
    days: 4300,
    degree: '%40-%49',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%40-%49, 2011)',
    type: 'disability' as const,
    dateFrom: new Date(2011, 0, 1),
    dateTo: new Date(2011, 11, 31),
    serviceYears: 18,
    days: 4400,
    degree: '%40-%49',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%40-%49, 2012)',
    type: 'disability' as const,
    dateFrom: new Date(2012, 0, 1),
    dateTo: new Date(2012, 11, 31),
    serviceYears: 18,
    days: 4500,
    degree: '%40-%49',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%40-%49, 2013)',
    type: 'disability' as const,
    dateFrom: new Date(2013, 0, 1),
    dateTo: new Date(2013, 11, 31),
    serviceYears: 18,
    days: 4600,
    degree: '%40-%49',
    status: '2925' as const,
  },
  {
    name: 'SK 28/5 (%40-%49, 2014+)',
    type: 'disability' as const,
    dateFrom: new Date(2014, 0, 1),
    dateTo: new Date(2099, 11, 31),
    serviceYears: 18,
    days: 4680,
    degree: '%40-%49',
    status: '2925' as const,
  },
];

// Tüm kuralları bir yerde topla
export const ALL_RETIREMENT_RULES = [
  ...NORMAL_4A,
  ...AGE_4A,
  ...DISABILITY_4A_SK284,
  ...DISABILITY_4A_SK285,
  ...NORMAL_4B,
  ...AGE_4B,
  ...NORMAL_4C,
  ...AGE_4C,
  ...DISABILITY_4C,
  ...NORMAL_2925,
  ...DISABILITY_2925,
];
