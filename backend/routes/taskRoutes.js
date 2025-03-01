const express = require('express');
const router = express.Router();

const Task = require('../models/taskModels');
const {getTasks, postTasks} = require('../controllers/taskController')


router.get("/", (req,res)=>{
    res.send("this is home page ");
})   




// for creating task

router.post('/tasks',postTasks )


// for get or read the tasks

router.get('/tasks',getTasks )


module.exports = router;