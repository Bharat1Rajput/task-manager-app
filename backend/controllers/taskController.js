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


// get all task

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.id}).sort({createdAt: -1});
        res.json(tasks);
        
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

