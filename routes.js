'use strict'
const Users = require('./controllers/users');

module.exports = [

    
    { method: 'POST',    path: '/registerUser',                       options: Users.registerUser },    
]