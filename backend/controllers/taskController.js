const Task = require('../models/taskModels')


const getTasks = async (req,res)=>{
    try{
        const task = await Task.find();
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

const postTasks = async(req,res)=>{
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
        // console.log(task);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

}


module.exports = {getTasks,postTasks};