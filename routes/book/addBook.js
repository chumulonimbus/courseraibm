const express = require('express')
const book = require('../../models/book')

const router = express.Router()

router.post('/book', async (req, res)=>{
    try {

        const {ISBN, title, author} = req.body

        const getBook = await book.findOne({ where: { ISBN } });
        if (getBook) {
            return res.json({ message: `Book with ISBN ${ISBN} already registered!` });
        }

        await book.create({ISBN, title, author});
        res.status(200).send({ message: "Book successfully registered!" });

    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
})

exports.addBookRouter = router