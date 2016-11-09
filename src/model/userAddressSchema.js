'use strict';

var mongoose = require('../dao/db');

let schema = new mongoose.Schema({
    user_id: String,
    lon: Number,
    lat: Number,
    loc: {
        type: [Number],
        index: '2dsphere'
    },
    type: {
        type: String,
        lowercase: true,
        trim: true
    },
    address_str: String
});

module.exports = schema;