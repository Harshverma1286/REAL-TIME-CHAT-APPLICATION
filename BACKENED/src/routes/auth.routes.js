import express from 'express';
import { login, logout, signup,updateprofile } from '../controllers/auth.controllers';
const authrouter = express.Router();

import {protectroute} from '../middlewares/auth.middleware.js'

authrouter.post('/signup',signup);

authrouter.post('login',login);

authrouter.post('logout',logout);

authrouter.put("/update-profile",protectroute,updateprofile)


export default authrouter;

