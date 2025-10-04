const User = require("../models/User");
console.log("User model loaded:", User);
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // fetch all
    res.json(users);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


const updateUsers = async (req, res) => {
  try {
    const { id, full_name, bio, profile_picture, social_links, contact, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params._id,
      { full_name, bio, profile_picture, social_links, contact, email, password },  
       
    );
    if (!updatedUser) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    res.json({ status: "success", user: updatedUser });
    } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
    }
};



module.exports = { getUsers, updateUsers };
