const express = require('express')
const review = require('../../models/review')
const book = require('../../models/book')
const user = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

const router = express.Router()

router.get('/reviews', async (req, res)=>{
    try {
        const allReview = await review.findAll({
            include: [
                { model: user, attributes: ['uid', 'username'] },
                { model: book }
            ]
        })
        
        if (!allReview || allReview.length === 0) {
          return res.status(404).send({message:'Review not found'});
        }
    
        res.status(200).send(allReview);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.getReviewsRouter = router