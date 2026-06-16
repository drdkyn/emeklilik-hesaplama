import {
  ALL_RETIREMENT_RULES,
  DISABILITY_4A_SK284,
  DISABILITY_4A_SK285,
  DISABILITY_4C,
  DISABILITY_2925,
  NORMAL_4A,
  NORMAL_4B,
  NORMAL_4C,
  NORMAL_2925,
  AGE_4A,
  AGE_4B,
  AGE_4C,
} from './retirement-complete';

interface CalculatorInput {
  status: '4a' | '4b' | '4c' | '2925';
  dogumTarihi: Date;
  cinsiyet: 'erkek' | 'kadin';
  ilkGirisTarihi: Date;
  priGunu: number;
  askerlikGunu: number;
  askerlikNedir: 'once' | 'sonra';
  malulukTuru: 'yok' | 'sk284' | 'sk285';
  derece?: string;
  malulTarihi?: Date | null;
}

interface RetirementResult {
  name: string;
  type: string;
  uygun: boolean;
  kosullar: {
    ad: string;
    gerekli: string;
    sahip: string;
    basarili: boolean;
  }[];
  notlar?: string;
}

const calculateAge = (birthDate: Date, refDate: Date = new Date()): number => {
  let age = refDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = refDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && refDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const calculateServiceYears = (entryDate: Date, refDate: Date = new Date()): number => {
  const years = refDate.getFullYear() - entryDate.getFullYear();
  const monthDiff = refDate.getMonth() - entryDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && refDate.getDate() < entryDate.getDate())) {
    return Math.max(0, years - 1);
  }
  return years;
};

