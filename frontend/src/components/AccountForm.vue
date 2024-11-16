<script setup>
import { ref, useTemplateRef, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { DEFAULT_IMG } from '@/constants';

const props = defineProps({
    user: { type: Object, required: true },
});

let imgFileInput = useTemplateRef('img-file-input');
let imgFile = ref(props.user.PROFILE_PIC ?? DEFAULT_IMG);
const $emit = defineEmits(['submit:user']);

let validationSchema = toTypedSchema(
    z.object({
        user_name: z.string().min(1, {message: "Tên không được để trống"}),
        user_email: z.string().min(1, {message: "Email không được để trống"}),
        user_birthdate: z.string().min(1, {message: "Không để trống ngày sinh"}),
        password: z.string().min(6, {message: "Mật khẩu phải ít nhất 6 kí tự"}),
        retype_password: z.string().min(6, {message: "Mật khẩu phải ít nhất 6 kí tự"}),
        profile_pic: z.instanceof(File).optional(),
    })
);

function previewImgFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
        imgFile.value = evt.target.result;
    }
    reader.readAsDataURL(file);
}

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
  <Form :validation-schema="validationSchema" @submit = "submitUser">
    <div class="mb-3">
      <label for="user_name" class="form-label">Tên</label>
      <Field
        name="user_name"
        type="text"
        class="form-control"
        :value="user.user_name ?? user.USER_NAME"
      />
      <ErrorMessage name="user_name" class="error-feedback"/>

    </div>
    <div class="mb-3">
      <label for="user_email" class="form-label">E-mail</label>
      <Field 
        name="user_email"
        type="email"
        class="form-control"
        :value="user.user_email ?? user.USER_EMAIL"
      />
      <ErrorMessage name="user_email" class="error-feedback"/>
    </div>

    <div class="mb-3">
      <label for="user_birthdate" class="form-label">Ngày sinh</label>
      <Field 
        name="user_birthdate"
        type="date"
        class="form-control"
        :value="user.user_birthdate ?? user.USER_BIRTHDATE"
      />
      <ErrorMessage name="user_birthdate" class="error-feedback"/>
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
      <label for="retype_password" class="form-label">Nhập lại mật khẩu</label>
      <Field 
        name="retype_password"
        type="password"
        class="form-control"
      />
      <ErrorMessage name="retype_password" class="error-feedback"/>
    </div>
    <div class="mb-3 w-50 h-50">
        <label for="imgFile">Avatar</label>
        <img
            class="img-fluid img-thumbnail"
            :src="imgFile"
            alt=""
            @click="imgFileInput.click()"
        />
        <Field name="imgFile" v-slot="{ handleChange }">
        <input
            type="file"
            class="d-none"
            ref="img-file-input"
            @change="
            (event) => {
                handleChange(event);
                previewImgFile(event);
            }
            "
          />
          </Field>
      </div>


    <div class="mb-3">
      <button 
        class="btn"> Đăng ký</button>
    </div>
  </Form>
</template>

<style scoped>
@import '@/assets/form.css';
button {
    background-color: #6A9C89;
    text-decoration: none;
    color: #ffffff;
}

button:hover {
  background-color: #54796a;
  color: #ffffff;
}

</style>
