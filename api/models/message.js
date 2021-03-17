const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    username: { type: String, Required: true },
    text: { type: String }
});

module.exports = mongoose.model("Message", messageSchema);