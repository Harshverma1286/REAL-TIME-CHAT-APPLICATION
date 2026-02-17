import express from 'express';

import 'dotenv/config';

import app from './app.js';



import connectdb from './src/db/db.js';

connectdb().then(
()=>{
    app.on('error',(error)=>{
        console.log("err",error);
        throw error;
    });

    app.listen(process.env.PORT || 3000,function(){
        console.log(`THE APP IS SUCCESSFULLY WORKING ON PORT ${process.env.PORT}`)
    })
}
).catch(
    (err)=>{
        console.log("err",err);
    }
)
