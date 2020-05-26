'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({   
  name: String,
  type: String,
  externalId: String,
  email: String,
  password:String,

  status: { type : String, default: "active" },  
  created: { type: Date, default: Date.now },    
  lastUpdate: { type: Date, default: Date.now },
});

userSchema.index({ nome: 1, email: 1 });

mongoose.set('useCreateIndex', true);

module.exports = mongoose.model('users', userSchema);