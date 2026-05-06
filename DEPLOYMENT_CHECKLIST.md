# Vercel Deployment Checklist

## ✅ Frontend (Vercel)

- [ ] Code đã commit và push lên GitHub
- [ ] `npm run build` chạy thành công locally
- [ ] `.env.production` có biến `VITE_API_URL`
- [ ] `vercel.json` được tạo
- [ ] Vercel project đã kết nối GitHub repository
- [ ] Environment variables đã thêm vào Vercel
- [ ] Frontend deploy thành công

## ✅ Backend (Render/Railway/Heroku)

- [ ] Backend code đã commit và push lên GitHub
- [ ] `npm install` chạy trong `server/` folder
- [ ] `npm start` hoạt động locally
- [ ] MongoDB connection string đúng
- [ ] JWT_SECRET được cấu hình
- [ ] CORS origin bao gồm Vercel domain
- [ ] Backend deploy thành công
- [ ] Backend URL có sẵn (vd: `https://app.onrender.com`)

## ✅ Testing

- [ ] Frontend URL từ Vercel tải được
- [ ] Không có console errors
- [ ] API calls thành công (check Network tab)
- [ ] Trang sản phẩm tải dữ liệu
- [ ] Chức năng thêm vào giỏ hàng hoạt động
- [ ] Đăng nhập/Đăng ký hoạt động
- [ ] Responsive mobile hoạt động

## 📝 Lệnh nhanh

```bash
# Build frontend
npm run build

# Test locally
npm run preview

# Build backend
cd server && npm install

# Test backend
cd server && npm start
```

## 🎯 Links sau deploy

- Frontend: `https://shopthethao.vercel.app`
- Backend: `https://shopthethao-api.onrender.com` (hoặc tương tự)

Lưu ý: Thay URL backend vào Environment Variables của Vercel frontend!
