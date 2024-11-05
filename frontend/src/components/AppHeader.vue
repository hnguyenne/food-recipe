<script setup>
import { useRouter } from 'vue-router';
import InputSearch from  '@/components/InputSearch.vue';
import { ref } from 'vue';

const router = useRouter();
const searchText = ref('');

function goToSearch() {
    if (searchText.value.trim()) {
        router.push({ name: 'Search', query: { text: searchText.value } });
    }
}

</script>
<template>
    <nav class="navbar navbar-expand bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <a
                href="/"
                class="navbar-brand"
            >Food Recipes Blog</a>
            <div class="me-auto navbar-nav">
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'foodrecipe' }"
                        class="nav-link"
                    >
                        Logo
                    </router-link>
                </li>
            </div>
            <InputSearch v-model="searchText"
                class=""
                @submit="goToSearch"/>
            <router-link
                :to="{
                    name: 'signup',
                }"
            >
                <span class="mt-2 badge button px-3 py-2">
                    Đăng Ký
                </span>
            </router-link>
                        <router-link
                :to="{
                    name: 'login',
                }"
            >
                <span class="mt-2 badge button px-3 py-2">
                    Đăng Nhập
                </span>
            </router-link>
        </div>
    </nav>
</template>
<style>
.button {
    background-color: #6A9C89;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: none;
    margin-left: 10px;
}

.button:hover {
  background-color: #54796a;
  color: #ffffff;
}
</style>