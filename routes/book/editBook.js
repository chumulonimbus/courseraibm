const express = require('express')
const book = require('../../models/book')

const router = express.Router()

router.put('/book', async (req, res)=>{
    const bookId = req.body.bookId
    const {ISBN, title, author} = req.body
    
    try {

        const getBook = await book.findOne({ where: { bookId } });
        if (!getBook) {
            return res.status(404).send({ message: `Book with id ${bookId} not found!` });
        }

        getBook.ISBN = ISBN
        getBook.title = title
        getBook.author = author

        await getBook.save();
        res.status(200).send({ message: "Book successfully updated!" });

    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
})

exports.editBookRouter = router