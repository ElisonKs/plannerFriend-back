'use strict';
const mongoose = require('mongoose');
const env = require('env2')('./env.json');
const dbUrl = (process.env.ENVIRONMENT)?'mongodb://localhost:27017/planner':'mongodb://localhost:27017/planner';
// GLOBAL DB CONNECTION
var dbConn = null;

exports.getDBConnection = function(){
  if(!dbConn) {    
    dbConn = mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
      if (err) {
        console.error('DB NOT Connected. Please check if DB Server is connected!');
        throw err;        
      } else {
        console.log('DB Connected!');
      }
    });    
  }
  return dbConn;
}