export function calculateRetirementOptions(input: CalculatorInput): RetirementResult[] {
  const {
    status,
    dogumTarihi,
    cinsiyet,
    ilkGirisTarihi,
    priGunu,
    askerlikGunu,
    askerlikNedir,
    malulukTuru,
    derece,
    malulTarihi,
  } = input;

  const today = new Date();
  const age = calculateAge(dogumTarihi, today);
  const serviceYears = calculateServiceYears(ilkGirisTarihi, today);
  const totalDays = priGunu + askerlikGunu;

  const results: RetirementResult[] = [];

  // Statüye göre kuralları seç
  let normalRules = [];
  let ageRules = [];
  let disabilityRules: any[] = [];

  if (status === '4a') {
    normalRules = NORMAL_4A;
    ageRules = AGE_4A;
    if (malulukTuru === 'sk284') disabilityRules = DISABILITY_4A_SK284;
    if (malulukTuru === 'sk285') disabilityRules = DISABILITY_4A_SK285;
  } else if (status === '4b') {
    normalRules = NORMAL_4B;
    ageRules = AGE_4B;
  } else if (status === '4c') {
    normalRules = NORMAL_4C;
    ageRules = AGE_4C;
    if (malulukTuru === 'sk284' || malulukTuru === 'sk285')
      disabilityRules = DISABILITY_4C;
  } else if (status === '2925') {
    normalRules = NORMAL_2925;
    if (malulukTuru === 'sk284' || malulukTuru === 'sk285')
      disabilityRules = DISABILITY_2925;
  }

  // NORMAL EMEKLİLİK
  for (const rule of normalRules) {
    if (ilkGirisTarihi >= rule.dateFrom && ilkGirisTarihi <= rule.dateTo) {
      const meetsServiceYears =
        rule.serviceYears === null || serviceYears >= rule.serviceYears;
      const meetsDays = rule.days === null || totalDays >= rule.days;
      const meetsAge =
        rule.ageMan === null ||
        (cinsiyet === 'erkek' ? age >= rule.ageMan : age >= (rule.ageWoman || 60));

      const uygun = meetsServiceYears && meetsDays && meetsAge;

      results.push({
        name: `${rule.name} (NORMAL)`,
        type: 'normal',
        uygun,
        kosullar: [
          ...(rule.serviceYears !== null
            ? [
                {
                  ad: 'Hizmet Yılı',
                  gerekli: rule.serviceYears.toString(),
                  sahip: serviceYears.toString(),
                  basarili: meetsServiceYears,
                },
              ]
            : []),
          ...(rule.days !== null
            ? [
                {
                  ad: 'Prim Günü',
                  gerekli: rule.days.toString(),
                  sahip: totalDays.toString(),
                  basarili: meetsDays,
                },
              ]
            : []),
          ...(rule.ageMan !== null
            ? [
                {
                  ad: 'Yaş',
                  gerekli:
                    cinsiyet === 'erkek'
                      ? rule.ageMan.toString()
                      : (rule.ageWoman || 60).toString(),
                  sahip: age.toString(),
                  basarili: meetsAge,
                },
              ]
            : []),
        ],
      });
    }
  }

  // YAŞTAN EMEKLİLİK
  for (const rule of ageRules) {
    if (ilkGirisTarihi >= rule.dateFrom && ilkGirisTarihi <= rule.dateTo) {
      const meetsServiceYears =
        rule.serviceYears === null || serviceYears >= rule.serviceYears;
      const meetsDays = rule.days === null || totalDays >= rule.days;
      const meetsAge =
        rule.ageMan === null ||
        (cinsiyet === 'erkek' ? age >= rule.ageMan : age >= (rule.ageWoman || 60));

      const uygun = meetsServiceYears && meetsDays && meetsAge;

      results.push({
        name: `${rule.name} (YAŞTAN)`,
        type: 'age',
        uygun,
        kosullar: [
          ...(rule.serviceYears !== null
            ? [
                {
                  ad: 'Hizmet Yılı',
                  gerekli: rule.serviceYears.toString(),
                  sahip: serviceYears.toString(),
                  basarili: meetsServiceYears,
                },
              ]
            : []),
          ...(rule.days !== null
            ? [
                {
                  ad: 'Prim Günü',
                  gerekli: rule.days.toString(),
                  sahip: totalDays.toString(),
                  basarili: meetsDays,
                },
              ]
            : []),
          ...(rule.ageMan !== null
            ? [
                {
                  ad: 'Yaş',
                  gerekli:
                    cinsiyet === 'erkek'
                      ? rule.ageMan.toString()
                      : (rule.ageWoman || 60).toString(),
                  sahip: age.toString(),
                  basarili: meetsAge,
                },
              ]
            : []),
        ],
        notlar: rule.notes,
      });
    }
  }

  // MALÜLLÜK EMEKLİLİĞİ
  if (malulukTuru !== 'yok') {
    for (const rule of disabilityRules) {
      // SK 28/5 derece filtresi
      if (malulukTuru === 'sk285' && rule.degree && rule.degree !== derece) {
        continue;
      }

      // SK 28/5 tarih filtresi
      if (
        malulukTuru === 'sk285' &&
        malulTarihi &&
        (malulTarihi < rule.dateFrom || malulTarihi > rule.dateTo)
      ) {
        continue;
      }

      const meetsServiceYears =
        rule.serviceYears === null || serviceYears >= rule.serviceYears;
      const meetsDays = rule.days === null || totalDays >= rule.days;

      const uygun = meetsServiceYears && meetsDays;

      results.push({
        name: rule.name,
        type: 'disability',
        uygun,
        kosullar: [
          ...(rule.serviceYears !== null
            ? [
                {
                  ad: 'Hizmet Yılı',
                  gerekli: rule.serviceYears.toString(),
                  sahip: serviceYears.toString(),
                  basarili: meetsServiceYears,
                },
              ]
            : []),
          ...(rule.days !== null
            ? [
                {
                  ad: 'Prim Günü',
                  gerekli: rule.days.toString(),
                  sahip: totalDays.toString(),
                  basarili: meetsDays,
                },
              ]
            : []),
          ...(rule.degree ? [{ ad: 'Derece', gerekli: rule.degree, sahip: derece || '-', basarili: true }] : []),
        ],
      });
    }
  }

  return results;
}
