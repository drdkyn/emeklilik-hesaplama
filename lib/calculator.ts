import {
  SK284_4A, SK284_4B, SK284_4C, SK284_2925_DEGREE,
  SK285_4A_DEGREE, SK285_2925,
  AGE_BASED_4B, AGE_BASED_4C,
  calculateAge, calculateServiceYears, calculateServiceDays,
  parseDate, formatDate
} from './retirement-rules';

export interface RetirementResult {
  type: 'normal' | 'ageBased' | 'disability';
  status: string;
  eligible: boolean;
  eligibleDate?: Date;
  message: string;
  requiredServiceYears?: number;
  requiredDays?: number;
  requiredAge?: number;
  currentAge?: number;
  currentServiceYears?: number;
  currentDays?: number;
}

export interface CalculatorInput {
  status: string; // 4a, 4b, 4c, 2925
  birthDate: Date;
  entryDate: Date;
  referenceDate: Date;
  gender: 'erkek' | 'kadin';
  serviceDay?: number; // ek gün
  militaryService?: number; // askerlik
  disabilityType?: 'none' | 'sk284' | 'sk285'; // malüllük tipi
  disabilityDegree?: '%40-%49' | '%50-%59' | '%60+'; // derece
  disabilityDate?: Date; // malüllük tarihi
}

export function calculateRetirement(input: CalculatorInput): RetirementResult[] {
  const results: RetirementResult[] = [];
  
  const age = calculateAge(input.birthDate, input.referenceDate);
  let serviceYears = calculateServiceYears(input.entryDate, input.referenceDate);
  let serviceDays = calculateServiceDays(input.entryDate, input.referenceDate);
  
  // Ek günleri ekle
  if (input.serviceDay) serviceDays += input.serviceDay;
  if (input.militaryService) serviceDays += input.militaryService * 360;
  
  serviceYears = Math.floor(serviceDays / 360);

  // 1. NORMAL EMEKLİLİK
  const normalResult = calculateNormalRetirement(
    input.status,
    input.entryDate,
    serviceYears,
    serviceDays,
    age,
    input.gender
  );
  if (normalResult) results.push(normalResult);

  // 2. YAŞTAN EMEKLİLİK
  const ageBasedResult = calculateAgeBasedRetirement(
    input.status,
    input.entryDate,
    input.birthDate,
    input.referenceDate,
    input.gender,
    age
  );
  if (ageBasedResult) results.push(...ageBasedResult);

  // 3. MALÜLLÜK EMEKLİLİK
  if (input.disabilityType !== 'none') {
    const disabilityResult = calculateDisabilityRetirement(
      input.status,
      input.entryDate,
      serviceYears,
      serviceDays,
      input.disabilityType,
      input.disabilityDegree,
      input.disabilityDate
    );
    if (disabilityResult) results.push(...disabilityResult);
  }

  return results.sort((a, b) => {
    if (a.eligible && !b.eligible) return -1;
    if (!a.eligible && b.eligible) return 1;
    return 0;
  });
}

function calculateNormalRetirement(
  status: string,
  entryDate: Date,
  serviceYears: number,
  serviceDays: number,
  age: number,
  gender: 'erkek' | 'kadin'
): RetirementResult | null {
  let required = { years: 0, days: 0, age: 0 };
  let eligible = false;
  let message = '';

  if (status === '4a') {
    required = { years: 25, days: 7200, age: 0 };
    eligible = serviceYears >= 25 && serviceDays >= 7200;
  } else if (status === '4b') {
    if (entryDate < new Date(1999, 8, 8)) {
      required = { years: 30, days: 10950, age: 0 };
      eligible = serviceYears >= 30 && serviceDays >= 10950;
    } else if (entryDate < new Date(2008, 4, 1)) {
      required = { years: 25, days: 9000, age: 0 };
      eligible = serviceYears >= 25 && serviceDays >= 9000;
    } else {
      required = { years: 0, days: 9000, age: gender === 'kadin' ? 58 : 60 };
      eligible = serviceDays >= 9000 && age >= required.age;
    }
  } else if (status === '4c') {
    if (entryDate < new Date(1999, 8, 8)) {
      required = { years: 20, days: 7200, age: 0 };
      eligible = serviceYears >= 20 && serviceDays >= 7200;
    } else {
      required = { years: 20, days: 7200, age: gender === 'kadin' ? 58 : 60 };
      eligible = serviceYears >= 20 && serviceDays >= 7200 && age >= required.age;
    }
  } else if (status === '2925') {
    required = { years: 15, days: 0, age: 0 };
    eligible = serviceYears >= 15;
  }

  if (!eligible && required.years > 0) {
    message = `${required.years} yıl hizmet, ${required.days} gün gerekli. Mevcut: ${serviceYears}y ${(serviceDays % 360).toFixed(0)}g`;
  } else if (!eligible && required.age > 0) {
    message = `${required.age} yaş ve ${required.days} gün gerekli. Mevcut: ${age} yaş, ${serviceDays} gün`;
  }

  return {
    type: 'normal',
    status,
    eligible,
    message: message || (eligible ? '✅ Uygun' : 'Şart sağlanmadı'),
    requiredServiceYears: required.years > 0 ? required.years : undefined,
    requiredDays: required.days > 0 ? required.days : undefined,
    requiredAge: required.age > 0 ? required.age : undefined,
    currentServiceYears: serviceYears,
    currentDays: serviceDays,
    currentAge: age,
  };
}

