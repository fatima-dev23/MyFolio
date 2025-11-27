const express = require("express");
const { getProjects, createProject, updateProjects } = require("../controllers/projectsController.js");

const router = express.Router();

router.get("/myprojects", getProjects);
router.post("/add-project", createProject);
router.put("/update-project/:id", updateProjects); // add this so update works

module.exports = router;
