<script setup>
import { useQuery } from '@tanstack/vue-query';
import accountService from '@/services/accounts.service'
import RecipeList from '@/components/RecipeList.vue';
import { DEFAULT_PIC } from '@/constants';
const user_session = JSON.parse(localStorage.getItem('user_login'));
const userId = user_session ? user_session.USER_ID : null;

const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => accountService.fetchAccount(userId),
    select: (data) => {
        data.user.profile_pic = data.user.PROFILE_PIC ?? data.profile_pic;
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

const { data: recipes } = useQuery({
    queryKey: ['recipess', userId],
    queryFn: () => accountService.getFavorite(userId),
    select: (data) => {
        console.log(data.recipes);
        return data.recipes;
    },
    OnError: (error) => {
        console.log(error);
    }
})
</script>

<template>
    <div class="mt-3 p-3 align-items-center row col-10 offset-1">
        <div>
            <h2>Tên người dùng: {{ user?.USER_NAME }}</h2>
        </div>
        <div class="p-1 w-75 h-75">
            <img class="img-fluid img-thumbnail" :src="user?.profile_pic ?? DEFAULT_PIC" alt=""/>
        </div>
        <div>
            <p class="fs-5">Email: {{ user?.USER_EMAIL }}</p>
        </div>
        <div>
            <p class="fs-5">Ngày tháng năm sinh: {{ new Date(user?.USER_BIRTHDATE).toISOString().split('T')[0].split('-').reverse().join('-') }}</p>
        </div>
        <div>
            <p class="fs-5">Thời gian lập tài khoản: {{ new Date(user?.USER_CREATE_AT).toLocaleString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</p>
        </div>
        <router-link
                :to="{
                    name: 'user.edit',
                    params: { user_id:  userId },
                }"
                >
                <span class="mt-2 badge text-bg-warning mb-2">
                    <i class="fas fa-edit"> Hiệu chỉnh thông tin tài khoản</i>
                </span>
        </router-link>
        <br> <hr>
        <div>
            <h3>Danh sách các công thức yêu thích của bạn</h3>
        </div>
        <RecipeList v-if="recipes?.length > 0" :recipes="recipes"/>
        <p v-else> Bạn chưa lưu công thức nào, hãy tìm các công thức mới để thêm vào danh sách</p>
    </div>
</template>