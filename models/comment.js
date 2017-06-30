/**
 * Created by truon on 6/25/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema
({
    name: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'USer'},
    content: {type: String, required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product',required: true},
});

module.exports = mongoose.model('Comment', schema);