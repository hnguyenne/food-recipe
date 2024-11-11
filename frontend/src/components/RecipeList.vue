<script setup>
import RecipeCard from '@/components/RecipeCard.vue'

defineProps({
    recipes: { type: Array, default: () => [] },
    selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);
</script>
<template>
    <ul>
        <li
            class="list-group-item px-3"
            v-for="(recipe, index) in recipes"
            :class="{ active: index === selectedIndex }"
            :key="recipe.recipe_id"
            @click="$emit('update:selectedIndex', index)"
        >
            <RecipeCard :recipe="recipe"/>
        </li>
    </ul>
</template>