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
    queryFn: () => recipesService.fetchLatestRecipes(1,8),
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
    queryFn: () => recipesService.fetchPopularRecipes(1, 8),
    select: (data) => {
        return data.recipes;
    },
    throwOnError: (error) => {
        console.log(error);
    }
})

</script>
<template>
    <div>
        <div>
            <router-link
                :to="{
                    name: 'Recipe.add',
                }"
            >
                <span class="mt-2 badge button px-3 py-2 mb-2">
                    Thêm công thức mới
                </span>
            </router-link>
        </div>
        <div>
            <router-link
                :to="{
                    name: 'latestRecipe',
                }"
            >
                <h2 class="text-decoration-none">Công thức mới nhất</h2>
            </router-link>
            <RecipeList v-if="latestRecipes?.length > 0"
                :recipes="latestRecipes"
                class="mt-2"
            />
            <p v-else>Không có công thức mới</p>
        </div>
        <div>
            <router-link
                :to="{
                    name: 'popularRecipe',
                }"
            >
                <h2>Công thức nổi bật</h2>
            </router-link>
            
            <RecipeList v-if="popularRecipes?.length > 0"
                :recipes="popularRecipes"
                class="mt-2"
            />
            <p v-else>Không có công thức nổi bật</p>
        </div>
    </div>
</template>
<style scoped>
h2 {
    display: inline-block;
    text-decoration: none;
    color: #333;
    position: relative;
}

h2::after{
      content: ''; 
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px; 
      background-color: #333;
      transition: width 0.3s ease;    
}

h2:hover::after{
    width: 100%;
}

a { 
    text-decoration: none; 
}
</style>