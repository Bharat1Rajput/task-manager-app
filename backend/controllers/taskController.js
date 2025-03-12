const Task = require('../models/taskModels')

// create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const task = await Task.create({ title, description, status, priority, dueDate, createdBy: req.user.id,assignedTo: req.user.id });
        res.status(201).json(task);
    }
    catch (err) {
        res.status(400).json({error : err.message});
}
}


// when admin create a task
exports.createTaskByAdmin = async (req, res)=>{
  console.log("this is req.body");
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
     console.log("this is assigned to", assignedTo);
    const task = await Task.create({ title, 
      description, 
      status, 
      priority, 
      dueDate, 
      createdBy: req.user.id,
      assignedTo 
    });
    res.status(201).json(task);
  }
  catch (err) {
    res.status(400).json({error : err.message});
  }
  
};


// get task of a user

exports.getTasks = async (req, res) => {
    try {
        // const tasks = await Task.find({user: req.user.id}).sort({createdAt: -1});
        // res.json(tasks);

        // adding pagination
        let {page,limit,status,priority,search} = req.query;
        
        // console.log("request query", req.query);
        // console.log("this is search", search );

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 25;

        const skip = (page -1)* limit;

        // add filtering
        let filter = {};

        if(status) filter.status = status;
        if(priority) filter.priority = priority;

        if (search) {
          filter.title = { $regex: search, $options: "i" };  
          
      }

      // console.log("this is search :", search );

      if (req.user.role === "admin") {
        // Admin can see all tasks
        const tasks = await Task.find(filter).skip(skip).limit(limit).populate("assignedTo", "name email");
        const totalTasks = await Task.countDocuments(filter);

        return res.json({
            page,
            limit,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            data: tasks
        });


    } else {
        // Regular user can only see their own tasks
        filter.user = req.user.id;
        const tasks = await Task.find(filter).skip(skip).limit(limit);
        const totalTasks = await Task.countDocuments(filter);

        return res.json({
            page,
            limit,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            data: tasks
        });
    }
} catch (err) {
    res.status(500).json({ msg: err.message });
}

    };


    // update task 
   exports.updateTask = async (req, res) => {
      try {
          const task = await Task.findById(req.params.id);
          if (!task) return res.status(404).json({ error: "Task not found" });
  
          if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
              return res.status(403).json({ error: "Access Denied" });
          }
  
          Object.assign(task, req.body);
          await task.save();
          res.json({ message: "Task updated", task });
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  };
  


    // delete task

  exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) return res.status(404).json({ error: "Task not found" });

        if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access Denied" });
        }

          await task.deleteOne();
          res.json({message : "Task deleted successfully"});

        }
        catch(err){
            res.status(400).json({msg : err.message});
        }
    };

