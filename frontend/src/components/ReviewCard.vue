<script setup>
defineProps({
    review: {type: Object, required: true},
})
</script>
<template>
    <div>
        <strong>{{  review.USER_NAME }}:</strong>
        {{  review.RATE }}
        <p>{{  review.COMMENT }}</p>
        <hr>
    </div>
</template>
<style scoped>

</style>