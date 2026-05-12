# Hướng dẫn Deploy lên Vercel

## 📋 Điều kiện tiên quyết
- Tài khoản GitHub (để kết nối với Vercel)
- Tài khoản Vercel (vercel.com)
- Backend đã được deploy trên một dịch vụ khác (Render, Railway, Heroku, v.v.)

## 🚀 Bước 1: Chuẩn bị Backend

Bạn cần deploy backend Node.js trước. Có nhiều tùy chọn:

### 💰 So sánh chi phí & tính năng:

| Dịch vụ | Chi phí | Giới hạn | Spin Down | Link |
|---------|--------|---------|----------|------|
| **Railway** | **FREE $5/tháng** ⭐⭐⭐ | 500h/tháng | ❌ Không | railway.app |
| **Render** | **FREE** ⭐⭐ | Có hạn | ✅ Có (15 phút) | render.com |
| **Fly.io** | **FREE** ⭐⭐⭐ | Ít hạn | ❌ Không | fly.io |
| **Vercel Functions** | **FREE** ⭐⭐⭐ | API tier | ❌ Không | vercel.com |
| **Heroku** | ❌ Paid | $50+/tháng | N/A | heroku.com |

**Khuyến cáo: Railway HOẶC Render FREE**

---

### ⭐ KHUYÊN DÙNG: Railway (FREE $5/tháng)

**Ưu điểm:**
- Free $5/tháng credit (đủ cho dự án nhỏ)
- Không có spin-down
- App luôn online
- Dễ setup

**Cách deploy:**
1. Truy cập https://railway.app
2. Click "Start New Project"
3. Chọn "Deploy from GitHub repo"
4. Kết nối GitHub & chọn repo `sports_store`
5. Railway tự detect Node.js
6. Thêm Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shopthethao
   JWT_SECRET=your-secret-key
   ADMIN_EMAIL=admin@sporthub.vn
   ADMIN_PASSWORD=Admin123!
   PORT=5000
   ```
7. Deploy ✅

**URL sẽ là:** `https://sports-store-production.up.railway.app`

---

### Option B: Render (Hoàn toàn FREE)

**Ưu điểm:**
- Không cần thẻ tín dụng
- Hoàn toàn miễn phí

**Nhược điểm:**
- App "ngủ" sau 15 phút → startup chậm (~50s)
- Performance không ổn định khi có nhiều request

**Cách deploy:**
1. Truy cập https://render.com
2. Tạo tài khoản & kết nối GitHub
3. Click "New +" → "Web Service"
4. Chọn repository
5. Cấu hình:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `node src/server.js`
6. Thêm Environment Variables (như trên)
7. Deploy

**URL sẽ là:** `https://your-app.onrender.com`

---

### Option C: Fly.io (FREE)

1. Truy cập https://fly.io
2. Tạo tài khoản
3. Cài CLI: `npm install -g @flyio/cli`
4. CD vào `server` folder
5. Chạy: `fly launch`
6. Chạy: `fly deploy`

---

### MongoDB Database (REQUIRED)

Dù chọn hosting nào, bạn cần database FREE:

1. Truy cập https://www.mongodb.com/cloud/atlas
2. Tạo tài khoản FREE
3. Tạo Cluster (FREE tier)
4. Lấy connection string: 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/shopthethao?retryWrites=true&w=majority
   ```
5. Copy vào `MONGODB_URI` ở host backend

## 🎯 Bước 2: Lấy Backend URL

Sau khi deploy backend thành công, bạn sẽ có URL như:
- **Railway**: `https://sports-store-production.up.railway.app`
- **Render**: `https://your-app.onrender.com`
- **Fly.io**: `https://your-app.fly.dev`
- **Vercel**: `https://your-domain.vercel.app/api`

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

Trong panel Environment Variables của hosting backend, thêm:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shopthethao?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-12345-change-this
ADMIN_EMAIL=admin@sporthub.vn
ADMIN_PASSWORD=Admin123!
NODE_ENV=production
PORT=5000
```

**Lưu ý:**
- `MONGODB_URI`: Lấy từ MongoDB Atlas connection string
- `JWT_SECRET`: Đặt một chuỗi ngẫu nhiên dài (tối thiểu 32 ký tự)
- `PORT`: Railway/Fly.io sẽ override nếu cần, nhưng để 5000 là an toàn

## 🆘 Troubleshooting

### ❌ Lỗi CORS (Access blocked)

**Triệu chứng**: Frontend không thể call API, lỗi CORS

**Cách sửa**: Sửa file `server/src/app.js`:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: [
    'https://shopthethao.vercel.app',  // Frontend URL
    'http://localhost:5173',            // Dev local
    'http://localhost:3000'             // Alternative
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

Sau đó push lại lên GitHub & redeploy backend.

### ❌ API không respond

**Kiểm tra:**
1. Backend URL đúng trong `.env.production`
2. Backend đang chạy (test: `curl https://backend-url/api/products`)
3. CORS được cấu hình
4. Database connection OK

### ❌ Build fail trên Vercel

**Cách debug:**
```bash
npm run build
```

Chạy local để xem lỗi chi tiết

### ❌ App "ngủ" trên Render

Nếu dùng Render FREE:
- App sẽ spin down sau 15 phút
- Request đầu tiên mất ~50 giây để wake up
- **Giải pháp**: Dùng Railway hoặc Fly.io (không spin down)

## 📚 Tài liệu thêm
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Railway: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Fly.io: https://fly.io/docs

---

## ⚡ Quick Start Summary

### Nếu muốn **HOÀN TOÀN FREE**:
1. **Backend**: Render (Free tier)
2. **Database**: MongoDB Atlas (Free)
3. **Frontend**: Vercel (Free)
4. ❌ **Nhược điểm**: App sẽ "ngủ", startup chậm

### Nếu muốn **TỐT NHẤT - RẺ NHẤT** (Khuyên dùng):
1. **Backend**: Railway ($5/tháng FREE credit)
2. **Database**: MongoDB Atlas (Free)
3. **Frontend**: Vercel (Free)
4. ✅ **Ưu điểm**: App luôn online, performance tốt

### Nếu muốn **ƯU TIÊN PERFORMANCE**:
1. **Backend**: Fly.io (Free tier tốt)
2. **Database**: MongoDB Atlas (Free)
3. **Frontend**: Vercel (Free)

### Timeline & Chi phí tháng 1:
```
Railway:  $0 (Free $5 credit)
MongoDB:  $0 (Free tier)
Vercel:   $0 (Free tier)
---
TỔNG:     $0 - Hoàn toàn FREE! 🎉
```

Tháng tiếp theo nếu vượt giới hạn Railway, bạn sẽ phải trả hoặc chuyển sang Fly.io.
