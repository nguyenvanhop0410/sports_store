const asyncHandler = require('../utils/asyncHandler');
const Product = require('../models/Product');

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => `${item}`.trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeProductPayload = (payload) => {
  const normalized = {
    name: payload.name?.trim(),
    category: payload.category?.trim(),
    brand: payload.brand?.trim(),
    description: payload.description?.trim(),
    image: payload.image?.trim(),
    price: Number(payload.price),
    stock: Number(payload.stock),
    featured: Boolean(payload.featured),
  };

  if (payload.sizes) {
    normalized.sizes = {
      shoes: Array.isArray(payload.sizes.shoes) ? payload.sizes.shoes : [],
      clothes: Array.isArray(payload.sizes.clothes) ? payload.sizes.clothes : [],
    };
  }

  const colors = normalizeStringList(payload.colors);
  if (colors.length) {
    normalized.colors = colors;
  }

  return normalized;
};

const validateProductPayload = (payload, isUpdate = false) => {
  const requiredFields = ['name', 'category', 'description', 'image'];

  for (const field of requiredFields) {
    if (!isUpdate && !payload[field]) {
      return `${field} is required`;
    }
  }

  if (!isUpdate || payload.price !== undefined) {
    if (!Number.isFinite(payload.price) || payload.price < 0) {
      return 'price must be a non-negative number';
    }
  }

  if (!isUpdate || payload.stock !== undefined) {
    if (!Number.isFinite(payload.stock) || payload.stock < 0) {
      return 'stock must be a non-negative number';
    }
  }

  return null;
};

const getProducts = asyncHandler(async (req, res) => {
  const { search, category, minPrice, maxPrice, sizeShoes, sizeClothes } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
    ];
  }

  if (category && category !== 'Tất cả' && category !== 'Tat ca') {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  const products = await Product.find(query).sort({ featured: -1, createdAt: -1 });
  const categories = await Product.distinct('category');

  res.json({ products, categories });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const payload = normalizeProductPayload(req.body);
  const validationError = validateProductPayload(payload);

  if (validationError) {
    res.status(400);
    throw new Error(validationError);
  }

  const product = await Product.create(payload);
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const payload = normalizeProductPayload(req.body);
  const validationError = validateProductPayload(payload, true);

  if (validationError) {
    res.status(400);
    throw new Error(validationError);
  }

  Object.keys(payload).forEach((key) => {
    if (req.body[key] !== undefined) {
      product[key] = payload[key];
    }
  });

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
