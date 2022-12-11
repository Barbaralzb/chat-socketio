const mongoose = require('mongoose');
const Schema = mongoose.Schema

const messageSchema = mongoose.Schema({
    user: {
        type: Schema.ObjectId,
        required: [true, 'user required'],
        ref: 'User'
    },
    pseudo: { type: String, required: true },
    text: { type: String, required: true },
    creationdate: {
        type: Date, default: Date.now
    },
});

module.exports = mongoose.model('Message', messageSchema);