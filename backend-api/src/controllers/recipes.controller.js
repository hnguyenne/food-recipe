function getLatestRecipes(req, res) {
    return res.status(201).json({  });
}

function getPopularRecipes(req, res) {
    return res.status(201).json({});
}

function getRecipeByFilter(req, res) {
    return res.status(201).json({});
}

function getRecipeById(req, res) {
    return res.status(201).json({});
}

function addRecipe(req, res) {
    return res.status(201).json({});
}

function updateRecipe(req, res) {
    return res.status(201).json({});
}

function saveRecipe(req, res) {
    return res.status(201).json({});
}

function reviewRecipe(req, res) {
    return res.status(201).json({});
}

function likeReview(req, res) {
    return res.status(201).json({});
}

function getAvgRate(req, res) {
    return res.status(201).json({});
}

function getReviews(req, res) {
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
    getAvgRate,
    getReviews,
    reviewRecipe,
    likeReview,
};