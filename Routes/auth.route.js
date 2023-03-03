const express = require ('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.model')
const { authSchema } = require('../helpers/validation_schema')

router.post('/register', async(req,res, next) =>{
    console.log(req.body);
    try {
      //const { email, password } = req.body
      // check if any of the creds are missing
      const result = await authSchema.validateAsync(req.body)
      // check if user is already in DB
      const userExists = await User.findOne({email: result.email})
      if (userExists) throw createError.Conflict(`${result.email} is already registered in the DB`)

      // IF ALL'S GOOD
      const user = new User(result)
      const savedUser = await user.save()

      res.send(savedUser)


    } catch (error) {

      if(error.isJoi === true) error.status = 422
      next(error)
      
    }
})

router.post("/login", async (req, res) => {
  
  res.send("login router");
});

router.post("/refresh-token", async (req, res) => {
  res.send("refresh token route");
});

router.delete('/logout', async(req,res) => {
    res.send('logout route')
})

module.exports = router