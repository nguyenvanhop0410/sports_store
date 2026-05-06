# SportHub - Website Ban Do The Thao Online

Du an mini e-commerce dap ung de tai: quan ly san pham, gio hang, don hang, dang nhap dang ky, phan quyen admin/user va thanh toan mo phong.

## 1) Cong nghe su dung

- Frontend: ReactJS, Vite, React Router, HTML/CSS/JavaScript
- Backend: Node.js, Express
- Database: MongoDB (MongoDB Atlas hoac local)
- Auth: JWT + phan quyen role (admin/user)

## 2) Chuc nang da hoan thanh theo de bai

### A. Quan ly san pham

- CRUD san pham (ten, gia, mo ta, hinh anh, ton kho, loai)
- Tim kiem theo tu khoa
- Loc theo danh muc va khoang gia
- Hien thi san pham dang luoi

### B. Gio hang va don hang

- Them/xoa/cap nhat so luong san pham trong gio
- Tinh tong so luong, tong tien
- Dat hang va luu thong tin don
- Tru ton kho khi tao don

### C. Tai khoan va phan quyen

- Dang ky, dang nhap, xem thong tin nguoi dung hien tai
- User: mua hang, xem don hang cua minh
- Admin: CRUD san pham, xem va cap nhat trang thai don

### D. Thanh toan mo phong

- Chon COD hoac BANK_TRANSFER (gia lap)
- Xac nhan dat hang
- Admin co the cap nhat trang thai thanh toan pending/paid

### E. Trien khai

- Ho tro deploy tach frontend/backend tren Render + Vercel/Netlify
- Co the dua len Heroku (neu tai khoan co ho tro), Render, hoac hosting truong

## 3) Chuc nang nang cao da co

- Luu gio hang tren localStorage
- Dashboard admin co thong ke tong don, tong doanh thu, tong san pham
- Giao dien responsive desktop/mobile

## 4) Kien truc he thong

- Frontend goi REST API den backend
- Backend xac thuc JWT cho route can bao mat
- Mongoose model:
  - User
  - Product
  - Order

## 5) Huong dan chay local

### Buoc 1: Cai dependencies

Tai thu muc goc:

```bash
npm install
cd server
npm install
```

### Buoc 2: Tao file moi truong

- Frontend: tao file `.env` tai thu muc goc

```env
VITE_API_URL=http://localhost:5000/api
```

- Backend: tao file `server/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sporthub
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@sporthub.vn
ADMIN_PASSWORD=Admin123!
```

### Buoc 3: Chay backend

```bash
cd server
npm run dev
```

Backend se tu dong tao admin user va seed sample products lan dau.
Neu ban muon them nhieu san pham khac vao sau:

```bash
node seedMore.js
```

### Buoc 4: Chay frontend

Mo terminal moi:

```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## 6) Tai khoan mac dinh va du lieu ban dau

Khi server chay lan dau, he thong se:

1. Tao admin user mac dinh:
   - Email: admin@sporthub.vn
   - Password: Admin123!

2. Seed 6 san pham dau tien (giay, ao, quan, ba lo, bong da, binh nuoc).

3. De them nhieu san pham the thao hon (15 san pham):

```bash
cd server
node seedMore.js
```

Script nay se them 10 san pham bo sung vao database (quan tay, mu, tat, etc).

## 7) Huong dan deploy

### Phuong an goi y: Backend Render + Frontend Vercel

1. Day code len GitHub.
2. Deploy backend len Render:
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`
   - Khai bao bien moi truong trong Render dashboard (PORT, MONGO_URI, JWT_SECRET, CLIENT_URL, ...)
3. Lay URL backend sau deploy, vi du: `https://sporthub-api.onrender.com/api`
4. Deploy frontend len Vercel (root project):
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Env: `VITE_API_URL=https://sporthub-api.onrender.com/api`
5. Cap nhat `CLIENT_URL` tren backend bang domain frontend de CORS hop le.

### Netlify

- Tuong tu Vercel, khai bao `VITE_API_URL` trong Site settings.

## 8) Phan cong nhom 3-4 sinh vien (mau)

- Thanh vien 1: Frontend User flow (Home, Product detail, Cart, Checkout)
- Thanh vien 2: Frontend Admin (CRUD product, order management)
- Thanh vien 3: Backend API + Auth + DB schema
- Thanh vien 4: Deploy + test + tai lieu bao cao + demo

## 9) Noi dung bao cao goi y

- So do kien truc he thong (Frontend-Backend-Database)
- Mo ta API chinh va model du lieu
- Phan cong cong viec theo thanh vien
- Demo luong dat hang user va luong duyet don admin
- Ke hoach mo rong: payment gateway, profile, khuyen mai, Docker + CI/CD
