'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Bcrypt = require('bcryptjs');
const HapiAuthBasic = require('hapi-auth-basic');
const Routes = require('./routes')
const Database = require('./controllers/helpers/database');
const dotenv = require("dotenv-safe");
var jwt = require('jsonwebtoken');
// SERVER SETTINGS
const server = Hapi.server({
    port: 6190,
    host: 'localhost'
});
// USER AUTHENTICATION - ADMIN AREA ONLY
const users = {
    
    
};
// USER VALIDATION
const validate = async (request, username, password) => {

    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
};
// SERVER INIT
const init = async () => {
    await server.register([
        Inert,
        Vision,
        HapiAuthBasic
    ]);

  
    // SERVER AUTH - WHEN NECESSARY
    server.auth.strategy('simple', 'basic', { validate });    
    // ROUTES
    server.route(Routes);
    // SERVER START
    await server.start();    
    return server;
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    //process.exit(1);
    // TODO: SEND MAIL
});

init().then(server => {
        console.log(`Planner Server running at: ${server.info.uri}`);
        // Once started, connect to Mongo through Mongoose
        console.info("Connecting to database...");
        Database.getDBConnection();
      
        
    })
    .catch(error => {
        console.log(error);
});
