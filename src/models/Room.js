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
    imageURL: {
        type: String,
        default: null
    },
    linkVideo: {
        type: String,
        default: null
    },
    like: {
        type: Array,
        default: []
    },
    deslike: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Room', Room);