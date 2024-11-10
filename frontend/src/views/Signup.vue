<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AccountForm from '@/components/AccountForm.vue';
import accountService from '@/services/accounts.service';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const router = useRouter();
const queryClient = useQueryClient();
const message = ref('');
const user = ref({});

const signupMutation = useMutation({
    mutationFn: (user) => accountService.createAccount(user),
    onSuccess: () => {
        message.value = 'Đăng ký thành công';
        queryClient.invalidateQueries(['users']);
        router.push({ name: 'login'});
    },
    onError: (error) => console.log(error)
});

function onSignup(user) {
    signupMutation.mutate(user);
}
</script>

<template>
    <div class="page">
        <h4>Đăng ký</h4>
        <AccountForm :user="user" @submit:user="onSignup"/>
        <p>{{ message }}</p>
    </div>
</template>

<style>
.page {
    text-align: center;
    width: 40%;
    margin: 0 auto;
}
</style>