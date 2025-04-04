const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const taskRoutes = require('./routes/taskRoutes')
const authRoutes = require('./routes/authRoutes');
const { truncates } = require('bcryptjs');
const path = require('path');
// const emailScheduler = require('./scheduler/emailScheduler');
const app = express();



const PORT = process.env.PORT || 3000;




app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);
 
// console.log("mongo URI:  ",process.env.MONGO_URI )   
mongoose.connect(process.env.MONGO_URI)
.then(() => 

         app.listen(PORT, ()=>{
         console.log(`Server is running on port ${PORT}`);}
)
)
.catch((err) => console.log('Error connecting to MongoDB:', err))









