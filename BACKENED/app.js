import express from 'express';

import cookieParser from 'cookie-parser';

import cors from 'cors';

const app = express();

import authroutes from './src/routes/auth.routes.js';

import messageroutes from './src/routes/Message.routes.js';


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.use("/api/v1/auth",authroutes);

app.use('/api/v1/message',messageroutes);

export default app;