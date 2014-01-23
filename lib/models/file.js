'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var FileSchema = new Schema({
  name: String,
  path: String,
  created: {
     type: Date,
     default: Date.now
  }
});

/**
 * Validations placeholder
 */
FileSchema.path('path').validate(function (val) {
  return val;
}, 'Value present');


mongoose.model('File', FileSchema);