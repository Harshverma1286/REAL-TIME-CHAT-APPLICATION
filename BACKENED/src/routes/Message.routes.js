import express from 'express';
import { protectroute } from '../middlewares/auth.middleware.js';
import { getuser ,getmessages, sendmessage} from '../controllers/message.controllers.js';

const messagerouter = express.Router();


messagerouter.get("/user",protectroute,getuser);

messagerouter.get("/:id",protectroute,getmessages);

messagerouter.post("/message/:id",protectroute,sendmessage);





export default messagerouter;