const express = require("express");
const { getUsers, updateUsers } = require("../controllers/userController.js");

const router = express.Router();

router.get("/get-user", getUsers)

router.put("/update-profile", updateUsers)

module.exports = router;