<script setup>
defineProps({
    review: {type: Object, required: true},
})
</script>
<template>
    <div class = "review">
        <strong>{{  review.USER_NAME }}</strong><br>
        <em> {{ new Date(review?.REVIEW_CREATE_AT).toLocaleString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</em>
        <br>{{  review.RATE }} / 5 <hr>
        <p>{{  review.COMMENT }}</p>
    </div>
    <hr>
</template>
<style scoped>
.review{
    background-color: lightgoldenrodyellow;
    margin: 20px;
    border-radius: 20px;
    padding: 15px;
}
</style>