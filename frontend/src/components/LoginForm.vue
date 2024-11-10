<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const props = defineProps({
    user: { type: Object, required: true },
});

const $emit = defineEmits(['submit:user']);

let validationSchema = toTypedSchema(
    z.object({
        user_email: z.string().min(1, {message: "Email không được để trống"}),
        password: z.string().min(6, {message: "Mật khẩu phải ít nhất 6 kí tự"}),
    })
);

function submitUser(values) {
    let formData = new FormData();
    for (let key in values){
        if (values[key] !== undefined){
            formData.append(key, values[key]);
        }
    }
    $emit('submit:user', formData);
}
</script>

<template>
    <div>
        <Form class="mb-6" :validation-schema="validationSchema" @submit = "submitUser">
            <div class="mb-3">
                <label for="user_email" class="form-label">E-mail</label>
                <Field 
                    name="user_email"
                    type="email"
                    class="form-control"
                />
                <ErrorMessage name="user_email" class="error-feedback"/>
            </div>  
            <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <Field 
                    name="password"
                    type="password"
                    class="form-control"
                />
                <ErrorMessage name="password" class="error-feedback"/>
            </div>
            <div class="mb-3">
                <button class="btn">
                    Đăng nhập
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