const asyncHandler = require('../utils/asyncHandler');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = asyncHandler(async (req, res) => {
  const { items, customerInfo, paymentMethod } = req.body;

  if (!items?.length) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone || !customerInfo?.address) {
    res.status(400);
    throw new Error('Customer information is incomplete');
  }

  if (!['COD', 'BANK_TRANSFER'].includes(paymentMethod)) {
    res.status(400);
    throw new Error('Payment method is invalid');
  }

  const quantityMap = new Map();
  for (const item of items) {
    if (!item.productId || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      res.status(400);
      throw new Error('Each cart item must include a valid productId and quantity');
    }

    quantityMap.set(item.productId, (quantityMap.get(item.productId) || 0) + item.quantity);
  }

  const productIds = Array.from(quantityMap.keys());
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = new Map(products.map((product) => [product._id.toString(), product]));

  const normalizedItems = [];
  let totalQuantity = 0;
  let totalAmount = 0;

  for (const [productId, quantity] of quantityMap.entries()) {
    const product = productMap.get(productId);

    if (!product) {
      res.status(400);
      throw new Error('One of the selected products does not exist');
    }

    if (product.stock < quantity) {
      res.status(400);
      throw new Error(`Product "${product.name}" only has ${product.stock} items left`);
    }
  }

  for (const item of items) {
    const product = productMap.get(item.productId);

    normalizedItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
      size: typeof item.size === 'string' ? item.size.trim() : '',
      color: typeof item.color === 'string' ? item.color.trim() : '',
    });

    totalQuantity += item.quantity;
    totalAmount += product.price * item.quantity;
  }

  for (const [productId, quantity] of quantityMap.entries()) {
    const product = productMap.get(productId);
    product.stock -= quantity;
    await product.save();
  }

  const order = await Order.create({
    user: req.user._id,
    items: normalizedItems,
    customerInfo,
    paymentMethod,
    paymentStatus: paymentMethod === 'BANK_TRANSFER' ? 'pending' : 'pending',
    totalQuantity,
    totalAmount,
  });

  const populatedOrder = await Order.findById(order._id).populate('user', 'name email');

  res.status(201).json({
    message: 'Order placed successfully',
    order: populatedOrder,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (orderStatus) {
    order.orderStatus = orderStatus;
  }

  if (paymentStatus) {
    order.paymentStatus = paymentStatus;
  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

const getOrderSummary = asyncHandler(async (req, res) => {
  const [orders, productCount] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email'),
    Product.countDocuments(),
  ]);

  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  res.json({
    stats: {
      totalRevenue: revenue[0]?.totalRevenue || 0,
      totalOrders: revenue[0]?.totalOrders || 0,
      totalProducts: productCount,
    },
    recentOrders: orders,
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderSummary,
};
