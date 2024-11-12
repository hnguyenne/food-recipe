<script setup>
import { computed } from 'vue';
import recipesService from '@/services/recipes.service';
import { useQuery, useMutation } from '@tanstack/vue-query';

const props = defineProps({
    recipeId: {
        type: Number,
        required: true
    },
    recipe: {
        type: Object,
        default: () => {},
    }
})

const { data: recipe } = useQuery({
    queryKey: ['recipe', props.recipeId],
    queryFn: () => recipesService.fetchRecipe(props.recipeId),
    select: (data) => {
        console.log(data.recipe)
        data.recipe.img_url = data.recipe.IMG_URL ?? data.img_url;
        return data.recipe;
    },
    throwOnError: (error) => {
        console.error(error);
    },
    enabled: !!props.recipeId,
})
</script>

<template>
    <div class="page" v-if="recipe">
        <div>
            {{ recipe.TITTLE }}
        </div>
        <div>
            {{ recipe.RECIPE_CREATE_AT }}
        </div>
        <div class="p-1 w-75 h-75">
            <img class="img-fluid img-thumbnail" :src="recipe.img_url ?? recipe.IMG_URL" alt=""/>
        </div> 
        <div class = "p-1">
            {{ recipe.TAGS }}
        </div>
        <div class = "p-1">
            <h3>Thông tin chi tiết: </h3>
            {{ recipe.DESCRIPTION }}
        </div>
        <div class = "p-1">
            <p>Thời gian chuẩn bị: {{ recipe.PREP_TIME }}</p>
        </div>
        <div class = "p-1">
            <p>Thời gian chế biến: {{ recipe.COOK_TIME }}</p>
        </div>
        <div class = "p-1">
            <p>Lượng khẩu phần: {{ recipe.SERVINGS }}</p>
        </div>
        <div class = "p-1">
            <p>Cách thực hiện: {{ recipe.INSTRUCTION }}</p>
        </div>
        <div v-if="recipe.NOTE">
            <i>Note: </i> {{ recipe.NOTE }}
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>