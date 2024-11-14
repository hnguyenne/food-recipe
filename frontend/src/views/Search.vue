<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import recipesService from '@/services/recipes.service';
import MainPagination from '@/components/MainPagination.vue';
import RecipeList from '@/components/RecipeList.vue';
import { useQuery } from '@tanstack/vue-query';

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

const text = computed(() => {
    const text = route.query?.text;
    if (!text) return '';
    return text;
});

defineProps({
    recipes: { type: Array, default: () => []},
});


const { data: recipes } = useQuery({
    queryKey: ['recipes', currentPage, text],
    queryFn: () => recipesService.fetchFilterRecipes(text.value, currentPage.value, limit),
    select: (data) => {
      console.log(data.recipes);
      return data.recipes;
    },
    throwOnError: (error) => {
        console.log(error);
    }
})

function changeCurrentPage(page) {
    router.push({ name: 'Search', query: { page, text: text.value } });
}

</script>
<template>
  <div v-if="recipes?.length > 0">
    <RecipeList 
      :recipes="recipes"
      class="d-inline-flex"
    />
  </div>
    <MainPagination
      :total-pages="totalPages"
      :current-page="currentPage"
      @update:current-page="changeCurrentPage"
    />
</template>