'use strict';


let mongoose = require('../dao/db');
let userSchema = require('../model/userSchema');
let Response = require('../model/response');

// //exports
module.exports = {

    createOrUpdateUser: function (request, reply) {
        let response = new Response;
        let UserModel = mongoose.model("UserProfileCollection", userSchema);

        var query = {
                user_id: request.payload.user_id
            },
            update = request.payload,
            options = {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            };

        // Find the document
        UserModel.findOneAndUpdate(query, update, options, function (error, result) {
            if (error) {
                response.statusCode = 0;
                response.message = " Unable to saved latest data into DB";
                response.error = error;
            } else {
                response.statusCode = 1;
                response.message = " Saved latest data into DB";
                response.data = result;
            }

            reply(response);
        });

    },
    getUser: function (request, reply) {
        let response = new Response;
        let UserModel = mongoose.model("UserProfileCollection", userSchema);
        UserModel.findOne({
            user_id: request.params.userId
        }, function (error, result) {
            if (error) {
                response.statusCode = 0;
                response.message = " Unable to run query, got errors";
                response.error = error;
            } else if (result) {
                response.statusCode = 1;
                response.message = " Able to geta data from DB";
                response.data = result;
            } else {
                response.statusCode = 0;
                response.message = "No matching record found";
            }
            reply(response);
        })
    },
    // getUserFavourite: function (request, reply) {
    //     let response = new Response;
    //     let UserModel = mongoose.model("UserProfileCollection", userSchema);
    //     UserModel.findOne({
    //         user_id: request.params.userId
    //     }, function (error, result) {
    //         if (error) {
    //             response.statusCode = 0;
    //             response.message = " Unable to run query, got errors";
    //             response.error = error;
    //         } else if (result) {
    //             response.statusCode = 1;
    //             response.message = " Able to geta data from DB";
    //             response.data = result.favourite_station;

    //         } else {
    //             response.statusCode = 0;
    //             response.message = "No matching record found";
    //         }
    //         reply(response);
    //     })
    // },
    // getUserAddress: function (request, reply) {

    // },
    // getUserAddressByType: function (request, reply) {

    // },
    removeUser: function (request, reply) {
        let response = new Response;
        let UserModel = mongoose.model("UserProfileCollection", userSchema);
        UserModel.findOneAndRemove({
            user_id: request.params.userId
        }, function (error, result) {
            if (error) {
                response.statusCode = 0;
                response.message = " failed to run query";
                response.error = error;
            } else if (result) {
                response.statusCode = 1;
                response.message = " Able to geta data from DB";
                response.data = result;

            } else {
                response.statusCode = 0;
                response.message = " No matching record found to delete";
            }
            reply(response);
        });
    }


}