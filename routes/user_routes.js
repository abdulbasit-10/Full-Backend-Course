// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const { getAllUser, createNewUser, deleteUser } = require('../controllers/user_controller');

router.get('/getAllUser', getAllUser);
router.post('/postuser', createNewUser);
router.delete('/deleteuser/:UserId', deleteUser);
module.exports = router;
