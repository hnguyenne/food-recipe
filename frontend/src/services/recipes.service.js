import { DEFAULT_IMG } from "@/constants";

/**
* @param {string} url

* @param {RequestInit} options
* @returns Promise<Response>
*/

async function efetch(url, options = {}) {
    let result = {};
    let json = {};
    try {
        result = await fetch(url, options);
        json = await result.json();
    } catch (error) {
        throw new Error(error.message);
    }
    if (!result.ok || json.status !== 'success') {
        throw new Error(json.message);
    }
    return json.data;
}

function makeRecipesService() {

    const baseUrl = '/api/v1/foodrecipe';

    async function fetchLatestRecipes(page, limit = 20) {
        let url = `${baseUrl}/latest/?page=${page}&limit=${limit}`;
        const data = await efetch(url);
        data.recipes = data.recipes.map((recipe) => {
            return {
                ...recipe,
                img_url: recipe.img_url ?? DEFAULT_IMG
            };
        });
        return data;
    }

    async function fetchPopularRecipes(page, limit = 20) {
        let url = `${baseUrl}/popular/?page=${page}&limit=${limit}`;
        const data = await efetch(url);
        data.recipes = data.recipes.map((recipe) => {
            return {
                ...recipe,
                img_url: recipe.img_url ?? DEFAULT_IMG
            };
        });
        return data;
    }

    async function fetchFilterRecipes(searchText, page, limit = 20) {
        let url = `${baseUrl}/?name=${searchText}&tag=${searchText}&description=${searchText}&page=${page}&limit=${limit}`;
        const data = await efetch(url);
        data.recipes = data.recipes.map((recipe) => {
            return {
                ...recipe,
                img_url: recipe.img_url ?? DEFAULT_IMG
            };
        });
        return data;
    }

    async function fetchRecipe(id) {
        const { recipe } = await efetch(`${baseUrl}/${id}`);
        return {
            ...recipe,
            img_url: recipe.img_url ?? DEFAULT_IMG
        };
    }

    async function createRecipe(recipe) {
        return efetch(baseUrl, {
            method: 'POST',
            body: recipe,
            img_url: recipe.img_url ?? DEFAULT_IMG
        });
    }
    
    async function updateRecipe(id, recipe) {
        return efetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            body: recipe,
            img_url: recipe.img_url ?? DEFAULT_IMG
        });
    }

    async function deleteRecipe(id) {
        return efetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
    }
    return {
        fetchLatestRecipes,
        fetchPopularRecipes,
        fetchFilterRecipes,
        fetchRecipe,
        createRecipe,
        updateRecipe,
        deleteRecipe,
    };
}
export default makeRecipesService();

//saveRecipe has not implemented