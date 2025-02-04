const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const taskRoutes = require('./routes/taskRoutes')


const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/api', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => 

         app.listen(PORT, ()=>{
         console.log(`Server is running on port ${PORT}`);}
)
)
.catch((err) => console.log('Error connecting to MongoDB:', err))







