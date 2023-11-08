const express = require('express');
const vendorController = require('../controller/vendorController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/createVendor', authController.protect,authController.restrictTo('admin'), vendorController.createVendor);

module.exports = router;

