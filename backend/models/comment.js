const moongose = require('mongoose');

const {Schema} = moongose;

const userSchema = new Schema({
    content: {type: String, required: true},
    blog: {type: moongose.SchemaTypes.ObjectId, ref: 'blogs'},
    author: {type: moongose.SchemaTypes.ObjectId, ref: 'users'},
    
},{timestamps: true})

module.exports = moongose.model('Comment', userSchema, 'comments');