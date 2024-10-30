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
    const [ review_id ] = await reviewRepository().insert(review);
    return { review_id, ...review };
}

async function getReviewsByFilter(query){
    const { rate, date } = query
    return await reviewRepository().
        join('users', 'user_id', '=', 'users.user_id')
        .where((builder) => {
            if(rate){
                builder.where('rate', '=', `${rate}`)
            }
            if (date) {
                builder.where('date' , '>', `${date}`)
            }
        }).select('*');
}

async function getReviewByID(id) {
    return reviewRepository().join('users', 'user_id', '=', 'users.user_id')
    .where('review_id', id).select('*').first()
    
}

async function updateReview(id, payload) {
    const updatedReview = await reviewRepository().where('review_id', id)
                            .select('*').first();
    if (!updatedReview) {
        return null;
    }
    const update = readReview(payload);
    await reviewRepository().where('review_id', id).update(update)
    return { ...updatedReview, ...update}
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

async function getAvgRate(id){
    const avgRate = await reviewRepository()
                        .where('recipe_id', id)
                        .avgRate('rate')
                        .first();
    return avgRate ? avgRate.rate : 0;
}

module.exports = {
    addReview,
    getReviewsByFilter,
    getReviewByID,
    updateReview,
    deleteReview,
    getAvgRate,
}