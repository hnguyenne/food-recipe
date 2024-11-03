<script setup>

</script>
<template>
    <h1>food recipe</h1>
    <router-link
        :to="{
            name: 'signup',
        }"
    >
        <span class="mt-2 badge text-bg-warning">
            <i class="fas fa-edit"> Đăng Ký</i>
        </span>
    </router-link>
</template>