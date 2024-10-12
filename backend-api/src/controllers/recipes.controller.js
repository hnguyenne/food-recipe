const recipesService = require('../services/recipes.service');
const ApiError = require('../api-error');
const JSend = require('../jsend')
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
            new ApiError(500, 'There was an error while we tried to retrieve recipes')
        )
    }
    return res.json(JSend.success({ recipes }))
}

function getRecipeById(req, res) {
    return res.status(200).json({});
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

function updateRecipe(req, res) {
    return res.status(201).json({});
}

function saveRecipe(req, res) {
    return res.status(200).json({});
}

function rateAndCommentRecipe(req, res) {
    return res.status(201).json({});
}

function likeComment(req, res) {
    return res.status(201).json({});
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