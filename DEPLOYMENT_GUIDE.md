# Hướng dẫn Deploy lên Vercel

## 📋 Điều kiện tiên quyết
- Tài khoản GitHub (để kết nối với Vercel)
- Tài khoản Vercel (vercel.com)
- Backend đã được deploy trên một dịch vụ khác (Render, Railway, Heroku, v.v.)

## 🚀 Bước 1: Chuẩn bị Backend

Bạn cần deploy backend Node.js trước. Khuyến nghị dùng:

### Option A: Render (Khuyên dùng - FREE tier)
1. Truy cập https://render.com
2. Tạo tài khoản & kết nối GitHub
3. Tạo "New Web Service"
4. Chọn repository `shopthethao`
5. Cấu hình:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**: Thêm các biến từ `.env`
6. Deploy

### Option B: Railway.app
1. Truy cập https://railway.app
2. Kết nối GitHub
3. Chọn "Deploy from GitHub"
4. Thêm Environment: `server` folder
5. Cấu hình Start Command: `npm start` (trong server folder)

### Option C: Heroku (Paid)
1. Truy cập https://heroku.com
2. Tạo app mới
3. Kết nối GitHub
4. Deploy server folder

## 🎯 Bước 2: Lấy Backend URL

Sau khi deploy backend thành công, bạn sẽ có URL như:
- Render: `https://your-app.onrender.com`
- Railway: `https://your-app.up.railway.app`
- Heroku: `https://your-app.herokuapp.com`

## 📱 Bước 3: Deploy Frontend lên Vercel

### 3.1 Đẩy code lên GitHub (nếu chưa)
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 3.2 Deploy Frontend
1. Truy cập https://vercel.com
2. Login bằng GitHub
3. Click "Add New" → "Project"
4. Chọn repository `shopthethao`
5. Cấu hình:
   - **Framework**: Vite
   - **Root Directory**: `.`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Thêm Environment Variables
Trong Project Settings → Environment Variables, thêm:
```
VITE_API_URL=https://your-backend-url.com/api
```

Ví dụ:
- Nếu backend trên Render: `https://your-app.onrender.com/api`
- Nếu backend trên Railway: `https://your-app.up.railway.app/api`

### 3.4 Deploy
Click "Deploy" → Chờ build hoàn tất

## ✅ Bước 4: Kiểm tra

1. Truy cập link Vercel được cấp (vd: `https://shopthethao.vercel.app`)
2. Kiểm tra:
   - Trang chủ tải được
   - Chuyển hướng trang
   - API calls hoạt động (mở DevTools → Network)
   - Đăng nhập, xem sản phẩm, thêm vào giỏ hàng

## 🔗 Các biến môi trường cần thêm (Backend)

Trong panel Environment Variables của backend:
```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
ADMIN_EMAIL=admin@sporthub.vn
ADMIN_PASSWORD=Admin123!
```

## 🆘 Troubleshooting

**Lỗi CORS**: Thêm domain Vercel vào CORS trong `server/src/app.js`:
```javascript
const corsOptions = {
  origin: ['https://shopthethao.vercel.app', 'http://localhost:5173'],
  credentials: true,
};
```

**API không respond**: Kiểm tra:
1. Backend URL đúng trong `.env.production`
2. Backend đang chạy
3. CORS được cấu hình đúng

**Build fail**: 
```bash
npm run build
```
Chạy local để debug

## 📚 Tài liệu thêm
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Railway: https://docs.railway.app
