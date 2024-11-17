<script setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import ReviewForm from '@/components/ReviewForm.vue';
import reviewsService from '@/services/reviews.service';
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();

const message_review = ref('');
const props = defineProps({
    recipeId: {
        type: Number,
        required: true
    },
    reviewId: {
        type: Number,
        default: null
    },
    userId: {
        type: Number,
        required: true
    },
    newReview: {
        type: Object,
        default: () => {}
    }
})

const updateReviewMutation = useMutation({
    mutationFn: (newReview) => reviewsService.updateReview(props.reviewId, newReview),
    onSuccess: () => {
        queryClient.invalidateQueries(['reviews', props.recipeId]);
        message_review.value = 'Review updated successfully!';
    },
    onError: (error) => {
        console.error(error);
    }
})

function onUpdateReview(newReview){
    newReview.append('recipe_id', props.recipeId);
    newReview.append('user_id', props.userId);
    console.log(newReview);
    updateReviewMutation.mutate(newReview);
}
</script>

<template>
<ReviewForm :newReview="newReview"
            @submit:newReview="onUpdateReview"/>
</template>