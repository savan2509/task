const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type : String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type : String
    },
     role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
    },
  
})
user.index ({location:"2dsphere"});

module.exports = mongoose.model('user', user)