const express = require('express');
const { createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const authController = require('../controller/authController')

const router = express.Router();

router.post('/createProduct',authController.protect,createProduct)
router.patch('/:productId', updateProduct)
router.delete('/:productId',authController.protect, deleteProduct)

module.exports = router