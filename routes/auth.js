const express = require('express')
const router = express.Router()
const {createUser, login} = require('../controllers/userController')

router.post("/login",login)

router.post("/register",createUser)

module.exports = router