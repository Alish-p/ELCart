const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/User');
const { generateToken } = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = new UserModel({ ...req.body });
  const { _id, name, email, isAdmin } = await user.save();

  res.status(201).json({
    _id,
    name,
    email,
    isAdmin,
    token: generateToken(_id),
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const newUser = { ...req.body };
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    newUser['password'] = await bcrypt.hash(req.body.password, salt);
  }

  console.log(newUser);
  const user = await UserModel.findByIdAndUpdate(req.user._id, newUser, {
    runValidators: true,
    new: true,
  });
  console.log(user);

  const { _id, name, email, isAdmin } = user;

  res.status(201).json({
    _id,
    name,
    email,
    isAdmin,
    token: generateToken(_id),
  });
});
const updateUserByID = asyncHandler(async (req, res) => {
  const newUser = { ...req.body };

  const user = await UserModel.findByIdAndUpdate(req.params.id, newUser, {
    runValidators: true,
    new: true,
  });

  const { _id, name, email, isAdmin } = user;

  res.status(201).json({
    _id,
    name,
    email,
    isAdmin,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  const matched = user ? await user.matchPassword(req.body.password) : false;
  console.log(matched);

  if (user && matched) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid Credentials' });
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const fetchUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({}, { password: 0 });
  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  res.status(200).json(user);
});

const getUserByID = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: 'User not exist' });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  fetchUsers,
  deleteUser,
  getUserByID,
  updateUserByID,
};
