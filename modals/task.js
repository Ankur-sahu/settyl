const mongoose = require('mongoose')
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, default: "In progress" },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName :{ type:String,required:true}
})

const Task = mongoose.model("Task", taskSchema);

const validateTask = (task) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        dueDate: Joi.date().required(),
        status:Joi.string(),
        userId:Joi.allow(),
        userName: Joi.string().required(),
    });
  
    return schema.validate(task);
  };

  module.exports = {
    Task,
    validateTask,
  };