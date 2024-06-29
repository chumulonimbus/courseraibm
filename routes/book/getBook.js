const express = require('express')
const book = require('../../models/book')

const router = express.Router()

router.get('/book', async (req, res)=>{
    try {
        const { ISBN } = req.body
        const bookData = await book.findOne({ ISBN });
        
        if (!bookData) {
          return res.status(404).send({message:`Book with ISBN ${ISBN} not found`});
        }
    
        res.status(200).send(bookData);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.getBookRouter = router