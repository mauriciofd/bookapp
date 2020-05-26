var express = require('express')
const router = express.Router()
var fs = require('fs')
var morgan = require('morgan')

const logger = (req, res, next) => {
    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream('./../files/access.log', { flags: 'wx' })
    // setup the logger
    router.use(morgan('combined', { stream: accessLogStream }))
    next()
}

module.exports = logger