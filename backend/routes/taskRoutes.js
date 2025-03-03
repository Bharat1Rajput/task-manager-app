const express = require('express')
const {createTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController')

const authMiddle = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/',authMiddle,createTask)
router.get('/',authMiddle, getTasks)
router.put('/:id',authMiddle, updateTask)
router.delete('/:id',authMiddle, deleteTask)

module.exports = router;