function calculateAgeBasedRetirement(
  status: string,
  entryDate: Date,
  birthDate: Date,
  referenceDate: Date,
  gender: 'erkek' | 'kadin',
  currentAge: number
): RetirementResult[] {
  const results: RetirementResult[] = [];

  if (status === '4b') {
    for (const rule of AGE_BASED_4B) {
      if (entryDate >= rule.dateFrom && entryDate <= rule.dateTo) {
        const requiredAge = gender === 'kadin' ? rule.ageWoman : rule.ageMan;
        const eligible = currentAge >= (requiredAge || 0) && (rule.days ? calculateServiceDays(entryDate, referenceDate) >= rule.days : true);
        
        let eligibleDate: Date | undefined;
        if (requiredAge && !eligible) {
          const yearsToAdd = (requiredAge || 0) - currentAge;
          eligibleDate = new Date(birthDate);
          eligibleDate.setFullYear(eligibleDate.getFullYear() + (currentAge + yearsToAdd));
        }

        results.push({
          type: 'ageBased',
          status: '4b',
          eligible,
          eligibleDate,
          message: eligible ? '✅ Yaştan emeklilik uygun' : `Yaş: ${requiredAge} gerekli, mevcut: ${currentAge}`,
          requiredAge: requiredAge || undefined,
          requiredDays: rule.days || undefined,
          currentAge,
          currentDays: calculateServiceDays(entryDate, referenceDate),
        });
      }
    }
  } else if (status === '4c') {
    for (const rule of AGE_BASED_4C) {
      if (entryDate >= rule.dateFrom && entryDate <= rule.dateTo && rule.type === 'tam') {
        const requiredAge = gender === 'kadin' ? rule.ageWoman : rule.ageMan;
        const eligible = currentAge >= (requiredAge || 0) && (rule.days ? calculateServiceDays(entryDate, referenceDate) >= rule.days : true);
        
        let eligibleDate: Date | undefined;
        if (requiredAge && !eligible) {
          const yearsToAdd = (requiredAge || 0) - currentAge;
          eligibleDate = new Date(birthDate);
          eligibleDate.setFullYear(eligibleDate.getFullYear() + (currentAge + yearsToAdd));
        }

        results.push({
          type: 'ageBased',
          status: '4c (TAM)',
          eligible,
          eligibleDate,
          message: eligible ? '✅ TAM yaştan emeklilik uygun' : `Yaş: ${requiredAge} gerekli`,
          requiredAge,
          currentAge,
        });
      }
      if (entryDate >= rule.dateFrom && entryDate <= rule.dateTo && rule.type === 'kismi') {
        const requiredAge = gender === 'kadin' ? rule.ageWoman : rule.ageMan;
        const eligible = currentAge >= (requiredAge || 0);

        results.push({
          type: 'ageBased',
          status: '4c (KISMİ)',
          eligible,
          message: eligible ? '✅ KISMİ yaştan emeklilik uygun' : `Yaş: ${requiredAge} gerekli`,
          requiredAge,
          currentAge,
        });
      }
    }
  }

  return results;
}

function calculateDisabilityRetirement(
  status: string,
  entryDate: Date,
  serviceYears: number,
  serviceDays: number,
  disabilityType: string,
  degree?: string,
  disabilityDate?: Date
): RetirementResult[] {
  const results: RetirementResult[] = [];

  if (disabilityType === 'sk284') {
    // İlk işe girişte malül
    let rule = null;
    if (status === '4a') {
      rule = SK284_4A.find(r => entryDate >= r.dateFrom && entryDate <= r.dateTo);
    } else if (status === '4b') {
      rule = SK284_4B.find(r => entryDate >= r.dateFrom && entryDate <= r.dateTo);
    } else if (status === '4c') {
      rule = SK284_4C.find(r => entryDate >= r.dateFrom && entryDate <= r.dateTo);
    } else if (status === '2925' && degree) {
      rule = SK284_2925_DEGREE[degree as keyof typeof SK284_2925_DEGREE];
    }

    if (rule) {
      const eligible = (!rule.serviceYears || serviceYears >= rule.serviceYears) &&
                      (!rule.days || serviceDays >= rule.days);
      results.push({
        type: 'disability',
        status: `${status} (SK 28/4)`,
        eligible,
        message: eligible ? '✅ SK 28/4 şartı sağlanmış' : `${rule.serviceYears}y${rule.days}g gerekli`,
        requiredServiceYears: rule.serviceYears,
        requiredDays: rule.days,
        currentServiceYears: serviceYears,
        currentDays: serviceDays,
      });
    }
  }

  if (disabilityType === 'sk285') {
    // Çalışırken malül
    if (status === '4a' && degree) {
      const rule = SK285_4A_DEGREE[degree as keyof typeof SK285_4A_DEGREE];
      if (rule) {
        const eligible = serviceYears >= rule.serviceYears && serviceDays >= rule.days;
        results.push({
          type: 'disability',
          status: `${status} (SK 28/5) ${degree}`,
          eligible,
          message: eligible ? '✅ SK 28/5 şartı sağlanmış' : 'Şart sağlanmadı',
          requiredServiceYears: rule.serviceYears,
          requiredDays: rule.days,
          currentServiceYears: serviceYears,
          currentDays: serviceDays,
        });
      }
    } else if (status === '2925' && degree && disabilityDate) {
      const rule = SK285_2925.find(
        r => r.derece === degree && disabilityDate >= r.dateFrom && disabilityDate <= r.dateTo
      );
      if (rule) {
        const eligible = serviceYears >= rule.serviceYears && serviceDays >= rule.days;
        results.push({
          type: 'disability',
          status: `${status} (SK 28/5) ${degree}`,
          eligible,
          message: eligible ? '✅ SK 28/5 şartı sağlanmış' : 'Şart sağlanmadı',
          requiredServiceYears: rule.serviceYears,
          requiredDays: rule.days,
          currentServiceYears: serviceYears,
          currentDays: serviceDays,
        });
      }
    }
  }

  return results;
}
