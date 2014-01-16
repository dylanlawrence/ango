'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var WorkSchema = new Schema({
  title: String,
  body: String
});


mongoose.model('Work', WorkSchema);