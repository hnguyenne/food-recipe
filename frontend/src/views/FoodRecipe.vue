<script setup>

</script>
<template>
    <h1>food recipe</h1>
    <div>
        <router-link
            :to="{
                name: 'Recipe.add',
            }"
        >
            <span class="mt-2 badge button px-3 py-2">
                Thêm công thức mới
            </span>
        </router-link>
    </div>
</template>