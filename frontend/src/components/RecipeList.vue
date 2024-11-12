<script setup>
import RecipeCard from '@/components/RecipeCard.vue'

defineProps({
    recipes: { type: Array, default: () => [] },
});
</script>
<template>
    <ul>
        <li
            class="list-group-item px-3"
            v-for="(recipe) in recipes"
        >
            <RecipeCard :recipe="recipe"
                class="col-md-10"/>
        </li>
    </ul>
</template>