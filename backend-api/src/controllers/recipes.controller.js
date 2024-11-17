const recipesService = require('../services/recipes.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function getLatestRecipes(req, res, next) {
    let result = {
        recipes: [],
        metadata: {
            totalRecords: 0,
            firsttPage: 1,
            lastPage: 1,
            page: 1,
            limit: 5,
        }
    }
    try{
        result = await recipesService.getLatestRecipes(req.query);
    }
    catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'There was an error when we tried to retrieve recipes')
        )
    }
    return res.json(JSend.success({ 
        recipes: result.recipes,
        metadata: result.metadata
     }))
}

async function getPopularRecipes(req, res, next) {
    let result = {
        recipes: [],
        metadata: {
            totalRecords: 0,
            firsttPage: 1,
            lastPage: 1,
            page: 1,
            limit: 5,
        }
    }
    try{
        result = await recipesService.getPopularRecipes(req.query);
    }
    catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'There was an error when we tried to retrieve recipes')
        )
    }
    return res.json(JSend.success({ 
        recipes: result.recipes,
        metadata: result.metadata
     }))
}

async function getRecipeByFilter(req, res, next) {
    let result = {
        recipes: [],
        metadata: {
            totalRecords: 0,
            firsttPage: 1,
            lastPage: 1,
            page: 1,
            limit: 5,
        }
    }
    try{
        result = await recipesService.getRecipesByFilter(req.query);
    }
    catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'There was an error when we tried to retrieve recipes')
        )
    }
    return res.json(JSend.success({ 
        recipes: result.recipes,
        metadata: result.metadata
     }))
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
        return next (new ApiError(500, `There was an error when we tried to retrieve the recipe #${recipe_id}`))
    }
}

async function addRecipe(req, res, next) {
    if (!req.body?.tittle || typeof req.body.tittle !== 'string'){
        return next(new ApiError(400, 'Recipe title should not be empty'));
    }
    try {
        const recipe = await recipesService.addRecipe({
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
    if (Object.keys(req.body).length === 0 && !req.files) {
        return next(new ApiError(400, 'No data provided to update the recipe'));
    }

    const { recipe_id } = req.params;

    try {
        const updatedRecipe = await recipesService.updateRecipe(recipe_id, {
            ...req.body,
            img_url: req.file? `/public/uploads/${req.file.filename}`: null,
        });
        if (!updatedRecipe) return next(new ApiError(404, 'Could not find recipe'));
        return res.json(JSend.success({
            updatedRecipe,
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
    const user_id = req.query.user_id
    const recipe_id = req.params.recipe_id
    try {
        const save = recipesService.addToFavorite(user_id, recipe_id)
        return res.json (JSend.success({
            favorite: save
        }))
        
    }
    catch(error){
        console.log(error) 
        return next (new ApiError(500, 'There was an error when we tried to add a recipe to your favorite'))
    }
}

function removefromFavorite(req, res, next){
    const user_id = req.query.user_id;
    const recipe_id = req.params.recipe_id;
    try {
        const removed = recipesService.removeFavorite(user_id, recipe_id);
        if (!removed){
            return next(new ApiError(404, 'Favorite recipe not found'))
        }
        return res.json(JSend.success({message: 'Favorite removed successfully'}))
    }
    catch (error){
        console.log(error);
        return next(new ApiError(500, 'An error occured'))
    }
}

async function getAvgRate(req, res, next) {
    const recipe_id = req.params.recipe_id;
    try {
        const Rate = await recipesService.getAvgRate(recipe_id);
        return res.json(JSend.success({ Rate }));
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, 'There was an error when we tried to retrieve comments'));
    }
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
    removefromFavorite
};