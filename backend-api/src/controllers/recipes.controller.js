const recipesService = require('../services/recipes.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function getLatestRecipes(req, res, next) {
    let recipes = [];

    try{
        recipes = await recipesService.getLatestRecipes();
    }
    catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'There was an error when we tried to retrieve recipes')
        )
    }
    return res.json(JSend.success({ recipes }))
}

async function getPopularRecipes(req, res, next) {
    let recipes = [];

    try{
        recipes = await recipesService.getPopularRecipes();
    }
    catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'There was an error when we tried to retrieve recipes')
        )
    }
    return res.json(JSend.success({ recipes }))
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
    const { recipe_id } = req.params;
    try {
        const recipe = await recipesService.getRecipeById(recipe_id);
        if (!recipe){
            return next (new ApiError (404, 'Recipe not found'));
        }
        return res.json(JSend.success({ recipe }))
    }
    catch (error) {
        console.log(error);
        return next (new ApiError(500, `There was an error when we tried to retrive the recipe #${recipe_id}`))
    }
}

async function addRecipe(req, res, next) {
    if (!req.body?.tittle || typeof req.body.tittle !== 'string'){
        return next(new ApiError(400, 'Recipe title should not be empty'));
    }
    try {
        const recipe = await recipesService.addRecipe({
            ...req.body,
            ...req.params,
            img_url: req.file ? `/public/uploads/images/${req.file.filename}`: null,
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
    if (Object.keys(req.body).length === 0 && !req.files) {
        return next(new ApiError(400, 'No data provided to update the recipe'));
    }

    const { recipe_id } = req.params;

    try {
        const updatedRecipe = await recipesService.updateRecipe(recipe_id, {
            ...req.body,
            img_url: req.file? `/public/uploads/images/${req.file.filename}`: null,
        });
        if (!updatedRecipe) return next(new ApiError(404, 'Could not find recipe'));
        return res.json(JSend.success({
            recipe: updatedRecipe,
        }));
    }
    
    catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'There was an error while we tried to update the recipe')
        )
    }
}

function saveRecipe(req, res, next) {
    const { user_id, recipe_id } = req.params
    try {
        const save = recipesService.addToFavorite({user_id, recipe_id})
        return res.json (JSend.success({
            favorite: save
        }))
        
    }
    catch(error){
        console.log(error) 
        return next (new ApiError(500, 'There was an error when we tried to add a recipe to your favorite'))
    }
}


function getAvgRate(req, res) {
    return res.status(200).json({});
}
async function deleteRecipe(req, res, next) {
    const { recipe_id } = req.params;
    try {
        const deleted = await recipesService.deleteRecipe(recipe_id);
        if (!deleted) return next(new ApiError(404, 'Could not find recipe'));
        return res.json(JSend.success({ message: 'Recipe deleted successfully' }));
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, 'There was an error while we tried to delete the recipe'));
    }
}

module.exports = {
    getLatestRecipes,
    getPopularRecipes,
    getRecipeById,
    getRecipeByFilter,
    addRecipe,
    updateRecipe,
    saveRecipe,
    getAvgRate,
    deleteRecipe,
};