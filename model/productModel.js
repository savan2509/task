const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name :{
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('product', product)