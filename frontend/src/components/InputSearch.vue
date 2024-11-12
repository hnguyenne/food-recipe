<script setup>
const model = defineModel({
    type: String,
    default: '',
});

const emit = defineEmits(['submit']);

function handleSubmit() {
    emit('submit');
}
</script>
<template>
<div class="input-group w-50">
    <input
        type="text"
        class="form-control px-3"
        placeholder="Tìm công thức..."
        v-model="model"
        @keyup.enter="handleSubmit"
    />
    <button
        class="btn btn-outline-light bg-transparent"
        type="button"
        @click="handleSubmit"
    >
        <i class="fas fa-search"></i>
    </button>
</div>
</template>