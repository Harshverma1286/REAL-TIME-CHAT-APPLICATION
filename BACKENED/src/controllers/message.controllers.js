import cloudinary from '../db/cloudinary.js';
import { getreciversocketid,io } from '../db/socket.js';
import messagemodel from '../models/message.models.js';

import usermodel from '../models/user.models.js'

const getuser = async(req,res)=>{
    try {
        const loggeduserid = req.user._id;

        const filteruser = await usermodel.find({_id:{$ne:loggeduserid}}).select("-password");

        res.status(200).json(filteruser);
    } catch (error) {
        console.error("error in getuser controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

const getmessages = async(req,res)=>{
    try {
        const {id:usertochatid} = req.params;

        const myid = req.user._id;

        const messages = await messagemodel.find({
            $or:[
                {senderid:myid,reciverid:usertochatid},
                {senderid:usertochatid,reciverid:myid}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("error in getmessages controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

const sendmessage = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:reciverid} = req.params;
        const senderid = req.user._id;

        let imageurl;

        if(imageurl){
            const uploadrespnse = await cloudinary.uploader.upload(image);
            imageurl = uploadrespnse.secure_url;
        }

        const newmessage = new messagemodel({
            senderid,
            reciverid,
            text,
            image:imageurl
        });

        await newmessage.save();

        //socket io work

        const reciversocketid = getreciversocketid(reciverid);

        if(reciversocketid){
            io.to(reciversocketid).emit("newmessage",newmessage);
        }

        res.status(201).json(newmessage);

    } catch (error) {
        console.error("error in sendmessage controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export {getuser,getmessages,sendmessage};