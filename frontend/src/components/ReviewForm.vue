<script setup>
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';

const props = defineProps({
    newReview: { type: Object, required: true },
});

const $emit = defineEmits(['submit:newReview']);

function submitReview(values) {
    let formData = new FormData();
    for (let key in values){
        if (values[key] !== undefined){
            formData.append(key, values[key]);
        }
    }
    $emit('submit:newReview', formData);
}
const rate = ref(1);
</script>

<template>
    <div class="mt-2">
        <h3>Thêm nhận xét của bạn</h3>
        <Form class="mb-6"@submit = "submitReview">
            <div class="mb-3">
                <label for="rate">Điểm số </label>
                <Field type="range" v-model="rate" name="rate" min="1" max="5" step="1" class="mx-2 mt-1" /> <span>{{ rate }}</span>
            </div>  
            <div class="mb-3">
                <label for="comment" class="form-label">Nhận xét</label>
                <Field 
                    name="comment"
                    type="text"
                    class="form-control"
                />
            </div>
            <div class="mb-3">
                <button class="btn">
                    Nhận xét
                </button>
            </div>
        </Form>
    </div>
</template>

<style scoped>
button {
    background-color: #6A9C89;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: none;
    color: #ffffff;
}

button:hover {
  background-color: #54796a;
  color: #ffffff;
}
</style>