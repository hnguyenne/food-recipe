<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import recipesService from '@/services/recipes.service';
import MainPagination from '@/components/MainPagination.vue';
import RecipeList from '@/components/RecipeList.vue';
import { useQuery } from '@tanstack/vue-query';

const route = useRoute();
const router = useRouter();

const totalPages = ref(1);
const limit = 12;

// current page is from the query string (?page=1)
const currentPage = computed(() => {
    const page = Number(route.query?.page);
    if (Number.isNaN(page) || page < 1) return 1;
    return page;
});

defineProps({
    recipes: { type: Array, default: () => []},
});


const { data: latestRecipes } = useQuery({
    queryKey: ['latestRecipes', currentPage],
    queryFn: () => recipesService.fetchLatestRecipes(currentPage.value, limit),
    select: (data) => {
      console.log (data.metadata)
        totalPages.value = data.metadata?.lastPage || 1
        console.log(totalPages.value)
        return data.recipes;
    },
    throwOnError: (error) => {
        console.log(error);
    }
})

function changeCurrentPage(page) {
    router.push({ name: 'latestRecipe', query: { page } });
}

</script>
<template>
  <div v-if="latestRecipes?.length > 0">
    <RecipeList 
      :recipes="latestRecipes"
      class="d-inline-flex"
    />
  </div>
    <MainPagination
      :total-pages="totalPages"
      :current-page="currentPage"
      @update:current-page="changeCurrentPage"
    />
</template>