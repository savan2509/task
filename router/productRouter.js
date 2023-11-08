const express = require('express');
const { createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const authController = require('../controller/authController')

const router = express.Router();

router.post('/createProduct',createProduct)
router.patch('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

module.exports = router