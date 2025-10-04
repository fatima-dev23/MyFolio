const Projects = require("../models/Projects.js");
console.log("Projects model loaded:", Projects);
const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find(); // fetch all
    res.json(projects);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


const createProject = async (req, res) => {
 try {
    console.log("req.body", req.body);

    const { title, description, tech, links, image } = req.body;
    const newProject = new Projects({ title, description, tech, links, image });
    await newProject.save();
    res.status(201).json({ status: "success", project: newProject });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};


const updateProjects = async (req, res) => {
  try {
    const { title, description, tech, links, image } = req.body;
    const updatedProjects = await User.findByIdAndUpdate(
      req.params._id,
      { title, description, tech, links, image },  
       
    );
    if (!updatedProjects) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    res.json({ status: "success", user: updatedProjects });
    } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
    }
};



module.exports = { getProjects, createProject, updateProjects };
