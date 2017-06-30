/**
 * Created by truon on 6/27/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
});

module.exports = mongoose.model('Producer', schema);