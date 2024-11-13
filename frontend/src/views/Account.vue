<script setup>
import { useQuery } from '@tanstack/vue-query';
import accountService from '@/services/accounts.service'

const user_session = JSON.parse(localStorage.getItem('user_login'));
const userId = user_session ? user_session.USER_ID : null;

const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => accountService.fetchAccount(userId),
    select: (data) => {
        return data.user;
    },
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

</script>

<template>
    <div class="page col-10 mx-auto">
        <div>
            {{ user?.PROFILE_PIC }}
        </div>
        <div>
            <p>Tên người dùng {{ user?.USER_NAME }}</p>
        </div>
        <div>
            <p>Email {{ user?.USER_EMAIL }}</p>
        </div>
        <div>
            <p>Ngày tháng năm sinh {{ user?.USER_BIRTH_DATE }}</p>
        </div>
        <div>
            <p>Thời gian lập tài khoản {{ user?.USER_CREATE_AT }}</p>
        </div>
        <router-link
                :to="{
                    name: 'user.edit',
                    params: { user_id:  userId },
                }"
                >
                <span class="mt-2 badge text-bg-warning">
                    <i class="fas fa-edit"> Hiệu chỉnh</i>
                </span>
        </router-link>
    </div>
</template>