const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: [String], required: true },
    links: {
    github: { type: String, default: ""},
    live: { type: String, default: ""},
    figma: { type: String, default: "" }
  },
    image: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
})

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;