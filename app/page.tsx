'use client';

import React, { useState } from 'react';
import { calculateRetirementOptions } from '@/lib/calculator';

interface FormData {
  status: '4a' | '4b' | '4c' | '2925' | '';
  dogumTarihi: string; // DD.MM.YYYY
  cinsiyet: 'erkek' | 'kadin';
  ilkGirisTarihi: string; // DD.MM.YYYY
  priGunu: number;
  askerlikGunu: number;
  askerlikNedir: 'once' | 'sonra';
  malulukTuru: 'yok' | 'sk284' | 'sk285';
  derece: string;
  malulTarihi: string;
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

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('.').map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    status: '',
    dogumTarihi: '',
    cinsiyet: 'erkek',
    ilkGirisTarihi: '',
    priGunu: 0,
    askerlikGunu: 0,
    askerlikNedir: 'sonra',
    malulukTuru: 'yok',
    derece: '',
    malulTarihi: '',
  });

  const [results, setResults] = useState<RetirementResult[] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'priGunu' || name === 'askerlikGunu' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.status || !formData.dogumTarihi || !formData.ilkGirisTarihi) {
      alert('Lütfen zorunlu alanları doldurunuz');
      return;
    }

    const dogumTarihi = parseDate(formData.dogumTarihi);
    const ilkGirisTarihi = parseDate(formData.ilkGirisTarihi);
    const malulTarihi = formData.malulTarihi ? parseDate(formData.malulTarihi) : null;

    if (!dogumTarihi || !ilkGirisTarihi) {
      alert('Tarih formatı DD.MM.YYYY olmalıdır');
      return;
    }

    const retirementResults = calculateRetirementOptions({
      status: formData.status as '4a' | '4b' | '4c' | '2925',
      dogumTarihi,
      cinsiyet: formData.cinsiyet,
      ilkGirisTarihi,
      priGunu: formData.priGunu,
      askerlikGunu: formData.askerlikGunu,
      askerlikNedir: formData.askerlikNedir,
      malulukTuru: formData.malulukTuru as 'yok' | 'sk284' | 'sk285',
      derece: formData.derece,
      malulTarihi,
    });

    setResults(retirementResults);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            SGK Emeklilik Hak Hesaplayıcı
          </h1>
          <p className="text-slate-600">
            Statüye göre emeklilik haklarınızı kontrol edin
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORM */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-md p-6 space-y-5 sticky top-4"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                BİLGİLERİNİZİ GİRİN
              </h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Statü *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="4a">4/a (SSK)</option>
                  <option value="4b">4/b (Bağ-Kur)</option>
                  <option value="4c">4/c (Memur)</option>
                  <option value="2925">2925 (Tarım)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Doğum Tarihi (DD.MM.YYYY) *
                </label>
                <input
                  type="text"
                  name="dogumTarihi"
                  value={formData.dogumTarihi}
                  onChange={handleChange}
                  placeholder="01.01.1990"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cinsiyet
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="cinsiyet"
                      value="erkek"
                      checked={formData.cinsiyet === 'erkek'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-slate-700">Erkek</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="cinsiyet"
                      value="kadin"
                      checked={formData.cinsiyet === 'kadin'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-slate-700">Kadın</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  İlk İşe Giriş Tarihi (DD.MM.YYYY) *
                </label>
                <input
                  type="text"
                  name="ilkGirisTarihi"
                  value={formData.ilkGirisTarihi}
                  onChange={handleChange}
                  placeholder="01.01.2010"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prim Günü (Toplam)
                </label>
                <input
                  type="number"
                  name="priGunu"
                  value={formData.priGunu}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Askerlik Günü
                </label>
                <input
                  type="number"
                  name="askerlikGunu"
                  value={formData.askerlikGunu}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {formData.askerlikGunu > 0 && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Askerlik Dönemi
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="askerlikNedir"
                        value="once"
                        checked={formData.askerlikNedir === 'once'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-slate-700">Işe girmeden önce</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="askerlikNedir"
                        value="sonra"
                        checked={formData.askerlikNedir === 'sonra'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-slate-700">İşte iken</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Malüllük / Engelli
                </label>
                <select
                  name="malulukTuru"
                  value={formData.malulukTuru}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="yok">Yok</option>
                  <option value="sk284">SK 28/4 (İlk İşe Girişte)</option>
                  <option value="sk285">SK 28/5 (Sonradan Malül)</option>
                </select>
              </div>

              {formData.malulukTuru === 'sk285' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Malüllük Derecesi
                    </label>
                    <select
                      name="derece"
                      value={formData.derece}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="%40-%49">%40-%49</option>
                      <option value="%50-%59">%50-%59</option>
                      <option value="%60+">%60+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Malüllük Tespiti Tarihi (DD.MM.YYYY)
                    </label>
                    <input
                      type="text"
                      name="malulTarihi"
                      value={formData.malulTarihi}
                      onChange={handleChange}
                      placeholder="01.01.2020"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 mt-6"
              >
                HESAPLA
              </button>
            </form>
          </div>

          {/* SONUÇLAR */}
          <div className="lg:col-span-2">
            {submitted && results ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  EMEKLİLİK HAKLARI
                </h2>

                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3">
                    ✅ Uygun Olduğunuz
                  </h3>
                  <div className="space-y-3">
                    {results
                      .filter((r) => r.uygun)
                      .map((result, idx) => (
                        <div
                          key={idx}
                          className="bg-green-50 border border-green-200 rounded-lg p-4"
                        >
                          <div className="font-semibold text-green-900 mb-2">
                            {result.name}
                          </div>
                          <div className="text-sm text-green-800">
                            <div className="font-medium mb-2">Şartlar:</div>
                            <ul className="space-y-1">
                              {result.kosullar.map((kosul, i) => (
                                <li key={i} className="text-sm">
                                  <span className="text-green-700">
                                    ✓ {kosul.ad}: {kosul.sahip} (Gerekli: {kosul.gerekli})
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {results.some((r) => !r.uygun) && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">
                      ❌ Henüz Uygun Olmadığınız
                    </h3>
                    <div className="space-y-2">
                      {results
                        .filter((r) => !r.uygun)
                        .slice(0, 5)
                        .map((result, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm"
                          >
                            <div className="font-semibold text-slate-800 mb-1">
                              {result.name}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : !submitted ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                <p className="text-lg font-semibold text-blue-900 mb-2">
                  Emeklilik Haklarını Öğrenin
                </p>
                <p className="text-blue-800 text-sm">
                  Sol tarafta bilgilerinizi giriniz ve "Hesapla" butonuna tıklayınız.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
