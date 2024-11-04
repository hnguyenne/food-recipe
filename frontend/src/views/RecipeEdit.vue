<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import RecipeForm from '@/components/RecipeForm.vue';
import recipesService from '@/services/recipes.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

const props = defineProps({
    recipeId: { type: String, required: true },
});
const router = useRouter();

const route = useRoute();
const message = ref('');
const queryClient = useQueryClient();

const { data: recipe } = useQuery({
    queryKey: ['recipe', props.recipeId],
    queryFn: () => recipesService.fetchRecipe(props.recipeId),
    onError: (error) => {
        console.log(error);
        router.push({
            name: 'notfound',
            params: { pathMatch: route.path.split('/').slice(1) },
            query: route.query,
            hash: route.hash,
        });
    }
});

const updateRecipeMutation = useMutation({
    mutationFn: (recipe) => recipesService.updateRecipe(recipe.get('id'), recipe),
    onSuccess: () => {
        message.value = 'Công thức đã được thay đổi.';
        queryClient.invalidateQueries(['contact', props.recipeId]); 
    },
    onError: (error) => console.log(error),
});

const deleteRecipeMutation = useMutation({
    mutationFn: (id) => recipesService.deleteRecipe(id),
    onSuccess: () => {
        router.push({ name: 'recipe' });
    },
    onError: (error) => console.log(error),
});


function onUpdateRecipe(recipe) {
    updateRecipeMutation.mutate(recipe);
}

function onDeleteRecipe(id) {
    if (confirm('Bạn có chắc chắn muốn xóa công thức này?')) {
        deleteRecipeMutation.mutate(id);
    }
}

</script>
<template>
    <div v-if="recipe" class="page">
        <h4>Hiệu chỉnh Công thức</h4>
        <RecipeForm :recipe="recipe" @submit:recipe="onUpdateRecipe" @delete:recipe="onDeleteRecipe" />
        <p>{{ message }}</p>
    </div>
</template>