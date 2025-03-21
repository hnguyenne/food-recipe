const knex = require("../database/knex");
const fs = require('fs');
const Paginator = require('./paginator');

function recipeRepository(){
    return knex('recipes')
}

function favoriteRepository(){
    return knex('favorite')
}

function reviewRepository() {
    return knex('reviews')
}

function readRecipe(payload){
    return {
        user_id: payload.user_id,
        tittle: payload.tittle,
        description: payload.description,
        tags: payload.tags,
        prep_time: payload.prep_time,
        cook_time: payload.cook_time,
        servings: payload.servings,
        instruction: payload.instruction,
        note: payload.note,
        img_url: payload.img_url,
    }
}

async function addRecipe(payload) {
    const recipe = readRecipe(payload);
    
    try {
        await knex('recipes')
            .insert({
                user_id: recipe.user_id,
                tittle: recipe.tittle,
                description: recipe.description,
                prep_time: recipe.prep_time,
                cook_time: recipe.cook_time,
                servings: recipe.servings,
                instruction: recipe.instruction,
                recipe_create_at: new Date(),
                note: recipe.note,
                img_url: recipe.img_url,
                tags: recipe.tags
            })
        const [recipe_id] = await knex('recipes')
            .select('recipe_id')
            .orderBy('recipe_id', 'desc')
            .limit(1);

        return { recipe_id, ...recipe };
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}


async function getLatestRecipes(query){
    const { page = 1, limit = 20 } = query; 
    const paginator = new Paginator(page, limit);
    let results = await recipeRepository()
        .select(
            knex.raw('count(recipe_id) over() as recordCount'),
            'recipes.recipe_id',
            'tittle',
            'img_url',
            'recipe_create_at'
        )
        .orderBy('recipe_create_at', 'desc')
        .limit(paginator.limit)
        .offset(paginator.offset);
    
    let totalRecords = 0;
    results = results.map((result) => {
        totalRecords = result.recordCount;
        delete result.recordCount;
        return result;
    });

    return {
        metadata: paginator.getMetadata(totalRecords),
        recipes: results,
    };
}

async function getPopularRecipes(query){
    const  {page = 1, limit = 20} = query;
    const paginator = new Paginator(page, limit);
    let results = await recipeRepository()
        .leftJoin(
            knex.raw(
                '(select recipe_id, count(*) as favorite_count from favorite group by recipe_id) as favorite'
            ),
            'favorite.recipe_id', '=', 'recipes.recipe_id'
        )
        .select(
            knex.raw('count(recipes.recipe_id) over() as recordCount'),
            'recipes.recipe_id',
            'tittle',
            'img_url',
            'favorite_count'
        ) 
        .orderBy('favorite.favorite_count', 'desc')
        .limit(paginator.limit)
        .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
        totalRecords = result.recordCount;
        delete result.recordCount;
        return result;
    });

    return {
        metadata: paginator.getMetadata(totalRecords),
        recipes: results,
    };
}

async function getRecipesByFilter(query){
    const { text , page = 1, limit = 20} = query; // Get recipes by name, tag, description (how to cook, ingredient)
    const paginator = new Paginator(page, limit);
    let results = await recipeRepository()
             .where((builder) => {
                if (text) {
                    builder
                        .where('tittle', 'like', `%${text}%`)
                        .orWhere('tags', 'like', `%${text}%`)
                        .orWhere('description', 'like', `%${text}%`);
                }
            }).select('*')
            .limit(paginator.limit)
            .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
        totalRecords = result.recordCount;
        delete result.recordCount;
        return result;
    });

    return {
        metadata: paginator.getMetadata(totalRecords),
        recipes: results,
    };
}

async function getRecipeById(id){
    let result = await recipeRepository()
        .where('recipes.recipe_id', id).select('*').first();
    return {
        recipe: result,
    }
}


async function updateRecipe(recipe_id, payload){
    const recipe = await recipeRepository()
                        .where('recipe_id', recipe_id)
                        .select('*').first();
    if (!recipe) {
        return null;
    }
    const update = readRecipe(payload)
    if (!update.img_url){
        delete update.img_url;
    }
    const updatedRecipe = await recipeRepository()
    .where('recipe_id', recipe_id).update(update);
    if (
        update.img_url && updatedRecipe.img_url &&
        update.img_url !== updatedRecipe.img_url &&
        updatedRecipe.img_url.startsWith('/public/uploads/images/')
    ){
        fs.unlink('.${updatedRecipe.img_url}', (err) => {})
    }
    console.log(update);
    return { ...updatedRecipe, ...update, recipe_id }
}


async function deleteRecipe(id){
    const deleted = await recipeRepository()
                    .where('recipe_id', id)
                    .select('img_url')
                    .first();
    if (!deleted){
        return null;
    }
    await recipeRepository().where('recipe_id', id).del();
    return deleted;
}

async function addToFavorite(user_id, recipe_id){
    const exist = await favoriteRepository().where('user_id', user_id).andWhere('recipe_id', recipe_id).select('*').first();
    if (exist){
        console.log("Favorite already exist")
        return null;
    }
    const favorite = {
        user_id,
        recipe_id,
    }
    const [ id ] = await favoriteRepository().insert(favorite);
    return { id, ...favorite }
}

async function removeFavorite(user_id, recipe_id){
    const exist = await favoriteRepository().where('user_id', user_id).andWhere('recipe_id', recipe_id).select('*').first();
    if (!exist){
        console.log("Not found")
        return null;
    }
    await favoriteRepository().where('user_id', user_id).andWhere('recipe_id', recipe_id).del();
    return exist;
}

async function getReviews(recipe_id) {
    return await reviewRepository()
        .join('recipes', 'recipes.recipe_id', 'reviews.recipe_id')
        .where('recipes.recipe_id', recipe_id)
        .select('reviews.review_id', 'reviews.rate', 'reviews.comment')
}

async function getAvgRate(recipe_id){
    const avgRate = await reviewRepository().where('recipe_id',recipe_id).select(
                            knex.raw('AVG(rate) as avgRate')
    ).first();
                        
    return avgRate || { avgRate : 0};
}

module.exports = {
    addRecipe,
    getRecipesByFilter,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    addToFavorite,
    getLatestRecipes,
    getPopularRecipes,
    getReviews,
    getAvgRate,
    removeFavorite
}