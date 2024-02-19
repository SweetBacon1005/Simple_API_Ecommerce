const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
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
module.exports = mongoose.model('User', UserSchema)