const knex = require("../database/knex");
const fs = require('fs');

function reviewRepository(){
    return knex('reviews')
}

function readReview(payload){
    return {
        recipe_id: payload.recipe_id,
        user_id: payload.user_id,
        rate: payload.rate,
        comment: payload.comment,
        review_create_at: payload.review_create_at || new Date(),
    }
}

async function addReview(payload){
    const review = readReview(payload);
    try {
        await knex('reviews')
            .insert({
                recipe_id: review.recipe_id,
                user_id: review.user_id,
                rate: review.rate,
                comment: review.comment,
                review_create_at: new Date(),
            });
        const [ review_id ] = await knex('reviews')
            .select('review_id')
            .orderBy('review_id', 'desc')
            .limit(1);
        return { review_id, ...review };
    }
    catch (error) {
        console.error(error);
        throw new Error("Error adding review");
    }

}

async function getReviewsByFilter(recipe_id){
    return await reviewRepository().
        join('users', 'reviews.user_id', '=', 'users.user_id')
        .where('recipe_id', recipe_id).select('*');
}

async function getReviewByID(id) {
    return reviewRepository().join('users', 'user_id', '=', 'users.user_id')
    .where('review_id', id).select('*').first()
    
}

async function getUserReview(user_id, recipe_id) {
    return reviewRepository().join('users', 'reviews.user_id', '=', 'users.user_id')
    .where('users.user_id', user_id).where('recipe_id', recipe_id).select('*').first() 
}

async function updateReview(review_id, payload) {
    const updatedReview = await reviewRepository().where('review_id', review_id)
                            .select('*').first();
    if (!updatedReview) {
        return null;
    }
    const update = readReview(payload);
    await reviewRepository().where('review_id', review_id).update(update)
    return {review_id, ...update}
}

async function deleteReview(id){
    const deleted = await reviewRepository()
                        .where('review_id', id)
                        .first();
    if (!deleted){
        return null;
    }
    await reviewRepository().where('review_id', id).del();
    return deleted;
}

module.exports = {
    addReview,
    getReviewsByFilter,
    getReviewByID,
    updateReview,
    deleteReview,
    getUserReview,
}