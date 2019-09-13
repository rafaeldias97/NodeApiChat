const mongoose = require('mongoose');
const { Schema } = mongoose;

const Person = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    sexo: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Person', Person);