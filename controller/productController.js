const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const product = require('../model/productModel')


const createProduct = catchAsync(async(req, res, next) => {
    const newProduct = await product.create(req.body)
    res.status(200).json({
        status:"success",
        data:newProduct
    })
})

const updateProduct = catchAsync(async(req, res, next) => {
    const productId = req.params.productId
    if(!productId) {
        return next (new AppError ('please provide valid productId'))
    }
    const updateProduct = await product.findByIdAndUpdate(productId, req.body, ({new:true}))
    res.status(200).json({
        status:"success",
        data:updateProduct
    })
})
const deleteProduct = catchAsync(async(req, res, next) => {
    await product.findByIdAndDelete(req.params.productId)
    res.status(200).json({
        status:"success"
    })
})

module.exports = {createProduct,updateProduct,deleteProduct}