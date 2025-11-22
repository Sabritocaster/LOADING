# Ücretsiz Hosting Rehberi

## 🚀 Hızlı Seçenekler

### 1. Netlify (En Kolay - Drag & Drop)
1. https://www.netlify.com adresine gidin
2. Hesap oluşturun (GitHub ile giriş yapabilirsiniz)
3. "Add new site" > "Deploy manually"
4. `/Users/sabrierendagdelen/Desktop/LOADING` klasörünü sürükleyip bırakın
5. Site anında yayınlanır! (örn: `random-name-123.netlify.app`)

### 2. GitHub Pages
1. GitHub'da yeni repository oluşturun (public)
2. Terminal'de:
```bash
cd /Users/sabrierendagdelen/Desktop/LOADING
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/LOADING.git
git push -u origin main
```
3. GitHub'da: Settings > Pages > Source: main branch
4. Site: `https://KULLANICI_ADINIZ.github.io/LOADING/`

### 3. Vercel
1. https://vercel.com adresine gidin
2. GitHub ile giriş yapın
3. "New Project" > Repository seçin
4. Framework: Other
5. Deploy edin

### 4. Surge.sh (Komut Satırı)
```bash
npm install -g surge
cd /Users/sabrierendagdelen/Desktop/LOADING
surge
# Domain adı girin (örn: loading-99)
```

## 📝 Notlar
- Tüm seçenekler ücretsizdir
- Özel domain ekleyebilirsiniz
- HTTPS otomatik olarak eklenir
- Dosyalarınızı güncelledikçe otomatik yeniden deploy olur (Git entegrasyonu ile)

## 🎯 Öneri
**Netlify** en kolay başlangıç için idealdir - sadece klasörü sürükleyip bırakın!

