const mongoose = require("../config/db");

const JobSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true }, // change - range of budget / can be a string too
  category: { type: String, required: true },
  skillsRequired: [String], // ["JavaScript", "MongoDB"]
  status: { type: String, enum: ["open", "in-progress", "completed", "cancelled"], default: "open" },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }], // Linked bids
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", JobSchema);
