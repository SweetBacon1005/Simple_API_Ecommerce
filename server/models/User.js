const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        userRole: {
            type: String,
            require: true,
        },
        history: {
            type: Array,
            default: []
        }
    }
)
module.exports = mongoose.model('User', UserSchema)