const mongoose = require("mongoose");
const { Schema } = mongoose;

const userCredentialsSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UserCredential', userCredentialsSchema);