const mongoose = require('mongoose');

const Vendor = new mongoose.Schema({
    vendorID : {
        type:String,
    },
    name: {
        type : String
    },
    type : {
        String
    }
})


module.exports = mongoose.model('Vendor', Vendor)