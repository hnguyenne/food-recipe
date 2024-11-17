<script setup>
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import recipesService from '@/services/recipes.service'
import { useQueryClient } from '@tanstack/vue-query';

const message = ref('');
const user_session = JSON.parse(localStorage.getItem('user_login'));
const userId = user_session ? user_session.USER_ID : null;

const queryClient = useQueryClient();

const props = defineProps({
    recipe: {type: Object, required: true},
})

const deleteFromFavoritesMutation = useMutation({
    mutationFn: (recipeId) => recipesService.deleteFromFavorite(userId, recipeId),
    onSuccess: () => {
        queryClient.invalidateQueries(['favorite', userId]);
        message.value = 'Công thức đã xóa khỏi danh sách yêu thích của bạn';
    },
    onError: (error) => {
        console.log( error);
        message.value = 'Xóa yêu thích không thành công';
    },
});

function onDeleteFromFavorite(){
    deleteFromFavoritesMutation.mutate(props.recipe.RECIPE_ID);
}


</script>
<template>
    <div class="col-md-10 effect">
        <router-link
            :to="{
                name: 'recipe',
                params: { recipe_id: Number(recipe.RECIPE_ID ?? recipe.recipe_id) }
            }"
        >
            <div>
                <p class="title">{{ recipe.TITTLE ?? recipe.tittle}}</p>
            </div>
            <div class="p-1 w-20 h-auto">
                <img class="img-fluid img-thumbnail" :src="recipe.img_url ?? recipe.IMG_URL" alt=""/>
            </div>  
        </router-link>
    </div>
    <div v-if="recipe.FAVORITE_ID">
        <button class="badge text-bg-danger border border-0 col-md-10" @click="onDeleteFromFavorite">Xóa khỏi yêu thích</button>
        {{  message }}
    </div>

</template>
<style scoped>
.title {
    font-weight: bold;
}

a { 
    text-decoration: none;
    color: black;
}

.effect {
    transition:cubic-bezier() 0.5s ease;
}

.effect:hover {
    transform:scale(1.02);
}
</style>