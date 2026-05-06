const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const { imageForProduct } = require('./src/utils/productImageHelper');

dotenv.config();

const syncProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const products = await Product.find({}, { name: 1, category: 1, brand: 1, image: 1 }).lean();
    let updatedCount = 0;

    for (const product of products) {
      const nextImage = imageForProduct(product);

      if (product.image !== nextImage) {
        await Product.updateOne({ _id: product._id }, { $set: { image: nextImage } });
        updatedCount += 1;
      }
    }

    await mongoose.connection.close();

    console.log(`Đã kiểm tra ${products.length} sản phẩm`);
    console.log(`Đã cập nhật ${updatedCount} đường dẫn ảnh thật trong MongoDB`);
  } catch (error) {
    console.error('Lỗi đồng bộ ảnh sản phẩm:', error.message);
    process.exit(1);
  }
};

syncProductImages();
