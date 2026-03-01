import express from 'express';
import { authcheck, login, logout, signup,updateprofile } from '../controllers/auth.controllers.js';
const authrouter = express.Router();

import {protectroute} from '../middlewares/auth.middleware.js'

authrouter.post('/signup',signup);

authrouter.post('/login',login);

authrouter.post('/logout',logout);

authrouter.put("/update-profile",protectroute,updateprofile);

authrouter.get("/check",protectroute,authcheck);


export default authrouter;

