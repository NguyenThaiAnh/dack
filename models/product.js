var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath1: {type: String, required: true},
    imagePath2: {type: String},
    imagePath3: {type: String},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    Oldprice: {type: Number},
    count: {type: Number,required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category',required: true},
    type:  {type: Schema.Types.ObjectId, ref: 'Type',required: true},
    producer : {type: Schema.Types.ObjectId, ref: 'Producer',required: true},
});

module.exports = mongoose.model('Product', schema);