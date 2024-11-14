<script setup>
import RecipeCard from '@/components/RecipeCard.vue'

defineProps({
    recipes: { type: Array, default: () => [] },
});
</script>
<template>
    <ul class="row">
        <li
            class="list-group-item px-3 col-md-2 col-sm-4"
            v-for="(recipe) in recipes"
        >
            <RecipeCard :recipe="recipe"/>
        </li>
    </ul>
</template>