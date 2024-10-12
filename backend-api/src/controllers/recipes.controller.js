const recipesService = require('../services/recipes.service');
const reviewsService = require('../services/review.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');
const { application } = require('express');
function getLatestRecipes(req, res) {
    return res.status(200).json({  });
}

function getPopularRecipes(req, res) {
    return res.status(200).json({});
}

async function getRecipeByFilter(req, res, next) {
    let recipes = [];

    try{
        recipes = await recipesService.getRecipesByFilter(req.query);
    }
    catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'There was an error when we tried to retrieve recipes')
        )
    }
    return res.json(JSend.success({ recipes }))
}

async function getRecipeById(req, res, next) {
    const { id } = req.params;
    try {
        const recipe = await recipesService.getRecipeById(id);
        if (!recipe){
            return next (new ApiError (404, 'Recipe not found'));
        }
        return res.json(JSend.success({ recipe }))
    }
    catch (error) {
        console.log(error);
        return next (new ApiError(500, `There was an error when we tried to retrive the recipe #${id}`))
    }
}

async function addRecipe(req, res, next) {
    if (!req.body?.tittle || typeof req.body.tittle !== 'string'){
        return next(new ApiError(400, 'Recipe title should not be empty'));
    }
    try {
        const recipe = recipesService.addRecipe({
            ...req.body,
            img_url: req.file ? `/public/uploads/${req.file.filename}`: null,
        })
        return res.status(201).set({
            Location: `${req.baseUrl}/${(await recipe).recipe_id}`,
        }).json(
            JSend.success({
                recipe,
            })
        )
    }
    catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'There was an error when we tried to add your recipe')
        )
    }
}

async function updateRecipe(req, res, next) {
    if (Object.keys(req.body).length == 0 && !req.file){
        return next(new ApiError(400, 'Data to update cannot by empty'))
    }
    const { id } = req.params;
    try {
        const updated = await recipesService.updateRecipe(id, { ...req.body,
            img_url: req.file ? `/public/uploads/images/${req.file.filename}` : null
        })
        if (!updated) {
            return next(new ApiError (404, 'Recipe not found'));
        }
        return res.json (JSend.success({
            recipe: updated,
        }))
    }
    catch (error) {
        console.log(error);
        return next (new ApiError(500, 'There was an error when we tried to update your recipe'))
    }
}

function saveRecipe(req, res, next) {
    const {user, recipe } = req.body
    try {
        const favorite = recipesService.addToFavorite({user, recipe})
        return res.json (JSend.success({
            favorite: added
        }))
        
    }
    catch(error){
        console.log(error) 
        return next (new ApiError(500, 'There was an error when we tried to add a recipe to your favorite'))
    }
}

function rateAndCommentRecipe(req, res, next) {
    if (!req.body){
        return next(new ApiError(400, 'Data cannot be empty'))
    }
    try{
        const review = reviewsService.addReview(...req.body)
        return res.json(JSend.success({
            reivew
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

function getAvgRate(req, res) {
    return res.status(200).json({});
}

function getComments(req, res) {
    return res.status(201).json({});
}

module.exports = {
    getLatestRecipes,
    getPopularRecipes,
    getRecipeById,
    getRecipeByFilter,
    addRecipe,
    updateRecipe,
    saveRecipe,
    rateAndCommentRecipe,
    likeComment,
    getAvgRate,
    getComments,
};