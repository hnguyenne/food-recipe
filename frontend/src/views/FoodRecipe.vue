<script setup>
import InputSearch from  '@/components/InputSearch.vue';
import { ref, computed, watch } from 'vue';

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
    <router-link
        :to="{
            name: 'signup',
        }"
    >
        <span class="mt-2 badge text-bg-warning">
            <i class="fas fa-edit"> Đăng Ký</i>
        </span>
    </router-link>
</template>