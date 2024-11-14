<script setup>
defineProps({
    review: {type: Object, required: true},
})
</script>
<template>
    <div class="col-md-12">
        {{  review.USER_NAME }}:
        {{  review.RATE }}
        <p>{{  review.COMMENT }}</p>
    </div>
</template>
<style scoped>

</style>