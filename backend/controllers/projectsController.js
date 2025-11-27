const Projects = require("../models/Projects.js");
console.log("Projects model loaded:", Projects);

const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json({ status: "success", projects });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    console.log("📩 req.body:", req.body);

    const { title, description, tech, links, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({ status: "error", message: "title and description required" });
    }

    const newProject = new Projects({ title, description, tech, links, image });
    await newProject.save();

    res.status(201).json({ status: "success", project: newProject });
  } catch (err) {
    console.error("❌ createProject error:", err.message);
    res.status(400).json({ status: "error", message: err.message });
  }
};

const updateProjects = async (req, res) => {
  try {
    const { title, description, tech, links, image } = req.body;

    const updatedProjects = await Projects.findByIdAndUpdate(
      req.params.id,
      { title, description, tech, links, image },
      { new: true, runValidators: true }
    );

    if (!updatedProjects) {
      return res.status(404).json({ status: "fail", message: "Project not found" });
    }

    res.json({ status: "success", project: updatedProjects });
  } catch (err) {
    console.error("❌ updateProjects error:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = { getProjects, createProject, updateProjects };
// Update project by ID

// app.put("/api/projects/:id", async (req, res) => {
//   try {
//     const updatedProject = await Projects.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }



