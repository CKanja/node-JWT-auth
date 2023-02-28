const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')

const AuthRoute = require('./Routes/auth.route')

// creating an express app
const app = express()

app.use(morgan('dev'))

app.get('/', (req,res) => {
    res.send("Welcome :)")
})

app.use('/auth', AuthRoute)

app.use(async(req, res, next) => {
    next(createError.NotFound("Page not found"))
})

// next bc we want to pass execution to the next middleware function

app.use((err, req, res, next) => {
    //res.status = (err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// declare the PORT
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})