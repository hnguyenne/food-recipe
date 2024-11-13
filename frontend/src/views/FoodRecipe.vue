<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import recipesService from '@/services/recipes.service';
import { useQuery, useMutation } from '@tanstack/vue-query';
import RecipeList from '@/components/RecipeList.vue'

defineProps({
    latestRecipes: { type: Array, default: () => []},
    popularRecipes: { type: Array, default: () => []},
});

const { data: latestRecipes } = useQuery({
    queryKey: ['latestRecipes', 1],
    queryFn: () => recipesService.fetchLatestRecipes(1,10),
    select: (data) => {
        console.log(data.recipes)
        return data.recipes;
    },
    throwOnError: (error) => {
        console.log(error);
    }
})

const { data: popularRecipes } = useQuery({
    queryKey: ['popularRecipes', 1],
    queryFn: () => recipesService.fetchPopularRecipes(1, 10),
    select: (data) => {
        return data.recipes;
    },
    throwOnError: (error) => {
        console.log(error);
    }
})

const userLogin = ref('');

onMounted(() => {
  const session = localStorage.getItem('user_login');
  if (session) {
    userLogin.value = session;
    console.log(userLogin);
  }
});

</script>
<template>
    <div>
        <h1>Food Recipe</h1>
        <div>
            <router-link
                :to="{
                    name: 'Recipe.add',
                }"
            >
                <span v-if="userLogin" class="mt-2 badge button px-3 py-2">
                    Thêm công thức mới
                </span>
            </router-link>
        </div>
        <div>
            <h2>Công thức mới nhất</h2>
            <RecipeList v-if="latestRecipes?.length > 0"
                :recipes="latestRecipes"
            />
            <p v-else>Không có công thức mới</p>
        </div>
        <div>
            <h2>Công thức nổi bật</h2>
            <RecipeList v-if="popularRecipes?.length > 0"
                :recipes="popularRecipes"
            />
            <p v-else>Không có công thức nổi bật</p>
        </div>
    </div>
</template>