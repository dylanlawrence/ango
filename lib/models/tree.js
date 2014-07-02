'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var TreeSchema = new Schema({
	id:Number,
	name:String,
	label: String,
	items : Array
});

mongoose.model('Tree', TreeSchema);