# GitHub Pages Deploy Adımları

## 1. GitHub'da Repository Oluşturun
- https://github.com/new adresine gidin
- Repository name: `LOADING` (veya istediğiniz isim)
- Public seçin
- "Initialize this repository with a README" seçmeyin
- "Create repository" tıklayın

## 2. Remote Ekle ve Push Et
Terminal'de şu komutları çalıştırın:

```bash
git remote add origin https://github.com/sabritocaster/LOADING.git
git push -u origin main
```

**Not:** Repository adınız farklıysa URL'yi değiştirin.

## 3. GitHub Pages Ayarları
1. GitHub repository sayfasına gidin
2. Settings > Pages sekmesine tıklayın
3. Source: "Deploy from a branch" seçin
4. Branch: `main` seçin
5. Folder: `/ (root)` seçin
6. Save tıklayın

## 4. Site URL'i
Site şu adreste yayınlanacak:
**https://sabritocaster.github.io/LOADING/**

**Not:** İlk deploy 1-2 dakika sürebilir.

## 5. Custom Domain Entegrasyonu (loading.center)

### Adım 1: GitHub'da Domain Ekleme
1. GitHub repository sayfasında **Settings** > **Pages**
2. **Custom domain** bölümüne `loading.center` yazın
3. **Save** tıklayın
4. **Enforce HTTPS** seçeneğini işaretleyin (önerilir)

### Adım 2: DNS Ayarları
Domain sağlayıcınızın DNS ayarlarına gidin (örn: Cloudflare, Namecheap, GoDaddy) ve şu kayıtları ekleyin:

**Seçenek 1: Apex Domain (loading.center) için A Records:**
```
Type: A
Name: @ (veya boş)
Value: 185.199.108.153
TTL: 3600 (veya Auto)

Type: A
Name: @ (veya boş)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (veya boş)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (veya boş)
Value: 185.199.111.153
TTL: 3600
```

**Seçenek 2: www Subdomain için CNAME:**
```
Type: CNAME
Name: www
Value: sabritocaster.github.io
TTL: 3600
```

**Not:** GitHub Pages için 4 A record gereklidir (yukarıdaki IP'ler).

### Adım 3: CNAME Dosyası Oluşturma
Repository'nize `CNAME` dosyası ekleyin (GitHub otomatik oluşturabilir, ama manuel de ekleyebilirsiniz):

```bash
echo "loading.center" > CNAME
git add CNAME
git commit -m "Add custom domain CNAME"
git push
```

### Adım 4: DNS Propagation Bekleme
- DNS değişiklikleri 24-48 saat sürebilir (genellikle birkaç saat)
- Kontrol için: https://dnschecker.org/#A/loading.center

### Adım 5: HTTPS Aktifleştirme
1. GitHub'da **Settings** > **Pages**
2. **Enforce HTTPS** seçeneğini işaretleyin
3. Birkaç dakika bekleyin (Let's Encrypt sertifikası oluşturulur)

### Kontrol
- `https://loading.center` adresine gidin
- Site yükleniyorsa başarılı!

**Not:** Eğer Cloudflare kullanıyorsanız, SSL/TLS ayarını "Full" veya "Full (strict)" yapın.


