const express = require('express');
const { signup, login,logout } = require('../controller/authController');
const authController = require('../controller/authController')

const router  = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout',authController.protect, logout);


module.exports = router