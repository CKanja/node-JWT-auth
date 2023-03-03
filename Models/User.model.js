const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//defining what should happen before saving object to DB
userSchema.pre('save', async function (next) {
    try {
        console.log("called before saving a user")
        // create the salt value that will help to encrypt the password
        const salt = await bcrypt.genSalt(10)
        // actually encrytping the password w the salt value
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        // passing back execution to save
        next()
    } catch (error) {
        next(error)
        
    }
})



const User = mongoose.model('user', userSchema)

module.exports = User