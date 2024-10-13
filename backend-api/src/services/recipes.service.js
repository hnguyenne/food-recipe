const knex = require("../database/knex");
const fs = require('fs');

function recipeRepository(){
    return knex('recipes')
}
function RecipeTagRepository(){
    return knex('recipe_tag')
}
function favoriteRepository(){
    return knex('favorite')
}

function reviewRepository() {
    return knex('reviews');
}

function readRecipe(payload){
    return {
        user_id: payload.user_id,
        tittle: payload.tittle,
        description: payload.description,
        prep_time: payload.prep_time,
        cook_time: payload.cook_time,
        servings: payload.servings,
        instruction: payload.instruction,
        recipe_create_at: new Date(),
        note: payload.note,
        img_url: payload.img_url,
        tags: payload.tags || []
    }
}

async function addRecipe(payload) {
    const recipe = readRecipe(payload);
    
    const trx = await knex.transaction();
    try {
        await trx('recipes')
            .insert({
                user_id: recipe.user_id,
                tittle: recipe.tittle,
                description: recipe.description,
                prep_time: recipe.prep_time,
                cook_time: recipe.cook_time,
                servings: recipe.servings,
                instruction: recipe.instruction,
                recipe_create_at: recipe.recipe_create_at,
                note: recipe.note,
                img_url: recipe.img_url
            })
        const [recipe_id] = await trx('recipes')
            .select('recipe_id')
            .orderBy('recipe_id', 'desc')
            .limit(1);

        if (typeof payload.tags === 'string') {
            recipe.tags = payload.tags.split(',').map(tag => tag.trim());
        } else {
            recipe.tags = Array.isArray(payload.tags) ? payload.tags : [];
        }

        const tagNames = recipe.tags;

        const allTags = [];
        for (const tagName of tagNames) {
            const tag_id = await addOrGetTagId(tagName);
            allTags.push({ tag_id, tag_name: tagName });
        }

        const RecipeTagRepository = allTags.map(tag =>({
            recipe_id: recipe_id.recipe_id,
            tag_id: tag.tag_id
        }));
            
        await trx('recipe_tag').insert(RecipeTagRepository);
        await trx.commit();

        return { recipe_id, ...recipe, tags: allTags };
    }
    catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }

}


async function getLatestRecipes(){
    return await recipeRepository()
            .join('recipe_tag', 'recipes.recipe_id', '=', 'recipe_tag.recipe_id')
            .join('tags', 'recipe_tag.tag_id', '=' , 'tags.tag_id')
            .orderBy('recipe_create_at', 'desc')
            .select('*');
}

async function getPopularRecipes(){
    return await recipeRepository()
            .join('recipe_tag', 'recipes.recipe_id', '=', 'recipe_tag.recipe_id')
            .join('tags', 'recipe_tag.tag_id', '=' , 'tags.tag_id')
            .join(
                knex.raw(
                    '(select recipe_id, count(*) as favorite_count from favorite group by recipe_id) as favorite'
                ),
                'favorite.recipe_id', '=', 'recipes.recipe_id'
            )
            .orderBy('favorite.favorite_count', 'desc')
            .select('*');
}

async function getRecipesByFilter(query){
    const { name, tag, description } = query; // Get recipes by name, tag, description (how to cook, ingredient)
    return await recipeRepository()
            .join('recipe_tag', 'recipes.recipe_id', '=', 'recipe_tag.recipe_id')
            .join('tags', 'recipe_tag.tag_id', '=' , 'tags.tag_id')
            .where((builder) => {
                if(name){
                    builder.where('tittle', 'like', '%${name}%');
                }
                if (tag){
                    builder.where('tag_name', '=', '${tag}')
                }
                if(description){
                    builder.where('description', 'like', '%${description}%')
                }
            }).select('*');
}

async function getRecipeById(id){
    return await recipeRepository()
        .join('recipe_tag', 'recipes.recipe_id', '=', 'recipe_tag.recipe_id')
        .join('tags', 'recipe_tag.tag_id', '=' , 'tags.tag_id')
        .where('recipes.recipe_id', id).select('*').first();
}


async function updateRecipe(id, payload){
    const updatedRecipe = await recipeRepository()
                        .where('recipe_id', id)
                        .select('*').first();
    if (!updatedRecipe) {
        return null;
    }
    const update = readRecipe(payload)
    if (!update.img_url){
        delete update.img_url;
    }
    if (!update.video_path){
        delete update.video_path;
    }
    await recipeRepository()
    .where('recipe_id', id).update(update);
    if (
        update.img_url && updatedRecipe.img_url &&
        update.img_url !== updatedRecipe.img_url &&
        updatedRecipe.img_url.startsWith('/public/uploads/images/')
    ){
        fs.unlink('.${updatedRecipe.img_url}', (err) => {})
    }
    if (
        update.video_path && updatedRecipe.video_path &&
        update.video_path !== updatedRecipe.video_path &&
        updatedRecipe.video_path.startsWith('/public/uploads/videos/')
    ){
        fs.unlink('.${updatedRecipe.video_path}', (err) => {})
    }
    return { ...updatedRecipe, ...update }
}

async function addOrGetTagId(tag){
    const existingTag = await knex('tags')
            .where({ tag_name: tag })
            .select('tag_id')
            .first();

        if (existingTag) {
            return existingTag.tag_id;
        }

        const [newTagId] = await knex('tags')
            .insert({ tag_name: tag });

        return newTagId;
}

async function addRecipeTag(id, tag){ 
    const existing = await RecipeTagRepository()
                    .where('recipe_id', id)
                    .andWhere('tag_id', tag)
                    .select('*').first()
    if (!existing){
        const tag = await RecipeTagRepository().insert({
                    recipe_id: id,
                    tag_id: tag
                })
    }
    return tag;
}

async function removeRecipeTag(id, tag){
    const deleted = await RecipeTagRepository()
                    .where('recipe_id', id)
                    .andWhere('tag_id', tag).first();
        if (!deleted){
            return null;
        }
        await RecipeTagRepository()
        .where('recipe_id', id)
        .andWhere('tag_id', tag).del();
    return deleted;
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
async function addToFavorite(user, recipe){
    const favorite = {
        user_id: user,
        recipe_id: recipe
    }
    const [ id ] = await favoriteRepository().insert(favorite);
    return { id, ...favorite }
}

async function getReviews(recipe_id) {
    return await reviewRepository()
        .join('recipes', 'recipes.recipe_id', 'reviews.recipe_id')
        .where('recipes.recipe_id', recipe_id)
        .select('reviews.review_id', 'reviews.rate', 'reviews.comment')

}

module.exports = {
    addRecipe,
    getRecipesByFilter,
    getRecipeById,
    updateRecipe,
    addRecipeTag,
    removeRecipeTag,
    deleteRecipe,
    addToFavorite,
    getLatestRecipes,
    getPopularRecipes,
    getReviews,
}