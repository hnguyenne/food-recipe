<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import recipeService from '@/services/recipes.service';
import MainPagination from '@/components/MainPagination.vue';

const recipes = ref([]);
const route = useRoute();
const router = useRouter();

const totalPages = ref(1);
const limit = 20;

// current page is from the query string (?page=1)
const currentPage = computed(() => {
    const page = Number(route.query?.page);
    if (Number.isNaN(page) || page < 1) return 1;
    return page;
});

async function getSearchRecipes(page) {
  const query = route.query.text;
  if (query) {
    const results = await recipeService.fetchFilterRecipes(query, page, limit);
    recipes.value = results.recipes;
    totalPages.value = results.metadata?.lastPage ?? 1;
  }
}

function changeCurrentPage(page) {
    const text = route.query.text;
    router.push({ name: 'Search', query: { page, text } });
}

onMounted(getSearchRecipes);
watch(() => route.query.text, getSearchRecipes);

</script>
<template>
    <MainPagination
                    :total-pages="totalPages"
                    :current-page="currentPage"
                    @update:current-page="changeCurrentPage"
                />
</template>