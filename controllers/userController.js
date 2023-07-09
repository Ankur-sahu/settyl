const { User, validateUser } = require('../modals/user');
const { generateToken } = require('../utils/jwt');
const Joi = require('joi')
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  console.log("getting req")
  const { error } = validateUser(req.body);
  console.log(error, "getting error")
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  //   check user existance
  console.log("getting req check for user")
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered....");

  try {
    console.log("Creating new user....");
    user = new User({ name, email, password });
    console.log("before hashing user", user);

    // hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log("after hashing user", user);

    // save it on the db
    const newUser = await user.save();

    return res.status(201).send({
      name: newUser.name,
      email: newUser.email,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
    });
  }
}

async function login(req, res) {
  console.log('getting login req')
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const { email, password } = req.body;
  
    //   check email and password
    let user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not registered");
  
    try {
      // compare passwords
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(400).send("Invalid email or password....");
  
      // JWT create token
      const token = generateToken({
        _id: user._id,
        name:user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  
      return res.header("X-Auth-Token", token).status(200).json({
        msg: "User logged in successfully",
        login: true,
        isAdmin: user.isAdmin,
        accessToken: token
      });
    } catch (err) {
      return res.status(500).json({
        msg: "Something went wrong...",
        error: err.message,
        login: false,
      });
    }
  }
  
  const validate = (obj, body) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });
  
    return schema.validate(body);
  };

module.exports = {
  createUser,
  login,
};
