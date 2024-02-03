const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    price: {
        type: Number,
        require: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
        require: true,
    },
    creatAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model('Product', ProductSchema)