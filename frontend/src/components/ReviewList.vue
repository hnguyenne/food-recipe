<script setup>
import ReviewCard from '@/components/ReviewCard.vue'

defineProps({
    reviews: { type: Array, default: () => [] },
});
</script>
<template>
    <ul class="row">
        <li
            class="list-group-item px-3 col-md-12"
            v-for="(review) in reviews"
        >
            <ReviewCard :review="review"/>
        </li>
    </ul>
</template>