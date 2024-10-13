const reviewsService = require('../services/review.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

function rateAndCommentRecipe(req, res, next) {
    if (!req.body){
        return next(new ApiError(400, 'Data cannot be empty'))
    }
    try{
        const review = reviewsService.addReview(...req.body)
        return res.json(JSend.success({
            review
        }))
    }
    catch (error){
        console.log(error);
        return next (new ApiError(500, 'There was an error when we tried to create a comment.'))
    }
}

function likeComment(req, res, next) {
    const {review, user} = req.body
    try {
        const like = reviewsService.Like(review, user)
        return res.json(JSend.success({
            like
        }))
    }
    catch(error) {
        console.log(error)
        return next(new ApiError(500, 'There was an error'))
    }
}


async function getComments(req, res, next) {
    const { recipe_id } = req.params;
    try {
        const comments = await reviewsService.getReviewsByFilter(recipe_id);
        return res.json(JSend.success({ comments }));
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, 'There was an error when we tried to retrieve comments'));
    }
}

async function updateReview(req, res, next) {
    const { review_id } = req.params;
    try {
        const updatedReview = await reviewsService.updateReview(review_id, ...req.body);
        if (!updatedReview) {
            return next(new ApiError(404, 'Review not found'));
        }
        return res.json(JSend.success({ updatedReview }));
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, 'There was an error when we tried to update the review'));
    }
}

async function deleteReview(req, res, next) {
    const { review_id } = req.params;
    try {
        const deletedReview = await reviewsService.deleteReview(review_id);
        if (!deletedReview) {
            return next(new ApiError(404, 'Review not found'));
        }
        return res.json(JSend.success({ deletedReview }));
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, 'There was an error when we tried to delete the review'));
    }
}

module.exports = {
    rateAndCommentRecipe,
    likeComment,
    getComments,
    updateReview,
    deleteReview,
};
