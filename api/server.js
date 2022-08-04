
const express = require('express');
const mongoose = require('mongoose')

const app = express()
const port = 8080
const connectURL = "mongodb+srv://test:bJYVI29LEAjl147U@cluster0.ti4jx.mongodb.net/lottery"

const ResultRoutes = require('./routes/result')

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('access-control-allow-origin', '*')
    res.setHeader('access-control-allow-methods', '*')
    res.setHeader('access-control-allow-headers', '*')
    next()
})

app.use('/results', ResultRoutes)

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500
    const message = err.message
    res.status(status).json({ message: message })
})

mongoose
    .connect(connectURL)
    .then(() => app.listen(port))
    .catch(err => console.log(err))
