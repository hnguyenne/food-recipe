<script setup>
const model = defineModel({
    type: String,
    default: '',
});
</script>
<template>
<div class="input-group w-50">
    <input
        type="text"
        class="form-control px-3"
        placeholder="Tìm công thức..."
        v-model="model"
        @keyup.enter="$emit('submit', modelValue)"
    />
    <button
        class="btn btn-outline-light bg-transparent"
        type="button"
        @click="$emit('submit')"
    >
        <i class="fas fa-search"></i>
    </button>
</div>
</template>