const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  begin: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  days: String,
  budget: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  documents: String,
  observations: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  invitations: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["Pendente", " Aceite", " Recusado"],
        default: "Pendente",
      },
    },
  ],
});

module.exports = mongoose.model("Projects", ProjectSchema);
