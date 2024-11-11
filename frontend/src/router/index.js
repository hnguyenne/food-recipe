import { createWebHistory, createRouter } from 'vue-router';
import FoodRecipe from '@/views/FoodRecipe.vue';
import { compile } from 'vue';

const routes = [
    {
        path: '/',
        name: 'foodrecipe',
        component: FoodRecipe,
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/Signup.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/Search.vue'),
    },
    {
        path: '/recipes/add',
        name: 'Recipe.add',
        component: () => import('@/views/RecipeAdd.vue')
    },
    {
        path: '/recipes/:id/edit',
        name: 'recipe.edit',
        component: () => import('@/views/RecipeEdit.vue'),
        props: (route) => ({ recipeId: route.params.id })
    },
    {
        path: '/recipes/:id',
        name: 'Recipe',
        component: () => import('@/views/Recipe.vue'),
        props: (route) => ({ recipeId: route.params.recipe_id })
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;