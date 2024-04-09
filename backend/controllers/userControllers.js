const User = require('./../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { generateToken } = require('./../utils/auth')

// const asyncWrapper = fn => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next)
//     }
// }

exports.getUsers = asyncHandler(async (req, res) => {
    const { filter } = req.query
    const users = await User.find(filter)
    res.status(200).json({
        status: 'success',
        users
    })
})

exports.createUser = asyncHandler(async (req, res) => {
    const user = req.body
    const newUser = await User.create(user)
    res.status(201).json({
        status: 'success',
        newUser
    })
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        res.status(403).json({
            status: 'unouthrized',
            message: "the user does not exist"
        })
    } else {
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            const accessToken = generateToken(user._id)
            res.status(200).json({ status: 'success', accessToken })
        }
    }
})