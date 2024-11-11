<script setup>
import { useRouter } from 'vue-router';
import InputSearch from  '@/components/InputSearch.vue';
import { ref, onMounted } from 'vue';

const router = useRouter();
const searchText = ref('');

function goToSearch() {
    if (searchText.value.trim()) {
        router.push({ name: 'Search', query: { text: searchText.value } });
    }
}

const userLogin = ref('');

onMounted(() => {
  const session = localStorage.getItem('user_login');
  if (session) {
    userLogin.value = session;
  }
});

function logout() {
  localStorage.removeItem('user_login');
  
  userLogin.value = '';
}
</script>
<template>
    <nav class="navbar navbar-expand header" data-bs-theme="light">
        <div class="container-fluid">
            <div class="me-auto navbar-nav">
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'foodrecipe' }"
                        class="nav-link"
                    >
                        <img src='/logo.png' class="custom-logo" />
                    </router-link>
                </li>
            </div>
            <InputSearch v-model="searchText"
                class=""
                @submit="goToSearch"/>
            <div v-if="userLogin">
                <span class="badge button px-3 py-3"
                    @click="logout">
                    Đăng xuất
                </span>
            </div>
            <div v-else>
                <router-link
                    :to="{
                        name: 'signup',
                    }"
                >
                    <span class="badge button px-3 py-3">
                        Đăng Ký
                    </span>
                </router-link>
                            <router-link
                    :to="{
                        name: 'login',
                    }"
                >
                    <span class="badge button px-3 py-3">
                        Đăng Nhập
                    </span>
                </router-link>
            </div>
        </div>
    </nav>
</template>
<style>
.button {
    background-color: #C1D8C3;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: none;
    margin-left: 10px;
    color: #2f7458;
}

.button:hover {
  background-color: #6A9C89;
  color: #ffffff;
}

.custom-logo {
    width: 60px;
}

.header {
    background-color: #e45700;
}
</style>