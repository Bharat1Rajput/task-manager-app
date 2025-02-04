const express = require('express');
const router = express.Router();

const Task = require('../models/taskModels');

router.get("/", (req,res)=>{
    res.send("this is home page ");
})   




// for creating task

router.post('/tasks', async(req,res)=>{
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
        // console.log(task);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

})


// for get or read the tasks

router.get('/tasks', async (req,res)=>{
    try{
        const task = await Task.find();
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})


module.exports = router;