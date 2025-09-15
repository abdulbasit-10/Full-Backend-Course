// controllers/user_controller.js
const User = require('../models/user_model.js');

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

    // optional: check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/v0/users/:userId
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params._id; // usually camelCase in route params
    const deletedUser = await User.findByIdAndDelete(_id);

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


//   module.exports = { getAllUser, createNewUser, deleteUser }
