<script setup>
defineProps({
    recipe: {type: Object, required: true},
})
import { computed } from 'vue';
import RecipeCard from '@/components/RecipeCard.vue';
const selectedRecipe = computed(() => {
    return recipe;
});
</script>

<template>
    <RecipeCard :recipe="selectedRecipe"></RecipeCard>
</template>