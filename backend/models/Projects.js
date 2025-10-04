const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: [String], required: true },
    links: {
    github: { type: String },
    live: { type: String },
    figma: { type: String }
  },
    image: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
})

const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;