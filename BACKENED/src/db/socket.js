import {Server} from 'socket.io';

import http from 'http';

import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

export function getreciversocketid(userid){
    return usersocketmap[userid];
}; 

const usersocketmap = {};



io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);

    const userid = socket.handshake.query.userid;

    if(userid) usersocketmap[userid] = socket.id;

    io.emit("getonlineusers",Object.keys(usersocketmap));

    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id);
        delete usersocketmap[userid];
        io.emit("getonlineusers",Object.keys(usersocketmap));
    })
})

export {io,app,server};