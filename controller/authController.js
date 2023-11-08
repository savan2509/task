const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require('../model/userModel');
const  {promisify} = require('util');  
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const crypto = require('crypto'); 

 

const signup = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
 
  const hashedPassword = await bcrypt.hash(password, 10); 

  const newUser = await User.create({name,email,password: hashedPassword,role});
  const token = jwt.sign({ id: newUser._id }, process.env.jwt_SECRET);

  
   return res.status(201).json({ 
      status: 'success',
      data: [{token},{newUser}]
    });        
  }
);


const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({ email:email });
  if (!user) {
    return next(new AppError('Email not found'));
  }
 
  const matchPassword =await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return next(new AppError('Invalid Password', 400));
  } 
 
  const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET);

  return res.status(200).json({
    status: "success",
    token,
    data: user
  });
});

const protect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access', 401));
    }
  
      const verify = await promisify(jwt.verify)(token, process.env.jwt_SECRET);
      const currentUser = await User.findById(verify.id);
      if (!currentUser) {
        return next(new AppError('Invalid user ID provided', 401));
      }
      req.User = currentUser;
      next();
 
  });
  
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.User.role)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        }
        next();
    };
};


const logout = (req, res) => {
  console.log(12356);
    res.cookie('jwt', 'logout', {
    });

     
  return  res.status(200).json({ 
        status: 'success' 
    });
  };

module.exports = {signup,login,protect,logout,restrictTo}