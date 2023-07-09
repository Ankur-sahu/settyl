const { Task, validateTask } = require('../modals/task')
// const Joi = require('joi')

async function createTask(req, res) {
  // console.log(req.user, req.body," Task creation req")
  req.body.userId = req.user._id
  req.body.userName = req.user.name

  console.log(req.body)

  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(" Time to create")
  const { title, description, dueDate, status , userId, userName} = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    status,
    userId,
    userName,
  });

  const newTask = await task.save();
  return res.status(201).json({
    msg: "Successfully created the order",
    data: newTask,
  });
}

async function getTasks(req, res) {
  console.log("starting getting data.................",req.user,"getting get tasks req")
  const tasks = await Task.find();
  return res.status(200).send({
    data: tasks
  });
}

async function updateTask(req, res) {
  console.log("update task req")
  console.log(req.body)
  const { id, title, dueDate, status, description} = req.body;

  const task = await Task.findById(id);
  if (!task) return dataNotFound("Task not found...");

  task.title = title;
  task.dueDate = dueDate;
  task.status = status;
  task.description = description;


  const updatedTask = await task.save();
  return res.status(200).json({
    msg: "Order updated successfully",
    data: updatedTask,
  });
}

async function deleteTask(req, res) {
  console.log("getting del req test")
  const { id } = req.params;
  console.log(req.params.id," ....params")

  // const { isAdmin } = req.user;
  // if (!isAdmin) return unauthorised("Unauthorised");

  const task = await Task.findById(id);
  if (!task) return dataNotFound("Task not found...");

  const deletedTask = await Task.findByIdAndDelete(id);
  
  return res.status(200).json({
    msg: "Task deleted successfully",
    data: deletedTask,
  });
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
