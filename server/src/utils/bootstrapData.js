const Product = require('../models/Product');
const User = require('../models/User');
const { applyProductImage } = require('./productImageHelper');

const sampleProducts = [
  {
    name: 'Giày Chạy Bộ Air Sprint X',
    category: 'Giày',
    brand: 'Velocity',
    price: 1890000,
    description:
      'Mẫu giày chạy bộ nhẹ, dễ êm và độ bám tốt cho các buổi tập cardio hoặc chạy đường dài.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    stock: 18,
    featured: true,
    sizes: { shoes: ['38', '39', '40', '41', '42', '43', '44'], clothes: [] },
    colors: ['Đen', 'Trắng', 'Xanh Navy'],
  },
  {
    name: 'Áo Thun Thể Thao Dry Flex',
    category: 'Áo',
    brand: 'ActivePro',
    price: 390000,
    description:
      'Chất liệu thấm hút mồ hôi nhanh, phù hợp cho gym, bóng đá và các hoạt động ngoài trời.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    stock: 35,
    sizes: { shoes: [], clothes: ['S', 'M', 'L', 'XL', 'XXL'] },
    colors: ['Đen', 'Trắng', 'Xanh Mint'],
  },
  {
    name: 'Quần Short Training Core',
    category: 'Quần',
    brand: 'ActivePro',
    price: 320000,
    description:
      'Quần short co dãn tốt, form thể thao gọn gàng và dễ kết hợp với nhiều outfit.',
    image:
      'https://images.unsplash.com/photo-1506629905607-d9b1a0c7c40d?auto=format&fit=crop&w=900&q=80',
    stock: 27,
    sizes: { shoes: [], clothes: ['S', 'M', 'L', 'XL', 'XXL'] },
    colors: ['Đen', 'Xám', 'Xanh Olive'],
  },
  {
    name: 'Ba lô Đa Năng Sport Gear 28L',
    category: 'Phụ kiện',
    brand: 'TrailMax',
    price: 640000,
    description:
      'Ba lô sức chứa rộng, có ngăn giày riêng và ngăn chống thấm cho đồ tập.',
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    featured: true,
    sizes: { shoes: [], clothes: [] },
    colors: ['Đen', 'Xanh Navy'],
  },
  {
    name: 'Bóng Đá Match Day Pro',
    category: 'Dụng cụ',
    brand: 'KickOne',
    price: 450000,
    description:
      'Bóng đá may tay, độ bền cao, phù hợp đá sân cỏ nhân tạo và sân futsal.',
    image:
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=80',
    stock: 20,
    sizes: { shoes: [], clothes: [] },
    colors: ['Trắng', 'Đen'],
  },
  {
    name: 'Vòi Bình Nước Thể Thao 1L',
    category: 'Phụ kiện',
    brand: 'HydraGo',
    price: 180000,
    description:
      'Vòi bình giữ nhiệt có quai cầm, dễ mang theo khi tập gym, đá banh hoặc chạy bộ.',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    stock: 40,
    sizes: { shoes: [], clothes: [] },
    colors: ['Trong suốt', 'Xanh Biển'],
  },
  {
    name: 'Giày Bóng Chuyền Vero 360',
    category: 'Giày',
    brand: 'SportPro',
    price: 1250000,
    description:
      'Giày bóng chuyền thiết kế cao cấp, hỗ trợ cổ chân tốt, dành cho các vận động viên chuyên nghiệp.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    stock: 15,
    sizes: { shoes: ['39', '40', '41', '42', '43', '44'], clothes: [] },
    colors: ['Trắng', 'Đen', 'Đỏ'],
  },
  {
    name: 'Quần Legging Tập Yoga Slim',
    category: 'Quần',
    brand: 'YogaFit',
    price: 420000,
    description:
      'Quần tập yoga co giãn mềm mại, thoáng mát, có túi tiện lợi ở hai bên.',
    image:
      'https://images.unsplash.com/photo-1506629905607-d9b1a0c7c40d?auto=format&fit=crop&w=900&q=80',
    stock: 22,
    sizes: { shoes: [], clothes: ['S', 'M', 'L', 'XL'] },
    colors: ['Đen', 'Tím than'],
  },
  {
    name: 'Áo Jacket Chạy Bộ WindBreak',
    category: 'Áo',
    brand: 'RunElite',
    price: 890000,
    description:
      'Áo jacket chống gió, nhẹ và thoáng khí, hoàn hảo cho các buổi chạy sáng hoặc chiều.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    stock: 10,
    featured: true,
    sizes: { shoes: [], clothes: ['M', 'L', 'XL', 'XXL'] },
    colors: ['Đen', 'Xanh Navy', 'Xám'],
  },
  {
    name: 'Dây Đeo Sensor Nhịp Tim',
    category: 'Phụ kiện',
    brand: 'FitTech',
    price: 2400000,
    description:
      'Đo nhịp tim chính xác, kết nối Bluetooth với điện thoại, pin lâu dài.',
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    stock: 8,
    sizes: { shoes: [], clothes: [] },
    colors: ['Đen', 'Xanh lá'],
  },
  {
    name: 'Bao Tay Gym Leather Pro',
    category: 'Phụ kiện',
    brand: 'GymGear',
    price: 280000,
    description:
      'Bao tay tập gym da thật, bảo vệ lòng bàn tay, thoáng mát và bền lâu.',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    stock: 30,
    sizes: { shoes: [], clothes: [] },
    colors: ['Đen', 'Nâu'],
  },
  {
    name: 'Dây Nhảy Câu Professional',
    category: 'Dụng cụ',
    brand: 'JumpKing',
    price: 150000,
    description:
      'Dây nhảy chất lượng cao, độ chịu lực tốt, phù hợp cho tập luyện cardio và võ thuật.',
    image:
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=80',
    stock: 25,
    sizes: { shoes: [], clothes: [] },
    colors: ['Đen', 'Xanh dương'],
  },
  {
    name: 'Tạ Cơ Bắp Có Quai',
    category: 'Dụng cụ',
    brand: 'StrengthMax',
    price: 500000,
    description:
      'Bộ tạ cơ bắp đôi, có quai cầm an toàn, dùng cho tập lực và điêu luyện.',
    image:
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=80',
    stock: 18,
    sizes: { shoes: [], clothes: [] },
    colors: ['Đen', 'Xám'],
  },
  {
    name: 'Áo Bơi Cạnh Quần Bơi Nam',
    category: 'Áo',
    brand: 'SwimPro',
    price: 350000,
    description:
      'Bộ đồ bơi nam cao cấp, chất liệu nylon chống clor, khô nhanh.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    stock: 20,
    sizes: { shoes: [], clothes: ['S', 'M', 'L', 'XL'] },
    colors: ['Xanh Navy', 'Đen', 'Trắng'],
  },
  {
    name: 'Giày Đá Bóng Sân Cỏ Nhân Tạo',
    category: 'Giày',
    brand: 'KickPower',
    price: 1100000,
    description:
      'Giày đá bóng chuyên dụng, nhẹ, tăng cường độ chính xác sút bóng.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    stock: 16,
    sizes: { shoes: ['40', '41', '42', '43', '44'], clothes: [] },
    colors: ['Đỏ', 'Đen', 'Trắng'],
  },
];

const bootstrapData = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@sporthub.vn';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    await User.create({
      name: 'SportHub Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`Seeded default admin: ${adminEmail}`);
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(sampleProducts.map(applyProductImage));
    console.log('Seeded sample sport products');
  }
};

module.exports = bootstrapData;
