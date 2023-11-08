const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({
    storeId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    pin: {
        type: String
    },
    geolocation: {
        type: { type: String, enum: ["Point"] },
        coordinates: { type: [Number] },
    }
});

storeSchema.index({ geolocation: "2dsphere" });
module.exports = mongoose.model('store', storeSchema);