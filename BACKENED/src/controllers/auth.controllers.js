import { generatetoken } from '../db/utils.js';
import usermodel from '../models/user.models.js'

import bcrypt from 'bcrypt';
const signup = async(req,res)=>{
    try {
        const {fullname,email,password} = req.body;

        if(!fullname || !email || !password){
            return res.status(404).json({message:"something is missing kindly provide all the details"});
        }

        if(password.length<6){
            return res.status(400).json({message:"please enter the password more than 6 character"});
        }

        const user = await usermodel.findOne({email});

        if(user){
            return res.status(400).json({message:"user already exist"});
        }

        const salt = await bcrypt.genSalt(10);

        const hashedpassword = await bcrypt.hash(password,salt);


        const newuser = new user({
            fullname,
            email,
            password:hashedpassword
        })

        if(newuser){
            generatetoken(newuser._id,res);
            await newuser.save();

            res.status(201).json({
                _id:newuser._id,
                fullname:newuser.fullname,
                email:newuser.email,
                profilepic:newuser.profilepic,
            })
        }
        else{
            return res.status(400).json({message:"invalid user data"});
        }
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(404).json({message:"something is missing kindly provide all the details"});
        }

        const user = await usermodel.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }


        const ispasswordcorrect = await bcrypt.compare(password,user.password);

        if(!ispasswordcorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        generatetoken(user._id,res);


        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilepic:user.profilepic
        })
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

const updateprofile = async(req,res)=>{

}

export {signup,login,logout,updateprofile};