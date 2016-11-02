'use strict';

let requestModule = require('request');
let mongoose = require('../dao/db');
let userSchema = require('../model/userSchema');
let userAddressSchema = require('../model/userAddressSchema');
let userFavStationSchema = require('../model/userFavStationSchema');
let Response = require('../model/response');
let settings = require('../config/settings');

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
    createOrUpdateUserAddress: function (request, reply) {
        let response = new Response;
        let UserAddressModel = mongoose.model("UserAddressCollection", userAddressSchema);
        /**
         * temporary fix for address type lowercase 
         * evem after settomg lowercase in schema type is saving as it is
         * start 
         *  */
        if (request.payload.type != null) {
            request.payload.type = request.payload.type.toLowerCase();
        }

        /**
         * end 
         */

        var query = {
                user_id: request.payload.user_id,
                type: request.payload.type
            },
            update = request.payload,
            options = {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            };
        // Find the document
        UserAddressModel.findOneAndUpdate(query, update, options, function (error, result) {
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
        // userAddress.save(function (error, result) {
        //     if (error) {
        //         response.statusCode = 0;
        //         response.message = " Unable to saved latest data into DB";
        //         response.error = error;
        //     } else {
        //         response.statusCode = 1;
        //         response.message = " Saved latest data into DB";
        //         response.data = result;
        //     }

        //     reply(response);
        // });

    },
    createOrUpdateUserFavStation: function (request, reply) {
        let response = new Response;
        let UserFavStaationModel = mongoose.model("UserFavStationCollection", userFavStationSchema);
        let userFavStation = new UserFavStaationModel(request.payload);

        // Find the document
        userFavStation.save(function (error, result) {
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
    //type: request.params.type
    getUserAddressByType: function (request, reply) {
        let response = new Response;
        let AddressModel = mongoose.model("useraddresscollections", userSchema);
        if (null != request.params.type) {
            request.params.type = request.params.type.toLowerCase(); //as address type always saved in lower case
        }

        AddressModel.find({
            user_id: request.params.userId,
            type: request.params.type

        }, function (error, result) {
            if (error) {
                response.statusCode = 0;
                response.message = " Unable to run query, got errors";
                response.error = error;
            } else if (result && result.length > 0) {
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
    // getUserFavourite : function (request, reply) {

    // },
    //getUserAddressByType : function (request, reply) {

    // },
    removeUser: function (request, reply) {
            let response = new Response;
            let UserModel = mongoose.model("UserProfileCollection", userSchema);
            let UserAddressSchema = mongoose.model("UserAddressCollection", userAddressSchema);
            let UserFavStationSchema = mongoose.model("UserFavStationCollection", userFavStationSchema);
            UserModel.findOneAndRemove({
                user_id: request.params.userId
            }, function (error, result) {
                if (error) {
                    response.statusCode = 0;
                    response.message = "user delete - failed to run query";
                    response.error = error;
                } else if (result) {
                    response.statusCode = 1;
                    response.message = " user delete completedd";
                    response.data = result;

                } else {
                    response.statusCode = 0;
                    response.message = " No matching user record found to delete";
                }
                UserAddressSchema.remove({
                    user_id: request.params.userId
                }, function (error, result) {
                    if (error) {
                        response.statusCode = 0;
                        response.message += " ; user address delete - failed to run query";
                        response.error = error;
                    } else if (result) {
                        response.statusCode = 1;
                        response.message += " ; user address delete completedd";
                        response.data = result;

                    } else {
                        response.statusCode = 0;
                        response.message += " ; No matching user address record found to delete";
                    }
                    UserFavStationSchema.remove({
                        user_id: request.params.userId
                    }, function (error, result) {
                        if (error) {
                            response.statusCode = 0;
                            response.message += " ; user favourite station delete - failed to run query";
                            response.error = error;
                        } else if (result) {
                            response.statusCode = 1;
                            response.message += " ; user favourite station delete completedd";
                            response.data = result;

                        } else {
                            response.statusCode = 0;
                            response.message += " No matching user favourite station  record found to delete";
                        }
                        reply(response);
                    });
                });
            })
        } //end of remove user



}