const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    position: { type: String, required: true },
    employer:{ type: String, required: true},
    startDate: { type: String, required: true }, // e.g., "Jan 2022"
    endDate: { type: String },
    description : {type : String},
    skills: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
})

// Experience Model creation
const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;