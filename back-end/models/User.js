const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true },
    messages: [
    { type: Schema.ObjectId, ref: 'Message', default: null }
  ],
});

module.exports = mongoose.model('User', userSchema);