<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RecipeForm from '@/components/RecipeForm.vue';

</script>
<template>
    <div>
        <h4>Thêm công thức mới</h4>
        <RecipeForm :recipe="recipe" @submit:recipe="onAddRecipe" />
        <p>{{ message }}</p>
    </div>
</template>