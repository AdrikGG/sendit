const mongoose = require('mongoose');
const message = require('./message').schema;

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, Required: true },
    messages: [{ type: message }]
});

module.exports = mongoose.model('Room', roomSchema);