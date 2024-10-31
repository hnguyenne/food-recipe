<script setup>
defineProps({
    recipes: { type: Array, default: () => [] },
    selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);
</script>
<template>
    <ul class="list-group">
        <li
            class="list-group-item px-3"
            v-for="(recipe, index) in recipes"
            :class="{ active: index === selectedIndex }"
            :key="recipe.recipe_id"
            @click="$emit('update:selectedIndex', index)"
        >
            <div>
                {{ recipe.tittle }}
            </div>
            <div class="p-1 w-75 h-75">
                <img class="img-fluid img-thumbnail" :src="recipe.img_url" alt=""/>
            </div>
        </li>
    </ul>
</template>