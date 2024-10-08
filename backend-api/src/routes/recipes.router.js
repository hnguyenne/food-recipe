const express = require('express');
const recipesController = require('../controllers/recipes.controller');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/foodrecipe', router);

    router.get('/', recipesController.getLatestRecipes);
    router.get('/', recipesController.getPopularRecipes);
    router.get('/', recipesController.getRecipeByFilter);

    router.get('/:id', recipesController.getRecipeById);
    router.post('/', recipesController.addRecipe);
    router.put('/:id', recipesController.updateRecipe);
    
    router.put('/:id', recipesController.saveRecipe);
    router.post('/:id', recipesController.rateAndCommentRecipe); 
    router.put('/:id', recipesController.likeComment);

    router.get('/:id', recipesController.getAvgRate);
    router.get('/:id', recipesController.getComments);
};