import jwt from 'jsonwebtoken';

import usermodel from '../models/user.models.js';

export const protectroute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"unauthorized - No token provided"});
        }

        const decoded_id = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded_id){
            return res.status(401).json({message:"unauthorized - Invalid token"});
        }

        const user = await usermodel.findById(decoded_id.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectroute middleware:",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}