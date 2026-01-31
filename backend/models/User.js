const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // 🔐 AUTH
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },

  // 👩‍💻 PORTFOLIO
  profile: {
    full_name: { type: String, required: true },
    bio: { type: String, required: true },
    profile_picture: { type: String },
    social_links: { type: Map, of: String },
    contact: { type: String }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
