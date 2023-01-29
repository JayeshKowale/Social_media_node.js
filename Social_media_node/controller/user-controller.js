import User from "../models/user";
import bcrpypt from "bcryptjs";

export const getAllUser =async(req,res,next) => {

    let users;
    try{
         users =await User.find();

    }catch(err){
        console.log(err);
    }

     if(!users){
        return res.status(404).json({ message : "NO user found"});
     }
       return res.status(200).json({users});

};
export const signup = async(req,res,next) => {
    const {name,email,password} = req.body;
    let existingUser;
    try{              //check if user is already
           existingUser=await User.findOne({email});
    }catch(err){
    return console.log(err);
    }

    const hashpassword = bcrpypt.hashSync(password);
    if(existingUser){
        return res.status(400).json({message: "User Already Exists! Login Instead"})
    }
    const user = new User({                //add new user

        name,
        email,
        password : hashpassword,
        blogs:[],
    });
     
    try{
        await user.save();
    }catch{
        return console.log(err);
    }
    return res.status(201).json({user});



};

export const login = async(req,res,next)=>{
    const {email,password} =req.body;
    let existingUser;
    try{              //check if user is already
           existingUser= await User.findOne({email});
    }catch(err){
    return console.log(err);
    }

    
    if(!existingUser){
        return res
            .status(404)
                .json({message: "Couldnt find any user by this email"});
    }
     
     const ispasswordCorrect =bcrpypt.compareSync(password,existingUser.password);
        if(!ispasswordCorrect){
            return res.status(400).json({message:"Incorrect Password"})
        }   
         return res.status(200).json({message:"Login Successfull"})
    }


    export const getByUserId = async(req,res,next)=>{

        const userId = req.params.id;
        let userBlogs;
        try{
        userBlogs = await User.findById(userId).populate("blogs");
        }
        catch(err){
            return console.log(err);
        }


        if(!userBlogs){
            return res.status(404).json({message:"No block found"})
        }
        return res.status(200).json({blogs:userBlogs})

    }