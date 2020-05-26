const express = require('express')
const app = express()
const config = require('./config')
const books = require('./api/controllers/books')
const users = require('./api/controllers/users')

app.use(express.json())
app.use(books)
app.use(users)

app.listen(config.port, () => {
    console.log('Servidor iniciado...')
})