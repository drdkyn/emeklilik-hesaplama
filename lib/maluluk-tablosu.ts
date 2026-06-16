/**
 * SK 28/4: İlk İşe Girişte Malül (Yaşsız)
 * SK 28/5: İşe Girdikten Sonra Malül (Dereceli)
 * 
 * Giriş tarihi değişim tarihleri:
 * - 08.09.1999 (EYT sınırı)
 * - 01.05.2008 (Kanun değişikliği)
 * - 27.04.2005 (4/c için)
 */

export interface MalullikSarti {
  derece?: string;
  hizmetYili?: number;
  yasMin?: number;
  gunSayisi: number;
  aciklama?: string;
}

// ============================================================================
// SK 28/4 - İLK İŞE GİRİŞTE MALÜL (Giriş Tarihine Göre)
// ============================================================================

export const SK284_4A = [
  {
    adi: '08.09.1999 öncesi (EYT)',
    koşul: (girisGunu: Date) => girisGunu <= new Date(1999, 8, 8),
    cinsiyet: {
      kadin: { hizmetYili: 15, gun: 3600, yas: 58 },
      erkek: { hizmetYili: 20, gun: 5000, yas: null },
    },
  },
  {
    adi: '09.09.1999-30.04.2008 arası',
    koşul: (girisGunu: Date) =>
      girisGunu > new Date(1999, 8, 8) && girisGunu <= new Date(2008, 3, 30),
    cinsiyet: {
      kadin: { hizmetYili: 15, gun: 3960, yas: null },
      erkek: { hizmetYili: 15, gun: 3960, yas: null },
    },
  },
  {
    adi: '01.05.2008 sonrası',
    koşul: (girisGunu: Date) => girisGunu > new Date(2008, 3, 30),
    cinsiyet: {
      kadin: { hizmetYili: 15, gun: 3960, yas: null },
      erkek: { hizmetYili: 15, gun: 3960, yas: null },
    },
  },
];

export const SK284_4B = [
  {
    adi: '08.09.1999 öncesi (EYT)',
    koşul: (girisGunu: Date) => girisGunu <= new Date(1999, 8, 8),
    cinsiyet: {
      kadin: { hizmetYili: 20, gun: 7200, yas: null },
      erkek: { hizmetYili: 20, gun: 7200, yas: null },
    },
  },
  {
    adi: '09.09.1999-30.04.2008 arası',
    koşul: (girisGunu: Date) =>
      girisGunu > new Date(1999, 8, 8) && girisGunu <= new Date(2008, 3, 30),
    cinsiyet: {
      kadin: { hizmetYili: 15, gun: 5400, yas: 60 },
      erkek: { hizmetYili: 15, gun: 5400, yas: 62 },
    },
  },
  {
    adi: '01.05.2008-31.12.2035',
    koşul: (girisGunu: Date) =>
      girisGunu > new Date(2008, 3, 30) && girisGunu <= new Date(2035, 11, 31),
    cinsiyet: {
      kadin: { hizmetYili: null, gun: 9000, yas: 58 },
      erkek: { hizmetYili: null, gun: 9000, yas: 60 },
    },
  },
  {
    adi: '01.01.2036-31.12.2037',
    koşul: (girisGunu: Date) =>
      girisGunu >= new Date(2036, 0, 1) && girisGunu <= new Date(2037, 11, 31),
    cinsiyet: {
      kadin: { hizmetYili: null, gun: 9000, yas: 59 },
      erkek: { hizmetYili: null, gun: 9000, yas: 61 },
    },
  },
];

