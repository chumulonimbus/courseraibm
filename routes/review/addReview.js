const express = require('express')
const Review = require('../../models/review')
const Book = require('../../models/book')
const User = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

const router = express.Router()

router.post('/review', async (req, res)=>{
    const { bookId, userId, review } = req.body;

    try {
        const bookData = await Book.findByPk(bookId);
        const userData = await User.findByPk(userId);

        if (!bookData) {
            return res.status(404).json({ message: `Book with id ${bookId} not found!` });
        }

        if (!userData) {
            return res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        // Create the review
        const newReview = await Review.create({
            bookId,
            userId,
            review
        });

        const responseNewReview = await Review.findOne({
            where: { rid: newReview.rid },
            include: [
                { model: User, attributes: ['uid', 'username'] },
                { model: Book }
            ]
        });

        res.status(200).send({ message: "Review successfully added!", review: responseNewReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.addReviewRouter = router