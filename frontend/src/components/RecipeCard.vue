<script setup>
import { DEFAULT_IMG } from '@/constants';

defineProps({
    recipe: {type: Object, required: true},
})
</script>
<template>
    <div class="col-md-10 effect container">
        <router-link
            :to="{
                name: 'recipe',
                params: { recipe_id: Number(recipe.RECIPE_ID ?? recipe.recipe_id) }
            }"
        >
            <div>
                <p class="title">{{ recipe.TITTLE ?? recipe.tittle}}</p>
            </div>
            <div class="p-1 w-20 h-auto">
                <img class="img-fluid img-thumbnail" :src="recipe.img_url ?? recipe.IMG_URL" alt=""/>
            </div>  
        </router-link>

    </div>
</template>
<style scoped>
.title {
    font-weight: bold;
}

a { 
    text-decoration: none;
    color: black;
}

.effect {
    transition:cubic-bezier() 0.5s ease;
}

.effect:hover {
    transform:scale(1.02);
}

.container{
    background-color: white;
    margin: auto;
    border-radius: 20px;
}
</style>