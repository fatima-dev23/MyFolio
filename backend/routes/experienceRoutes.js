const express = require("express")
const {getExperience, addExperience} = require("../controllers/experienceController.js")
const authMiddleware = require("../middleware/authMiddleware.js")

const router = express.Router()

router.get("/myexperience", getExperience)
router.post("/addexperience", authMiddleware, addExperience)

module.exports = router