const express = require("express");
const { getProjects, createProject, updateProjects } = require("../controllers/projectsController.js");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/myprojects", getProjects);
router.post("/add-project", authMiddleware, createProject);
router.patch("/update-project/:id", authMiddleware, updateProjects);
router.put("/update-project/:id", authMiddleware, updateProjects); // add this so update works

module.exports = router;
    