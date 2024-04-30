const moongose = require('mongoose');

const {Schema} = moongose;

const refreshTokenSchema = new Schema({
    token: {type: String, required: true},
    userId: {type: moongose.SchemaTypes.ObjectId, ref: 'User'}
},{timestamps: true})

module.exports = moongose.model('RefreshToken', refreshTokenSchema, 'tokens');