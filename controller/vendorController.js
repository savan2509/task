const catchAsync = require("../utils/catchAsync");
const Vendor = require('../model/vendorModel')
const jwt = require('jsonwebtoken');
  
const createVendor = catchAsync(async (req, res, next) => {
  console.log(111);
    const newVendor = await Vendor.create({
      name: req.body.name,
    });
    const token = jwt.sign({ id: newVendor._id }, process.env.jwt_SECRET);
    return res.status(201).json({
      status: 'success',
      token,
      data: newVendor,
    });
  });
  

module.exports = {createVendor}