export const SK284_4C = [
  {
    adi: '08.09.1999 öncesi (EYT)',
    koşul: (girisGunu: Date) => girisGunu <= new Date(1999, 8, 8),
    cinsiyet: {
      kadin: { hizmetYili: 25, gun: 9000, yas: null },
      erkek: { hizmetYili: 25, gun: 9000, yas: null },
    },
  },
  {
    adi: '09.09.1999-30.04.2008 arası',
    koşul: (girisGunu: Date) =>
      girisGunu > new Date(1999, 8, 8) && girisGunu <= new Date(2008, 3, 30),
    cinsiyet: {
      kadin: { hizmetYili: 25, gun: 9000, yas: 58 },
      erkek: { hizmetYili: 25, gun: 9000, yas: 60 },
    },
  },
  {
    adi: '01.05.2008-31.12.2035',
    koşul: (girisGunu: Date) =>
      girisGunu > new Date(2008, 3, 30) && girisGunu <= new Date(2035, 11, 31),
    cinsiyet: {
      kadin: { hizmetYili: null, gun: 9000, yas: 58 },
      erkek: { hizmetYili: null, gun: 9000, yas: 60 },
    },
  },
  {
    adi: '01.01.2036-31.12.2037',
    koşul: (girisGunu: Date) =>
      girisGunu >= new Date(2036, 0, 1) && girisGunu <= new Date(2037, 11, 31),
    cinsiyet: {
      kadin: { hizmetYili: null, gun: 9000, yas: 59 },
      erkek: { hizmetYili: null, gun: 9000, yas: 61 },
    },
  },
];

export const SK284_2925 = [
  {
    adi: 'Tüm tarihler',
    koşul: (girisGunu: Date) => true,
    cinsiyet: {
      kadin: { hizmetYili: 15, gun: 3600, yas: null },
      erkek: { hizmetYili: 15, gun: 3600, yas: null },
    },
  },
];

// ============================================================================
// SK 28/5 - İŞE GİRDİKTEN SONRA MALÜL (Derece-Bazlı)
// ============================================================================

// ============================================================================
// SK 28/5 - DERECE + TARİH BAZLI YAPI
// ============================================================================

// 4/a SK 28/5 - Derece-Bazlı
export const SK285_4A_DEGREES = {
  '%50-%59': { hizmetYili: 16, gun: 4320, yas: null },
  '%40-%49': { hizmetYili: 18, gun: 4680, yas: null },
};

