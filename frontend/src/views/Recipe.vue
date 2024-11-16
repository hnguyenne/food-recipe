@ -1,127 +1,114 @@
<script setup>
import recipesService from '@/services/recipes.service';
import reviewsService from '@/services/reviews.service';
import ReviewForm from '@/components/ReviewForm.vue';
import ReviewList from '@/components/ReviewList.vue';
import ReviewUpdate from '@/components/ReviewUpdate.vue';
import { computed, ref, toRaw } from 'vue';
import { useQuery, useMutation } from '@tanstack/vue-query';

const user_session = JSON.parse(localStorage.getItem('user_login'));
const userId = user_session ? user_session.USER_ID : null;
const message = ref('');
const message_review = ref('');


const props = defineProps({
    recipeId: {
        type: Number,
        required: true
    },
    recipe: {
        type: Object,
        default: () => {},
    },
    reviews: {
        type: Array,
        default: () => [],
    },
    review_id: {
        type: Number,
        default: null
    },
    newReview: {
        type: Object,
        default: () => {}
    }
})

const addReviewMutation = useMutation({
    mutationFn: (newReview) => reviewsService.addReview(newReview),
    onSuccess: () => {
        message_review.value = 'Review added successfully!';
    },
    onError: (error) => {
        console.error(error);
    }
})

function onAddReview(newReview){
    newReview.append('recipe_id', props.recipeId);
    newReview.append('user_id', userId);
    addReviewMutation.mutate(newReview);
}

const { data: reviews } = useQuery({
    queryKey: ['reviews', props.recipeId],
    queryFn: () => reviewsService.getReviews(props.recipeId),
    select: (data) => {
        return data.comments;
    },
    throwOnError: (error) => {
        console.error(error);
    },
    enabled:!!props.recipeId,
})

const { data: userReview } = useQuery({
    queryKey: ['userReview', userId, props.recipeId],
    queryFn: () => reviewsService.getUserReview(userId, props.recipeId),
    select: (data) => {
        return data.review;
    },
    throwOnError: (error) => {
        console.error(error);
    },
})

const { data: recipe } = useQuery({
    queryKey: ['recipe', props.recipeId],
    queryFn: () => recipesService.fetchRecipe(props?.recipeId),
    select: (data) => {
        data.recipe.img_url = data.recipe.IMG_URL ?? data.img_url;
        return data.recipe;
    },
    throwOnError: (error) => {
        console.error(error);
    },
    enabled: !!props.recipeId,
})



const addToFavoritesMutation = useMutation({
    mutationFn: (recipeId) => recipesService.addToFavorite(userId, recipeId),
    onSuccess: () => {
        message.value = 'Công thức đã được thêm vào danh sách yêu thích của bạn';
    },
    onError: (error) => {
        console.log( error);
        message.value = 'Failed to save to favorites.';
    },
});

function onAddtoFavorite(){
    addToFavoritesMutation.mutate(props.recipeId)
}

</script>

<template>
    <div class="page col-10 mx-auto" v-if="recipe">
        <div class="font-weight-bold">
            <h1>{{ recipe.TITTLE }}</h1>
        </div>
        <div>
            Được tạo vào {{ new Date(recipe.RECIPE_CREATE_AT).toLocaleString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}
        </div>
        <div class="p-1 w-75 h-75">
            <img class="img-fluid img-thumbnail" :src="recipe.img_url ?? recipe.IMG_URL" alt=""/>
        </div> 
        <div class = "p-1">
            {{ recipe.TAGS }}
        </div>
        <div class = "p-1">
            <h3>Thông tin chi tiết: </h3>
            {{ recipe.DESCRIPTION }}
        </div>
        <div class = "p-1">
            <p>Thời gian chuẩn bị: {{ recipe.PREP_TIME }}</p>
        </div>
        <div class = "p-1">
            <p>Thời gian chế biến: {{ recipe.COOK_TIME }}</p>
        </div>
        <div class = "p-1">
            <p>Lượng khẩu phần: {{ recipe.SERVINGS }}</p>
        </div>
        <div class = "p-1">
            <p>Cách thực hiện: {{ recipe.INSTRUCTION }}</p>
        </div>
        <div v-if="recipe.NOTE">
            <i>Note: </i> {{ recipe.NOTE }}
        </div>
        <div v-if="userId">
            <button @click="onAddtoFavorite">Thêm vào danh sách yêu thích</button>
            <p>{{  message }}</p>
        </div>
        <router-link v-if="recipe.USER_ID == userId"
                :to="{
                    name: 'recipe.edit',
                    params: { recipe_id:  recipe.recipe_id },
                }"
                >
                <span class="mt-2 badge text-bg-warning">
                    <i class="fas fa-edit"> Hiệu chỉnh</i>
                </span>
        </router-link>
        <div v-if="userReview" class="mt-5">
            <h2>Thay đổi giá của bạn:</h2>
            <ReviewUpdate :reviewId="userReview.REVIEW_ID"
                :recipeId="props.recipeId"
                :userId="userId"/>
        </div>
        <div v-else class="mt-5">
            <h2>Thêm đánh giá của bạn</h2>
            <ReviewForm :newReview="newReview"
                @submit:newReview="onAddReview"/>
        </div>
        <ReviewList 
            :reviews="reviews"
        />
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>
<style scoped>
</style>