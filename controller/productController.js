const product = require('../model/productModel')
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const authController = require('./authController')


const createProduct = catchAsync(async(req, res, next) => {
    const userID = req.User._id;
    const value ={name:req.body.name, userID }
    const newProduct = await product.create(value);

    return res.status(200).json({
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
    return res.status(200).json({
        status:"success",
        data:updateProduct
    })
})

const deleteProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.productId;
    if (!productId) {
      return next(new AppError('productId ID not provided'));}
    const deleteProduct = await product.findOneAndDelete({ _id: productId, userID: req.User._id });
    if (!deleteProduct) {
      return next(new AppError('product not found')); }
   return  res.status(200).json({
      status: 'success',
    });
  });
module.exports = {createProduct,updateProduct,deleteProduct}