const Experience = require("../models/Experience.js")

console.log("Experience Model Loaded", Experience)

const getExperience = async(req, res)=>{
    try{
        // .sort({ createdAt: -1 }) ensures your latest job shows up first
        const experience = await Experience.find().sort({ createdAt: -1 });
        // if(!experience || experience.length === 0){
        //     return res.status(404).json({message: "No experience", success: false})
        // }
        return res.status(200).json({message: "Got Experience Successfully", experience, success: true})
    } catch(error){
        return res.status(500).json({message: "Internal Server Error", error: error.message, success: false})
    }
}

const addExperience = async(req, res)=>{
    const {position, employer, startDate, endDate, description, skills} = req.body

    if(!position || !employer || !startDate || !skills){
        return res.status(401).json({message: "Required fields are empty", success: false})
    }

    try{
        const newExperience = await Experience.create({position, employer, skills:Array.isArray(skills) ? skills : [skills], startDate, endDate: endDate || "Present", description})
        return res.status(201).json({message:"Experience Added Successfully", data: newExperience, success: true})

    }catch(error){
        return res.status(500).json({message : "Internal Server Error", error: error.message, success: false})
    }
}

module.exports= {getExperience, addExperience}