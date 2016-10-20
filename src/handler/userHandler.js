'use strict';


let mongoose = require('../dao/db');
let userSchema = require('../model/userSchema');
let Response = require('../model/response');

// //exports
module.exports = {

    createOrUpdateUser: function (request, reply) {
        let response = new Response;
        let UserModel = mongoose.model("UserProfileCollection", userSchema);
        //let user = new UserModel(request.payload);



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
                response.status = response.failure;
                response.message = " Unable to saved latest data into DB";
            } else {
                response.status = response.success;
                response.message = " Saved latest data into DB";
                response.data = result;
            }

            reply(response);
        });



        // user.save(function (err) {
        //     if (err) {
        //         response.status = response.failure;
        //         response.message = " Unable to saved latest data into DB";
        //     } else {
        //         response.status = response.success;
        //         response.message = " Saved latest data into DB";
        //     }

        //     reply(response);
        // });


    }
}