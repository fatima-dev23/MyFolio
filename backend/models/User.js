// Schema and model definition for User

// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    bio: { type: String, required: false },
    profile_picture: { type: String, required: false },
    social_links: { type: Map, of: String, required: false },
    contact: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

// User Model creation
const User = mongoose.model("User", userSchema);
module.exports = User;