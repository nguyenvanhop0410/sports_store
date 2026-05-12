const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

const allowedRoles = new Set(['admin', 'user']);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(400);
    throw new Error('Email already registered');
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    message: 'Register successful',
    token: generateToken(user._id),
    user: sanitizeUser(user),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email?.toLowerCase() });
  if (!user || !(await user.matchPassword(password || ''))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    message: 'Login successful',
    token: generateToken(user._id),
    user: sanitizeUser(user),
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!allowedRoles.has(role)) {
    res.status(400);
    throw new Error('Role must be admin or user');
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.role === 'admin' && role !== 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin' });

    if (adminCount <= 1) {
      res.status(400);
      throw new Error('At least one admin account must remain active');
    }
  }

  user.role = role;
  const updatedUser = await user.save();

  res.json({
    message: 'User role updated',
    user: sanitizeUser(updatedUser),
  });
});

module.exports = { registerUser, loginUser, getMe, getUsers, updateUserRole };
