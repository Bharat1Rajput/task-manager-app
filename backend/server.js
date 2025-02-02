const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()


const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => 

         app.listen(PORT, ()=>{
         console.log(`Server is running on port ${PORT}`);}
)
)
.catch((err) => console.log('Error connecting to MongoDB:', err))




app.get("/", (req,res)=>{
    res.send("this is home page ");
})




