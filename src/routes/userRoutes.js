'use strict';

const userHandler = require('../handler/userHandler');
let userSchema = require('../model/userSchema');
const Joi = require('joi');


module.exports = function (server, options) {

    server.route({
        method: 'post',
        path: '/v1/user',
        config: {
            handler: userHandler.createOrUpdateUser,
            description: 'Create a new usser if already existed then update',
            notes: 'insert or upsert',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    first_name: Joi.string(),
                    last_name: Joi.string(),
                    user_id: Joi.string(),
                    address: Joi.array({
                        lon: Joi.number(),
                        lat: Joi.number(),
                        type: Joi.string(),
                        address_str: Joi.string(),
                        loc: Joi.array()
                    }),
                    favourite_station: Joi.array({

                    })
                })
            }
        }
    });

    server.route({
        method: 'put',
        path: '/v1/user',
        config: {
            handler: userHandler.createOrUpdateUser,
            description: 'update  usser if already exist',
            notes: 'given user id should be present in db',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    first_name: Joi.string(),
                    last_name: Joi.string(),
                    user_id: Joi.string(),
                    address: Joi.array({
                        lon: Joi.number(),
                        lat: Joi.number(),
                        type: Joi.string(),
                        address_str: Joi.string(),
                        loc: Joi.array()
                    }),
                    favourite_station: Joi.array({

                    })
                })
            }
        }
    });
    //get user 
    server.route({
        method: 'get',
        path: '/v1/user/{userId}',
        config: {
            handler: userHandler.getUser,
            description: 'get  usser if already exist by user id',
            notes: 'given user id should be present in db',
            tags: ['api'],
            validate: {
                params: {
                    userId: Joi.string()
                }

            }
        }
    });
    //user favourite_stations
    // server.route({
    //     method: 'get',
    //     path: '/v1/user/{userId}/favourite',
    //     config: {
    //         handler: userHandler.getUserFavourite,
    //         description: 'get  usser if already exist by user id',
    //         notes: 'given user id should be present in db',
    //         tags: ['api'],
    //         validate: {
    //             params: {
    //                 userId: Joi.string()
    //             }

    //         }
    //     }
    // });
    //user favourite_stations
    // server.route({
    //     method: 'get',
    //     path: '/v1/user/{userId}/address',
    //     config: {
    //         handler: userHandler.getUserAddress,
    //         description: 'get  usser if already exist by user id',
    //         notes: 'given user id should be present in db',
    //         tags: ['api'],
    //         validate: {
    //             params: {
    //                 userId: Joi.string()
    //             }

    //         }
    //     }
    // });
    //user favourite_stations
    // server.route({
    //     method: 'get',
    //     path: '/v1/user/{userId}/address/{type}',
    //     config: {
    //         handler: userHandler.getUserAddressByType,
    //         description: 'get  usser if already exist by user id',
    //         notes: 'given user id should be present in db',
    //         tags: ['api'],
    //         validate: {
    //             params: {
    //                 userId: Joi.string()
    //             }

    //         }
    //     }
    // });
    //delete user 
    server.route({
        method: 'delete',
        path: '/v1/user/{userId}',
        config: {
            handler: userHandler.removeUser,
            description: 'remove usser if already exist',
            notes: 'given user id should be present in db',
            tags: ['api'],
            validate: {
                params: {
                    userId: Joi.string()
                }

            }
        }
    });





}