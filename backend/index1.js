const express =require("express")
const app = express();
const fs = require("fs")
const PORT = 8000;
const users =require("./MOCK_DATA.json")
const mongoose = require("mongoose");
// const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dotenv = require("dotenv");
dotenv.config();

// DATABASE CONNECTION
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  //  process.exit(1);
  }
};
connectDB();


// Middleware / Plugin

app.use(express.json()); // <-- ye JSON parse karega
app.use(express.urlencoded({ extended: true })); 


// Routes

app.get('/', (req, res)=>{
    res.send("Server working perfectly fine as hell")
})

// User Middleware Route
app.use("/api/user",userRoutes)
// Project Middleware Route
app.use("/api/project",projectRoutes)

// app.get('/users', (req, res)=>{
//     const html = `<ul>
//         ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
//     </ul>`;
//     res.send(html); 
// })

// REST API

// app.get('/api/users', (req, res)=>{
//     // TODO: Get all users
//     const html = `<ul>
//         ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
//     </ul>`;
//     res.send(html); 
// })

// Get all portfolio info
// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users); // HTML nhi, sirf JSON
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });



// app.get("/api/users/:id", (req, res)=>{
//     // TODO: Get a user with id

//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id)

//     return res.json(user);
// })


// app.get("/api/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ status: "fail", message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });




// app.post('/api/users', (req, res)=>{
//     // TODO: Create New User

//     const body = req.body;
//     users.push({ id: users.length+1, ...body});
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
//         res.json({status:"success", id:users.length+1}); 
//     })
    
// })

// Create new user
// app.post("/api/users", async (req, res) => {
//   try {
//     console.log("req",req);
    
//     const { full_name, bio, contact, password, email, isAdmin } = req.body;
//     const newUser = new User({ full_name, bio, contact, password, email, isAdmin });
//     await newUser.save();
//     res.status(201).json({ status: "success", user: newUser });
//   } catch (err) {
//     res.status(400).json({ status: "error", message: err.message });
//   }
// });

// Update user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ status: "fail", message: "User not found" });
    res.json({ status: "success", user: updatedUser });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// app.delete('/api/users/:id', (req, res)=>{
//     // TODO: Delete User with ID
//     const id = Number(req.params.id);
//     const index = users.findIndex(user => user.id === id);

//     if (index === -1) {
//         console.log("Error");
//         return res.status(404).json({ status: "fail", message: "User not found" });
//     }
//     users.splice(index, 1);

//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err, data)=>{
//         if (err) {
//             return res.status(500).json({ status: "error", message: "Failed to write file" });
//         }

//         res.json({status:"success", id}); 
//     })
// })

// Delete user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ status: "fail", message: "User not found" });
    res.json({ status: "success", user: deletedUser });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, ()=> console.log(`Server runnning on http://localhost:${PORT}`))