<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AccountForm from '@/components/AccountForm.vue';
import accountService from '@/services/accounts.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

const props = defineProps({
    userId: { type: String, required: true },
});
const router = useRouter();
const user_id = props.userId;
const route = useRoute();
const message = ref('');
const queryClient = useQueryClient();

const { data: user } = useQuery({
    queryKey: ['user', props.userId],
    queryFn: () => accountService.fetchAccount(user_id),
    onError: (error) => {
        console.log(error);
        router.push({
            name: 'notfound',
            params: { pathMatch: route.path.split('/').slice(1) },
            query: route.query,
            hash: route.hash,
        });
    }
});

console.log(user.user_id)
const updateAccountMutation = useMutation({
    mutationFn: (user) => accountService.updateAccount(user_id, user),
    onSuccess: () => {
        message.value = 'Bạn đã thay đổi thông tin tài khoản thành công';
        queryClient.invalidateQueries(['user', props.userId]); 
    },
    onError: (error) => console.log(error),
});

function onUpdateAccount(recipe) {
    updateAccountMutation.mutate(recipe);
}


</script>
<template>
    <div v-if="user" class="page">
        <h4>Thay đổi thông tin tài khoản</h4>
        <AccountForm :user="user" @submit:user="onUpdateAccount"/>
        <p>{{ message }}</p>
    </div>
</template>