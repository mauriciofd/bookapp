const express = require('express')
const router = express.Router()
const access = require("../../middlewares/bookslogger")
const audits = require("../../middlewares/userslogger")
const booksmodule = require("../../services/books")

const booksArray = []

router.get('/', access, (req, res) => {
    res.send(booksmodule.loadBooks(booksArray))
})
router.post('/books', access, audits, (req, res) => {
    let book = {
        "id": booksArray.length+1,
        "name": req.body.name,
        "author": req.body.author
    }
    booksArray.push(book)
    res.status(200).send(`${book.name} de ${book.author}, creado`)
})
router.get('/books/:id', access, (req, res) => {
    const id = req.params.id
    res.send(booksmodule.showBook(booksArray, id))
})

module.exports = router