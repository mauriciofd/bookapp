var express = require('express')
const router = express.Router()
var fs = require('fs')
var jwt = require('jsonwebtoken');
var morgan = require('morgan')
const config = require('../../config')

const logger = (req, res, next) => {
    //obtener el token de los headers de la petición
    const token = req.headers['x-access-token'];
    let decoded;
    try {
        decoded = jwt.verify(token, config.tokenKey);
    } catch (error) {
        decoded = false;
    } if (!!decoded) {
        // create a write stream (in append mode)
        const accessLogStream = fs.createWriteStream('./../files/audits.log', { flags: 'wx' })
        // setup the logger
        router.use(morgan('combined', { stream: accessLogStream }))
        next()
    } else {
        //si la respuesta no es válida, responder un mensaje de error
        res.status(500).send('Usuario no autorizado')
    }
}

module.exports = logger