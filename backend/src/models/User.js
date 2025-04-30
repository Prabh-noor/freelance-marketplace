const mongoose = require("../config/db");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  role: { type: String, enum: ["client", "freelancer", "admin"], required: true },
  profile: {
    bio: String,
    skills: [String], // ["React", "Node.js"]
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    portfolio: [String], // Links to projects
    balance: { type: Number, default: 0.0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
