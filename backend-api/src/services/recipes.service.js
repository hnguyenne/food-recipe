const knex = require("../database/knex");

function recipeRepository(){
    return knex('recipes')
}
function ingredientRepository(){
    return knex('ingredients')
}
function stepRepository(){
    return knex('steps')
}

function readRecipe(payload){
    return {
        tittle: payload.tittle,
        description: payload.description,
        prep_time: payload.prep_time,
        cook_time: payload.cook_time,
        servings: payload.servings,
        image_url: payload.image_url,
        video_path: payload.video_path,
        recipe_create_at: payload.recipe_create_at,
        user_id: payload.user_id,
        ingredient_id: payload.ingredient_id,
        ingredient_description: payload.ingredient_description,
        step_id: payload.step_id,
        instruction: payload.instruction,
        tag_id: payload.tag_id
    }
}

async function addRecipe(payload) {
    const recipe = readRecipe(payload);
    try{
        const [ recipe_id ] = await recipeRepository().insert(recipe).returning('id');
        if (payload.ingredients) {
            await Promise.all(payload.ingredients.map(async (ingredient) => {
                const [ingredientId] = await knex('ingredients').insert({
                    ingredient_name: ingredient.ingredient_name,
                    description: ingredient.ingredient_description,
                    recipe_id: ingredient.recipe_id
                }).returning('ingredient_id');
            }));
        }

        if (payload.steps) {
            await Promise.all(payload.steps.map(async (step, index) => {
                await knex('steps').insert({
                    recipe_id: recipe_id,
                    instruction: step.instruction,
                    step_number: index + 1, // Assuming step numbers start from 1
                });
            }));
        }
        return { id: recipeId, ...recipeData };
    }
    catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
}