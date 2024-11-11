<script setup>
defineProps({
    recipe: {type: Object, required: true},
})
</script>
<template>
    <div class="col-md-2">
        <div>
            {{ recipe.tittle }}
        </div>
        <div>
            {{ recipe.recipe_create_at }}
        </div>
        <div class="p-1 w-75 h-75">
            <img class="img-fluid img-thumbnail" :src="recipe.img_url" alt=""/>
        </div> 
        <div class = "p-1">
            {{ recipe.tags }}
        </div>
        <div class = "p-1">
            <h3>Thông tin chi tiết: </h3>
            {{ recipe.description }}
        </div>
        <div class = "p-1">
            <p>Thời gian chuẩn bị: {{ recipe.prep_time }}</p>
        </div>
        <div class = "p-1">
            <p>Thời gian chế biến: {{ recipe.cook_time }}</p>
        </div>
        <div class = "p-1">
            <p>Lượng khẩu phần: {{ recipe.servings }}</p>
        </div>
        <div class = "p-1">
            <p>Cách thực hiện: {{ recipe.instruction }}</p>
        </div>
        <div v-if="recipe.note">
            <i>Note: </i> {{ recipe.note }}
        </div>
    </div>
</template>