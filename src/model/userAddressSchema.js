'use strict';

var mongoose = require('../dao/db');


let schema = new mongoose.Schema({
    user_id: String,
    lon: Number,
    lat: Number,
    loc: [Number, Number],
    type: String,
    address_str: String
});

module.exports = schema;