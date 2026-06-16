import { calculateRetirementOptionsDB } from './calculator-db';

export interface CalculationResult {
  normal: { uygun: boolean; kosullar: any[] }[];
  yastan: { uygun: boolean; kosullar: any[] }[];
  maluluk: { uygun: boolean; kosullar: any[] }[];
}

export function calculateRetirement(
  birthDateStr: string,
  entryDateStr: string,
  gender: 'erkek' | 'kadin',
  status: string,
  premiumDays: number,
  malulukInfo?: { type: 'sk284' | 'sk285'; degree?: string }
): CalculationResult {
  // Parse dates
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.').map(Number);
    if (!day || !month || !year) throw new Error('Geçersiz tarih formatı');
    return new Date(year, month - 1, day);
  };

  const birthDate = parseDate(birthDateStr);
  const entryDate = parseDate(entryDateStr);

  // Call new calculator
  const results = calculateRetirementOptionsDB({
    status: status as '4a' | '4b' | '4c' | '2925',
    dogumTarihi: birthDate,
    cinsiyet: gender,
    ilkGirisTarihi: entryDate,
    priGunu: premiumDays,
    borçlanmaOption: 'dahil', // Eski format için default
    borçlanmaGunu: 0,
    askerlikGunu: 0,
    askerlikNedir: 'sonra',
    malulukTuru: malulukInfo ? malulukInfo.type : 'yok',
    derece: malulukInfo?.degree || null,
    malulTarihi: null,
  });

  // Organize by type
  const result: CalculationResult = {
    normal: [],
    yastan: [],
    maluluk: [],
  };

  for (const res of results) {
    const item = { uygun: res.uygun, kosullar: res.kosullar };
    if (res.type === 'normal') result.normal.push(item);
    else if (res.type === 'age') result.yastan.push(item);
    else if (res.type === 'disability') result.maluluk.push(item);
  }

  return result;
}
