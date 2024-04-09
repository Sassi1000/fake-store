const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'must provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'must provide a password'],
        minLength: [8, 'must include at least 8 digits']
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next()
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User