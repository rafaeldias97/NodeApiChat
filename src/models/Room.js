const mongoose = require('mongoose');
const { Schema } = mongoose;

const Room = new Schema({
    idUser: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    linkVideo: {
        type: String,
        default: null
    },
    like: {
        type: Number,
        required: true
    },
    deslike: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Room', Room);