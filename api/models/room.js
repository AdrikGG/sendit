const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, Required: true },
    messages: [{ type: String, Required: true }]
});

module.exports = mongoose.model('Room', roomSchema);