'use client';

import { useState } from 'react';
import { calculateRetirement, CalculatorInput, RetirementResult } from '@/lib/calculator';
import { parseDate, formatDate } from '@/lib/retirement-rules';

export default function Home() {
  const [formData, setFormData] = useState({
    status: '4a',
    birthDate: '',
    entryDate: '',
    gender: 'erkek' as 'erkek' | 'kadin',
    serviceDay: '0',
    militaryService: '0',
    disabilityType: 'none' as 'none' | 'sk284' | 'sk285',
    disabilityDegree: '%50-%59' as '%40-%49' | '%50-%59' | '%60+',
    disabilityDate: '',
  });

  const [results, setResults] = useState<RetirementResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation
    const birthDate = parseDate(formData.birthDate);
    const entryDate = parseDate(formData.entryDate);

    if (!birthDate) newErrors.push('Geçerli doğum tarihi (DD.MM.YYYY) girin');
    if (!entryDate) newErrors.push('Geçerli işe giriş tarihi (DD.MM.YYYY) girin');

    if (formData.disabilityType !== 'none' && !formData.disabilityDegree) {
      newErrors.push('Malüllük derecesi seçin');
    }

    if (formData.disabilityType === 'sk285' && !parseDate(formData.disabilityDate)) {
      newErrors.push('Malüllük tarihini girin');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const input: CalculatorInput = {
      status: formData.status,
      birthDate: birthDate!,
      entryDate: entryDate!,
      referenceDate: new Date(),
      gender: formData.gender,
      serviceDay: parseInt(formData.serviceDay) || 0,
      militaryService: parseInt(formData.militaryService) || 0,
      disabilityType: formData.disabilityType,
      disabilityDegree: formData.disabilityDegree as any,
      disabilityDate: formData.disabilityDate ? parseDate(formData.disabilityDate) || undefined : undefined,
    };

    const calculatedResults = calculateRetirement(input);
    setResults(calculatedResults);
    setShowResults(true);
    setErrors([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SGK Emeklilik Hesaplama
          </h1>
          <p className="text-gray-600">
            Normal, Yaştan ve Malüllük Emeklilik Şartlarını Kontrol Edin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bilgiler</h2>
            
            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Statü */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statü
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="4a">4/a (SSK)</option>
                  <option value="4b">4/b (Bağ-Kur)</option>
                  <option value="4c">4/c (Memur)</option>
                  <option value="2925">2925 (Tarım)</option>
                </select>
              </div>

              {/* Doğum Tarihi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doğum Tarihi <span className="text-gray-500">(DD.MM.YYYY)</span>
                </label>
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  placeholder="01.01.1980"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* İşe Giriş Tarihi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlk İşe Giriş Tarihi <span className="text-gray-500">(DD.MM.YYYY)</span>
                </label>
                <input
                  type="text"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleInputChange}
                  placeholder="01.01.2000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cinsiyet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cinsiyet
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="erkek">Erkek</option>
                  <option value="kadin">Kadın</option>
                </select>
              </div>

              {/* Prim Günü */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ek Prim Günü
                </label>
                <input
                  type="number"
                  name="serviceDay"
                  value={formData.serviceDay}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Askerlik */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Askerlik (yıl)
                </label>
                <input
                  type="number"
                  name="militaryService"
                  value={formData.militaryService}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Malüllük */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Malüllük Durumu</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="disabilityType"
                      value="none"
                      checked={formData.disabilityType === 'none'}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yok</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="disabilityType"
                      value="sk284"
                      checked={formData.disabilityType === 'sk284'}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">SK 28/4 (İlk İşe Girişte)</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="disabilityType"
                      value="sk285"
                      checked={formData.disabilityType === 'sk285'}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">SK 28/5 (Çalışırken)</span>
                  </label>
                </div>

                {formData.disabilityType !== 'none' && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Derece
                      </label>
                      <select
                        name="disabilityDegree"
                        value={formData.disabilityDegree}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="%40-%49">%40-%49</option>
                        <option value="%50-%59">%50-%59</option>
                        <option value="%60+">%60+</option>
                      </select>
                    </div>

                    {formData.disabilityType === 'sk285' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Malüllük Tarihi <span className="text-gray-500">(DD.MM.YYYY)</span>
                        </label>
                        <input
                          type="text"
                          name="disabilityDate"
                          value={formData.disabilityDate}
                          onChange={handleInputChange}
                          placeholder="01.01.2010"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  {errors.map((error, idx) => (
                    <p key={idx} className="text-sm text-red-700">• {error}</p>
                  ))}
                </div>
              )}

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                Hesapla
              </button>
            </form>
          </div>

          {/* Results */}
          {showResults && (
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sonuçlar</h2>

              {results.length === 0 ? (
                <p className="text-gray-600">Sonuç bulunamadı</p>
              ) : (
                <div className="space-y-4">
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        result.eligible
                          ? 'bg-green-50 border-green-300'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          {result.type === 'normal' && '📋 Normal Emeklilik'}
                          {result.type === 'ageBased' && '🎂 Yaştan Emeklilik'}
                          {result.type === 'disability' && '♿ Malüllük Emeklilik'}
                          {' - '}
                          {result.status}
                        </h3>
                        <span className={`text-lg font-bold ${
                          result.eligible ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {result.eligible ? '✅' : '❌'}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3">{result.message}</p>

                      {result.eligible && result.eligibleDate && (
                        <p className="text-green-700 font-semibold">
                          ➜ Tarih: {formatDate(result.eligibleDate)}
                        </p>
                      )}

                      {/* Details */}
                      <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                        {result.requiredServiceYears !== undefined && (
                          <p className="text-gray-600">
                            Gerekli Hizmet: {result.requiredServiceYears} yıl | Mevcut: {result.currentServiceYears} yıl
                          </p>
                        )}
                        {result.requiredDays !== undefined && (
                          <p className="text-gray-600">
                            Gerekli Gün: {result.requiredDays} | Mevcut: {result.currentDays} gün
                          </p>
                        )}
                        {result.requiredAge !== undefined && (
                          <p className="text-gray-600">
                            Gerekli Yaş: {result.requiredAge} | Mevcut: {result.currentAge} yaş
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
