# SGK Emeklilik Hak Hesaplayıcı - Veritabanı Versiyonu

## Özellikler

✅ **SQLite Veritabanı**: 59 emeklilik kuralı
✅ **API Entegrasyonu**: `/api/calculate` endpoint
✅ **Üç Tür Emeklilik**: Normal + Yaştan + Malüllük
✅ **Tüm Statüler**: 4/a, 4/b, 4/c, 2925 (Tarım)
✅ **Tarih-Bazlı Kurallar**: Giriş tarihine göre dinamik
✅ **Derece Filtresi**: SK 28/5 malüllük derecesi

## Kurulum

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Veritabanını İyileştir
```bash
npm run seed
```

Bu komut `data/retirement.db` dosyasını oluşturur ve 59 kuralı yükler.

### 3. Geliştirme Sunucusu Başlat
```bash
npm run dev
```

http://localhost:3000 adresine gidin

### 4. Build & Production
```bash
npm run build
npm start
```

## Veritabanı Yapısı

### retirement_rules Tablosu
```sql
- id (INTEGER PRIMARY KEY)
- status (TEXT): 4a, 4b, 4c, 2925
- type (TEXT): normal, age, disability
- name (TEXT): Kural adı
- dateFrom (TEXT): Geçerlilik başlangıcı (YYYY-MM-DD)
- dateTo (TEXT): Geçerlilik bitişi (YYYY-MM-DD)
- serviceYears (INTEGER): Gerekli hizmet yılı (nullable)
- days (INTEGER): Gerekli prim günü (nullable)
- ageWoman (INTEGER): Kadın yaş şartı (nullable)
- ageMan (INTEGER): Erkek yaş şartı (nullable)
- degree (TEXT): Malüllük derecesi (%40-%49, %50-%59, %60+)
- notes (TEXT): Açıklamalar (KISMİ, TAM, vb.)
```

### Statuses Tablosu
- 4a: SSK (Sosyal Sigortalar Kurumu)
- 4b: Bağ-Kur (Esnaf ve Sanatkârlar Kurumu)
- 4c: Memur (Devlet Memurları)
- 2925: Tarım Sigortası

## API Kullanımı

### POST /api/calculate

**Request:**
```json
{
  "status": "4a",
  "dogumTarihi": "01.01.1990",
  "cinsiyet": "erkek",
  "ilkGirisTarihi": "01.01.2010",
  "priGunu": 7000,
  "askerlikGunu": 0,
  "askerlikNedir": "sonra",
  "malulukTuru": "yok",
  "derece": null,
  "malulTarihi": null
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "EYT Yaşsız (NORMAL)",
      "type": "normal",
      "uygun": true,
      "kosullar": [
        {
          "ad": "Hizmet Yılı",
          "gerekli": "15",
          "sahip": "14",
          "basarili": false
        },
        ...
      ]
    }
  ]
}
```

## Kurallar (59 Toplam)

### 4/a (SSK)
- **Normal**: 2 kural (EYT yaşsız)
- **Yaştan**: 3 kural (kademeli geçiş)
- **SK 28/4**: 2 kural (ilk işe girişte malül)
- **SK 28/5**: 2 kural (%40-%49, %50-%59 derece)

### 4/b (Bağ-Kur)
- **Normal**: 3 kural
- **Yaştan**: 4 kural (KISMİ + TAM)

### 4/c (Memur)
- **Normal**: 3 kural
- **Yaştan**: 14 kural (kademeli, 2008-2048+)
- **SK 28/4**: 2 kural (derece-bazlı)

### 2925 (Tarım)
- **Normal**: 5 kural (2008-2011+)
- **SK 28/5**: 16 kural (derece + tarih bazlı)

## Vercel Deployment

1. GitHub'a push et (✅ Tamamlandı)
2. Vercel Dashboard'dan `tahsis` repository'sini import et
3. Build command: `npm run build`
4. Start command: `npm start`
5. Environment: Node.js 18+

**NOT:** SQLite database otomatik oluşturulur. `npm run seed` production'da da çalışır.

## Dosya Yapısı

```
app/
├── page.tsx              # Form UI
└── api/
    └── calculate/
        └── route.ts      # API endpoint

lib/
├── db.ts                 # Database initialization
└── calculator-db.ts      # DB-driven calculation

scripts/
└── seed-db.ts           # Database seed script

data/
└── retirement.db        # SQLite database (auto-created)
```

## Geliştirilmiş Özellikler (Sonra)

- [ ] Veritabanı yönetim arayüzü (admin panel)
- [ ] Excel dosyasını doğrudan yükleme
- [ ] CronJob ile otomatik güncelleme
- [ ] Detaylı raporlama
- [ ] PostgreSQL desteği

---

**Geçerlilik Tarihi**: 16.06.2026
**Veritabanı Versiyonu**: 1.0
**Kurallar**: 59 entegre
