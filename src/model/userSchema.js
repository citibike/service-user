'use strict';

var mongoose = require('../dao/db');

let schema = new mongoose.Schema({

    first_name: String,
    last_name: String,
    user_id: String,
    address: [{
        lon: Number,
        lat: Number,
        loc: [Number, Number],
        type: String,
        address_str: String
    }],
    favourite_station: [

    ]
});




module.exports = schema;