const catchAsync = require("../utils/catchAsync");
const User = require('../model/userModel');
const AppError = require("../utils/appError");
const Store = require('../model/storeModel')
const bodyParser = require('body-parser')

const createStore = catchAsync(async(req, res, next) => {
    const newStore = await Store.create({
        name: req.body.name,
        email:req.body.email,
        storeId:req.body.storeId,
        address:req.body.address,
        geolocation: {
            type: 'Point',
            coordinates: [req.body.longitude,req.body.latitude],
            spherical:true
        },
    })
    return res.status(200).json({
        status:'success',
        data:{newStore}
    })
})



const findStore = catchAsync(async (req, res, next) => {
    const longitude = parseFloat(req.body.longitude);
        const latitude = parseFloat(req.body.latitude);
  
    const radius  = 1500000 / 3963.2 ;
  
    const store = await Store.find({
        geolocation: { $geoWithin: { $centerSphere: [[longitude, latitude],radius] } }
    });
  
    res.status(200).json({
      status: 'success',
      results: store.length,
      data: {
        data: store
      }
    });
});
module.exports = {createStore,findStore}