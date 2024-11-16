<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import accountService from '@/services/accounts.service';
import { useMutation } from '@tanstack/vue-query';
import LoginForm from '@/components/LoginForm.vue';

const router = useRouter();
const message = ref('');
const userlogin = ref({});

const loginMutation = useMutation({
    mutationFn: (userlogin) => accountService.login(userlogin),
    onSuccess: (data) => {
        message.value = 'Đăng nhập thành công!';
        localStorage.setItem('user_login', JSON.stringify(data.user));
        router.push({ name: 'foodrecipe' }).then(() => {
            window.location.reload();
        });;
    },
    onError: (error) => {
        message.value = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
        console.error(error);
    },
});

function onLogin(userlogin) {
    loginMutation.mutate(userlogin);
}
</script>

<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <LoginForm :userlogin="userlogin" @submit:userlogin="onLogin" />
        <p>{{ message }}</p>
        <div>
            <p>
                Bạn chưa có tài khoản?             
                <router-link
                    :to="{
                        name: 'signup',
                    }"
                >
                        Đăng Ký
                </router-link>
            </p>

        </div>
    </div>
</template>

<style scoped>
.page {
    text-align: center;
    width: 40%;
    margin: 0 auto;
}

button {
    background-color: #6A9C89;
    text-decoration: none;
    color: #ffffff;
}

button:hover {
  background-color: #54796a;
  color: #ffffff;
}
</style>