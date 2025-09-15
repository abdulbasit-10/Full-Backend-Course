const express = require("express")
const router = express. Router()
const {getAllUser, createnewuser} = require('../controllers/user_controller.js')

router.get('/getAllUser', getAllUser)
router.post('/postuser', createnewuser)
module.exports = router;
