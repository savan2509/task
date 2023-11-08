const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name :{
        type: String,
        unique: true
    },
    userID: {
        type : String ,
      }
})

module.exports = mongoose.model('product', product)