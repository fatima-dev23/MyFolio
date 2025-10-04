const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    experience: { type: String, required: true },
    skills: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
})

// Experience Model creation
const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;