const express = require('express');
const authController = require('../controller/authController');
const {createStore, findStore} = require('../controller/storeController');
const path = require('path');
const router = express.Router();



router.post('/createStore',createStore )
router.post('/findStore',findStore)



module.exports = router 