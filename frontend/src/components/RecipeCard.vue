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
                params: { recipe_id: Number(recipe.recipe_id) }
            }"
        >
            <div>
                {{ recipe.tittle }}
            </div>
            <div class="p-1 w-75 h-75">
                <img class="img-fluid img-thumbnail" :src="recipe.img_url" alt=""/>
            </div>  
        </router-link>

    </div>
</template>