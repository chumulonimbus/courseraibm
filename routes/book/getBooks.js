const express = require('express')
const book = require('../../models/book')
const verifyToken = require('../../middleware/verifyToken')

const router = express.Router()

router.get('/books', async (req, res)=>{
    try {
        const { author, title } = req.body
        let allBooks

        if(author){
            allBooks = await book.findAll({where: {author}});
        } else if(title){
            allBooks = await book.findAll({where: {title}});
        } else {
            allBooks = await book.findAll();
        }
        
        if (!allBooks || allBooks.length === 0) {
          return res.status(404).send({message:'Book not found'});
        }
    
        res.status(200).send(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.getBooksRouter = router