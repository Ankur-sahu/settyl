const mongoose = require('mongoose')
const Joi = require("joi");
const { ref } = require('joi/lib');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    roles: {
        type: String,
        required: true,
        default:"employee"
    },
})

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      confirm_password: Joi.ref('password')
    });
  
    return schema.validate(user);
  };

  module.exports = {
    User,
    validateUser,
  };