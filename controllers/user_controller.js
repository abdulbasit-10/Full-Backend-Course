// controllers/user_controller.js
const User = require('../models/user_model.js');
const bcrypt = require('bcryptjs');

// GET /api/v0/users/getAllUser
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // don't send passwords
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/v0/users/postuser
exports.createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/v0/users/:userId
// Updates user's username, email and/or password
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    // Build update object only with provided fields
    const update = {};
    if (username) update.username = username;
    if (email) update.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided to update' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/v0/users/:userId
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; // expect route param :userId
    const deletedUser = await User.findByIdAndDelete(userId).select('-password');

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = { getAllUser, createNewUser, updateUser, deleteUser };
