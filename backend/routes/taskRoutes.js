const express = require('express')
const {createTask,createTaskByAdmin, getTasks, updateTask, deleteTask} = require('../controllers/taskController')

const {checkAuth,checkRole} = require('../middlewares/authMiddleware')

const router = express.Router();

// for user to create, get, update, delete task
router.post('/',checkAuth,createTask)
router.get('/',checkAuth, getTasks)
router.put('/:id',checkAuth, updateTask)
router.delete('/:id',checkAuth, deleteTask)



// admin create get update delete task
router.post('/admin',checkAuth,checkRole('admin'),createTaskByAdmin);
router.get('/admin',checkAuth,checkRole('admin'),getTasks);
router.put('/admin/:id',checkAuth,checkRole('admin'),updateTask);
router.delete('/admin/:id',checkAuth,checkRole('admin'),deleteTask);







module.exports = router;