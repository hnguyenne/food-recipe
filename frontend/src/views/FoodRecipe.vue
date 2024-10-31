<script setup>
import { InputSearch } from  './InputSearch.vue';

const searchText = ref('');

const searchableContacts = computed(() =>
    contacts.value.map((recipe) => {
        const { tittle, description, tags } = recipe;
        return [tittle, description, tags].join('');
    })
);

// Recipes filtered by searchText
const filteredRecipes = computed(() => {
    if (!searchText.value) return recipes.value;
        return recipes.value.filter((recipe, index) =>
            searchableRecipes.value[index].includes(searchText.value)
    );
});

const selectedRecipe = computed(() => {
    if (selectedIndex.value < 0) return null;
        return filteredRecipes.value[selectedIndex.value];
});

watch(searchText, () => (selectedIndex.value = -1));
</script>
<template>
    <h1>food recipe</h1>
    <InputSearch v-model="searchText"/>
    
</template>