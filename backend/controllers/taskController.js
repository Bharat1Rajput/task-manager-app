const Task = require('../models/taskModels')

// create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const task = await Task.create({ title, description, status, priority, dueDate,  user: req.user.id  });
        res.status(201).json(task);
    }
    catch (err) {
        res.status(400).json({error : err.message});
}
}


// get task of a user

exports.getTasks = async (req, res) => {
    try {
        // const tasks = await Task.find({user: req.user.id}).sort({createdAt: -1});
        // res.json(tasks);

        // adding pagination
        let {page,limit,status,priority} = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page -1)* limit;

        // add filtering
        let filter = {};

        if(status) filter.status = status;
        if(priority) filter.priority = priority;

        const tasks = await Task.find({user: req.user.id, ...filter}).skip(skip).limit(limit);

        const totalTasks =  await Task.countDocuments({user: req.user.id, ...filter});

        res.json(
          {page,
          limit,
          totalTasks,
          totalPages: Math.ceil(totalTasks / limit),
          data: tasks,})
        
    }

    catch (err) {
        res.status(500).json({ msg: err.message });
}
};
// update task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
      
          if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Task not found' });
          };

          Object.assign(task, req.body);

          await task.save();
          res.json(task);


        } 
        catch (err) {
          res.status(400).json({ error: err.message });
        }
    };


    // delete task

  exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Task not found' });
          }

          await task.deleteOne();
          res.json({message : "Task deleted successfully"});

          
        }
        catch(err){
            res.status(400).json({msg : err.message});
        }
    };

