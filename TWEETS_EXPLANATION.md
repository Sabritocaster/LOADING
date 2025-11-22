# Tweet'ler Nasıl Alınıyor?

## 📊 Tweet Kaynağı

Tweet'ler `TwExportly_stilllllloading_tweets_2025_11_22.csv` dosyasından alınıyor. Bu CSV dosyası X (Twitter) export aracı ile oluşturulmuş.

## 🔄 İşlem Süreci

### 1. CSV Parse (`parse-tweets.js`)
Script CSV dosyasını okur ve şu adımları uygular:

1. **Filtreleme:**
   - 20 karakterden kısa tweet'ler atlanır
   - Retweet'ler (RT @) filtrelenir
   - Boş tweet'ler atlanır
   - @mention'lar tweet başından temizlenir
   - URL'ler kaldırılır

2. **Temizleme:**
   - Duplicate tweet'ler kaldırılır (ilk 50 karaktere göre)
   - Çok kısa tweet'ler (< 15 karakter) filtrelenir

3. **Sıralama:**
   - 30-150 karakter arası tweet'ler öncelikli
   - Uzunluğa göre sıralanır

4. **Seçim:**
   - En iyi 30 tweet seçilir
   - `tweets-quotes.json` dosyasına kaydedilir

## ❓ Neden 26 Tweet?

26 tweet olmasının nedenleri:
- CSV'de toplam 763 satır var (header dahil)
- Birçok tweet çok kısa (< 20 karakter) veya sadece emoji
- Retweet'ler filtreleniyor
- Duplicate'ler kaldırılıyor
- Sonuçta 26 kaliteli, anlamlı tweet kaldı

## 🔄 Yeni Tweet Ekleme

Yeni tweet'ler eklemek için:

1. CSV dosyasını güncelleyin
2. Terminal'de çalıştırın:
```bash
node parse-tweets.js
```

Bu komut `tweets-quotes.json` dosyasını yeniden oluşturur ve web sitesinde otomatik olarak görünür.

## 📝 Notlar

- Script her çalıştırıldığında en iyi tweet'leri seçer
- Tweet sayısı CSV içeriğine göre değişebilir
- Minimum 15 karakter uzunluğunda tweet'ler seçilir

