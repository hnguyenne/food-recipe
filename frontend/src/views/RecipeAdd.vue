<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RecipeForm from '@/components/RecipeForm.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import recipesService from '@/services/recipes.service';

const router = useRouter();
const recipe = ref({});
const message = ref('');
const queryClient = useQueryClient();

const addRecipeMutation = useMutation({
    mutationFn: (recipe) => recipesService.createRecipe(recipe),
    onSuccess: () => {
        message.value = 'Công thức được thêm thành công.';
        queryClient.invalidateQueries(['recipes']); 
        router.push({ name: 'Recipe.add' });
    },
    onError: (error) => console.log(error),
});

function onAddRecipe(recipe) {
    addRecipeMutation.mutate(recipe);
}

</script>
<template>
    <div>
        <h4>Thêm công thức mới</h4>
        <RecipeForm :recipe="recipe" @submit:recipe="onAddRecipe" />
        <p>{{ message }}</p>
    </div>
</template>