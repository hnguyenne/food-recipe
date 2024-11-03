<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';

</script>
<template>
  <Form @submit="">
    <div class="mb-3">
      <label for="user_name" class="form-label">Tên</label>
      <Field
        user_name="user_name"
        type="text"
        class="form-control"
      />
      <ErrorMessage name="user_name" class="error-feedback"/>

    </div>
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
      <label for="user_birthdate" class="form-label">Ngày sinh</label>
      <Field 
        name="user_birthdate"
        type="text"
        class="form-control"
      />
      <ErrorMessage name="user_birthdate" class="error-feedback"/>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Mật khẩu</label>
      <Field 
        name="password"
        type="text"
        class="form-control"
      />
      <ErrorMessage name="password" class="error-feedback"/>
    </div>

    <div class="mb-3">
      <label for="retype_password" class="form-label">Nhập lại mật khẩu</label>
      <Field 
        name="retype_password"
        type="text"
        class="form-control"
      />
      <ErrorMessage name="retype_password" class="error-feedback"/>
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
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: none;
    color: #ffffff;
}

button:hover {
  background-color: #54796a;
  color: #ffffff;
}
</style>
