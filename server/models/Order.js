const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        amount: {
            type: Number,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            default: 'Not processed',
            enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        },
        phoneNumber: {
            type: String,
            require: true,
        },
        total: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Order', Order)