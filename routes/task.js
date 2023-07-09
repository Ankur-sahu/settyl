const express = require('express')
const router = express.Router()
const { validateCredentials } = require('../middlewares/auth')
const { createTask, getTasks, updateTask, deleteTask,} = require('../controllers/taskController')


router.get("/gettask", validateCredentials, getTasks)
router.post("/createtask", validateCredentials, createTask)
router.post("/updateTask", validateCredentials, updateTask)
router.delete("/taskdelete/:id", validateCredentials, deleteTask)

// router.post("/register",createUser)

module.exports = router