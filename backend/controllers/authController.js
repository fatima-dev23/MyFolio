const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_KEY,
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

const login =async(req,res)=>{
  const {email, password} = req.body

  if(!email || !password){
    return res.status(401).json({message: "Something is missing!", success: false})
  }
  
  try{
    const isAUser = await User.findOne({email})
    if(isAUser === null){
      return res.status(401).json({message: "Invalid Credentials", success: false})
    }
    console.log("user id",isAUser.id)
    console.log("user _id",isAUser._id)
    const matchPassword = await bcrypt.compare(password, isAUser.password)
    
    if(!matchPassword){
      return res.status(401).json({message: "Invalid Credentials", success: false})
    }
    const token = jwt.sign({id: isAUser.id}, process.env.JWT_KEY, {expiresIn: "1d"})
    console.log(":::::THE TOKEN:::::", token)
    return res.status(200).json({message: "Logged in successfully", data:{user:{id: isAUser._id, email:isAUser.email}, token}, success:true})
    
  }
  catch(err){
    return res.status(500).json({message: "Internal Server Error", error: err.message})
  }
  
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { login, getMe };
