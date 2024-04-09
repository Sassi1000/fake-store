const express = require('express')
const userControllers = require('./../controllers/userControllers')
const router = express.Router()

router.route('/')
    .get(userControllers.getUsers)
    .post(userControllers.createUser)

router.route('/login')
    .post(userControllers.login)


module.exports = router