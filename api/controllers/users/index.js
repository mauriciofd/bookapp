const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');
const config = require('../../../config')
const bcrypt = require('bcrypt');

const usersArray = []

router.post('/users', (req,res) => {
    const plainPassword = req.body.password
    const salt = bcrypt.genSaltSync(config.saltRounds)
    const hash = bcrypt.hashSync(plainPassword, salt)

    let user = {
        "id": usersArray.length+1,
        "name": req.body.name,
        "username": req.body.username,
        "password": hash
    }
    usersArray.push(user)
    res.status(200).send(`Usuario ${user.username}, creado`)
})

router.post('/users/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if(!!usersArray.find(user => user.username === username && bcrypt.compareSync(password, user.password))){   
        //generar un token aleatorio
        const token = jwt.sign({username: username}, config.tokenKey)
        res.status(200).send(`{token: ${token} }`);
    }else{    
        res.status(500).send(`Datos no válidos`);
    }
})

module.exports = router