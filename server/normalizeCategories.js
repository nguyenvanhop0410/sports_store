const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

dotenv.config();

const CATEGORY_MAP = {
  ao: 'Áo',
  quan: 'Quần',
  giay: 'Giày',
  phukien: 'Phụ kiện',
  phu_kien: 'Phụ kiện',
  'phu kien': 'Phụ kiện',
  dungcu: 'Dụng cụ',
  dung_cu: 'Dụng cụ',
  'dung cu': 'Dụng cụ',
};

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z]/g, '');

const normalizeCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const products = await Product.find();
    let updatedCount = 0;

    for (const product of products) {
      const normalized = normalizeText(product.category);
      const mappedCategory = CATEGORY_MAP[normalized];

      if (mappedCategory && product.category !== mappedCategory) {
        product.category = mappedCategory;
        await product.save();
        updatedCount += 1;
      }
    }

    console.log(`Đã chuẩn hóa ${updatedCount} sản phẩm về danh mục tiếng Việt có dấu`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('Lỗi chuẩn hóa danh mục:', error.message);
    process.exit(1);
  }
};

normalizeCategories();
