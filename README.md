# Maison Chance Digital

Hệ thống quản lý dành cho tổ chức từ thiện Maison Chance, giúp theo dõi người thụ hưởng, chương trình, quyên góp, kho vật tư, sự kiện và báo cáo.

## Cài đặt

```bash
npm install
npm run dev
```

Mở http://localhost:3000. Đăng nhập với `admin` (mật khẩu bất kỳ).

## Docker

```bash
docker build -t maison-chance .
docker run -d -p 8080:80 --name maison-chance maison-chance
```
