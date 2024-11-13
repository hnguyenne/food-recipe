<script setup>
defineProps({
    recipe: {type: Object, required: true},
})
</script>
<template>
    <div class="col-md-10">
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
    text-decoration: none;
    color: black;
}
</style>