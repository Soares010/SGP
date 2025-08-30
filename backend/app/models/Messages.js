const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: String,
  createdAt: { type: Date, default: Date.now },
  meta: Object, // opcional: attachments, type (comment/system), etc
});

module.exports = mongoose.model("Messages", MessageSchema);
