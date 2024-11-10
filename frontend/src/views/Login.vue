<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import accountService from '@/services/accounts.service';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import LoginForm from '@/components/LoginForm.vue';

const router = useRouter();
const queryClient = useQueryClient();
const message = ref('');
const user = ref({});

const loginMutation = useMutation({
    mutationFn: (user) => accountService.login(user),
    onSuccess: () => {
        message.value = 'Đăng nhập thành công!';
        queryClient.invalidateQueries(['users']);
        router.push({ name: 'foodrecipe' });
    },
    onError: (error) => {
        message.value = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
        console.error(error);
    },
});

function onLogin(user) {
    loginMutation.mutate(user);
}
</script>

<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <LoginForm :user="user" @submit:user="onLogin" />
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
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: none;
    color: #ffffff;
}

button:hover {
  background-color: #54796a;
  color: #ffffff;
}
</style>