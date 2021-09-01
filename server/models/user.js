const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);