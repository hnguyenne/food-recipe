<script setup>
import { useRouter } from 'vue-router';
import InputSearch from  '@/components/InputSearch.vue';
import { ref } from 'vue';

const router = useRouter();
const searchText = ref('');

function goToSearch(text) {
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
                        HomePage
                    </router-link>
                </li>
            </div>
            <InputSearch v-model="searchText"
                @submit="goToSearch"/>
        </div>
    </nav>
</template>