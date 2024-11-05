<script setup>
defineProps({
    recipe: {type: object, required: true},
})
</script>
<template>
    <div>
        <div class="p-1 w-75 h-75">
            <img class="img-fluid img-thumbnail" :src="recipe.img_url" alt=""/>
        </div>
        <div class="p-1">
            <strong></strong>
            {{ recipe.tittle }}
        </div>
    </div>
</template>