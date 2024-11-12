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
                {{ recipe.TITTLE ?? recipe.tittle}}
            </div>
            <div class="p-1 w-100 h-100">
                <img class="img-fluid img-thumbnail" :src="recipe.img_url ?? recipe.IMG_URL" alt=""/>
            </div>  
        </router-link>

    </div>
</template>