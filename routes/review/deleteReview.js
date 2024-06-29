const express = require('express')
const review = require('../../models/review')

const router = express.Router()

router.delete('/review', async (req, res)=>{
    const { reviewId, userId } = req.body;

    try {
        const dataReview = await review.findOne({where: {rid:reviewId}});

        if (!dataReview) {
            return res.status(404).send({ message: `Review with id ${reviewId} not found!` });
        }

        if (dataReview.userId !== userId) {
            return res.status(403).send({ message: "You are not authorized to delete this review." });
        }

        await dataReview.destroy();

        res.status(200).send({ message: "Review successfully deleted!" });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
})

exports.deleteReviewRouter = router