const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const path = require('path');
const auth = require('./routes/auth')
const task = require('./routes/task')
const crypto = require('crypto');
require("dotenv").config({
    path: "./.env",
  });

const app = express()
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5001');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
app.use(express.json())
app.use(cors());
app.use(express.static('build'))
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_CONNECTION_STRING) // db is not available, it'll create new DB
  .then(() => console.log("connected to MongoDB....."))
  .catch((err) =>
    console.log("Error occured while connecting mongodb....", err)
  );

// Generate a private key
// const privateKey = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem',
//   },
// }).privateKey;

// console.log(privateKey, "   ......key");

app.use('/auth',auth)
app.use('/task',task) 
app.use('/',(req,res,next)=>{
    console.log("sending react app")
    res.sendFile(path.join(__dirname,'build','index.html'))
    // next()
})

app.listen(port,()=>console.log(`i'm on work dude! and port is ${port}`))