'use strict';
const Json2csvParser = require('json2csv').Parser;
const json2xls = require('json2xls');
const fs = require('fs');
const User = require('./models/users');
const moment = require('moment');
var querystring = require('querystring');
var has = require('has');
const Joi = require('joi');

const pageCount = 30; // DEFAULT


exports.registerUser = {    
    validate: {
        payload : {
            name: Joi.string(),
            email: Joi.string(),
            type: Joi.string().allow(""),
            externalId: Joi.string().allow(""),
            password: Joi.string(),
        }
    },
    cors: {
        origin: ['*']
    },
    handler: (request, h) => {
        var payload = request.payload;
        console.log(payload);           
        return new Promise(resolve => {            
                 
            const newUser = new User({            
                name: payload.name,
                email: payload.email,
                type: payload.type,
                externalId: payload.externalId,
                password: payload.password,
                status: "active",
            });
            // - - -                        
            new Promise((resolve, reject) => {
                var promiseSave = newUser.save();
                promiseSave.then(function (doc) {
                    console.log("Lead saved!");
                    console.log(doc);
                    resolve({
                        status: 'OK',
                        message: 'User created successfully.'
                    });
                })
                .catch(function(err){                    
                    console.log(err.message);
                    resolve({
                        status    : 'NOK',
                        message   : "Error creating user",
                        errorCode : err.code || "n/a"              
                    });
                });
            }).then(function(response){                            
                return resolve(response);
            });                                          
        }); // PROMISE
    }
}