// 2925 SK 28/5 - DERECE + TARİH BAZLI
export const SK285_2925_DERECE_TARIH = [
  // %50-%59 Derece
  { derece: '%50-%59', tarihBaslangic: new Date(2008, 9, 1), tarihBitis: new Date(2008, 11, 31), hizmetYili: 16, gun: 3700 },
  { derece: '%50-%59', tarihBaslangic: new Date(2009, 0, 1), tarihBitis: new Date(2009, 11, 31), hizmetYili: 16, gun: 3800 },
  { derece: '%50-%59', tarihBaslangic: new Date(2010, 0, 1), tarihBitis: new Date(2010, 11, 31), hizmetYili: 16, gun: 3900 },
  { derece: '%50-%59', tarihBaslangic: new Date(2011, 0, 1), tarihBitis: new Date(2011, 11, 31), hizmetYili: 16, gun: 4000 },
  { derece: '%50-%59', tarihBaslangic: new Date(2012, 0, 1), tarihBitis: new Date(2012, 11, 31), hizmetYili: 16, gun: 4100 },
  { derece: '%50-%59', tarihBaslangic: new Date(2013, 0, 1), tarihBitis: new Date(2013, 11, 31), hizmetYili: 16, gun: 4200 },
  { derece: '%50-%59', tarihBaslangic: new Date(2014, 0, 1), tarihBitis: new Date(2014, 11, 31), hizmetYili: 16, gun: 4300 },
  { derece: '%50-%59', tarihBaslangic: new Date(2015, 0, 1), tarihBitis: new Date(2099, 11, 31), hizmetYili: 16, gun: 4320 },
  // %40-%49 Derece
  { derece: '%40-%49', tarihBaslangic: new Date(2008, 9, 1), tarihBitis: new Date(2008, 11, 31), hizmetYili: 18, gun: 4100 },
  { derece: '%40-%49', tarihBaslangic: new Date(2009, 0, 1), tarihBitis: new Date(2009, 11, 31), hizmetYili: 18, gun: 4200 },
  { derece: '%40-%49', tarihBaslangic: new Date(2010, 0, 1), tarihBitis: new Date(2010, 11, 31), hizmetYili: 18, gun: 4300 },
  { derece: '%40-%49', tarihBaslangic: new Date(2011, 0, 1), tarihBitis: new Date(2011, 11, 31), hizmetYili: 18, gun: 4400 },
  { derece: '%40-%49', tarihBaslangic: new Date(2012, 0, 1), tarihBitis: new Date(2012, 11, 31), hizmetYili: 18, gun: 4500 },
  { derece: '%40-%49', tarihBaslangic: new Date(2013, 0, 1), tarihBitis: new Date(2013, 11, 31), hizmetYili: 18, gun: 4600 },
  { derece: '%40-%49', tarihBaslangic: new Date(2014, 0, 1), tarihBitis: new Date(2099, 11, 31), hizmetYili: 18, gun: 4680 },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getSK284Sarti = (
  statü: string,
  girisGunu: Date,
  cinsiyet: 'erkek' | 'kadin'
) => {
  const tablolar = {
    '4a': SK284_4A,
    '4b': SK284_4B,
    '4c': SK284_4C,
    '2925': SK284_2925,
  };

  const tablo = tablolar[statü as keyof typeof tablolar];
  if (!tablo) return null;

  const uygunKural = tablo.find((r) => r.koşul(girisGunu));
  if (!uygunKural) return null;

  const cinsigetKural = uygunKural.cinsiyet[cinsiyet];
  return {
    hizmetYili: cinsigetKural.hizmetYili,
    gun: cinsigetKural.gun,
    yas: cinsigetKural.yas,
    adi: uygunKural.adi,
  };
};

export const getSK285Sarti = (
  statü: string,
  malulTarihi: Date,
  cinsiyet: 'erkek' | 'kadin',
  tamMi?: boolean // 4/b, 4/c için Tam/Kısmi belirleme
) => {
  // 2925 için derece-bazlı (eski yöntem devam)
  if (statü === '2925') {
    // Bu durumda derece parametre olarak gelmeli
    // Şimdilik boş bırak - form'dan düzeltilecek
    return null;
  }

  // 4/a SK 28/5 - Tarih-bazlı
  if (statü === '4a') {
    const rules = malulTarihi >= new Date(2008, 4, 1) ? SK285_4A_NEW : SK285_4A_OLD;
    const uygunRul = rules.find(
      (r) => malulTarihi >= r.tarihBaslangic && malulTarihi <= r.tarihBitis
    );
    if (!uygunRul) return null;
    return {
      hizmetYili: uygunRul.hizmetYili,
      gun: uygunRul.gun,
      yas: uygunRul.yas,
    };
  }

  // 4/b SK 28/5 - Tarih + Tam/Kısmi
  if (statü === '4b') {
    const rules = tamMi ? SK285_4B_TAM : SK285_4B_KISMI;
    const uygunRul = rules.find(
      (r) => malulTarihi >= r.tarihBaslangic && malulTarihi <= r.tarihBitis
    );
    if (!uygunRul) return null;
    const yas = cinsiyet === 'kadin' ? uygunRul.yasCadin : uygunRul.yasErkek;
    return {
      hizmetYili: uygunRul.hizmetYili,
      gun: uygunRul.gun,
      yas,
    };
  }

  // 4/c SK 28/5 - Tarih + Tam/Kısmi
  if (statü === '4c') {
    const rules = tamMi ? SK285_4C_TAM : SK285_4C_KISMI;
    const uygunRul = rules.find(
      (r) => malulTarihi >= r.tarihBaslangic && malulTarihi <= r.tarihBitis
    );
    if (!uygunRul) return null;
    const yas = cinsiyet === 'kadin' ? uygunRul.yasCadin : uygunRul.yasErkek;
    return {
      hizmetYili: uygunRul.hizmetYili,
      gun: uygunRul.gun,
      yas,
    };
  }

  return null;
};

export const getMalulDereceleri = () => {
  return [
    { value: '%40-%49', label: '%40-%49 (Hafif)' },
    { value: '%50-%59', label: '%50-%59 (Orta)' },
    { value: '%60+', label: '%60+ (Ağır)' },
  ];
};
