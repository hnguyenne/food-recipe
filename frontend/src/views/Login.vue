<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';


</script>

<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <Form class="mb-6">
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
                    type="text"
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
        <div>
            <p>
                Bạn chưa có tài khoản?             
                <router-link
                    :to="{
                        name: 'signup',
                    }"
                >
                        Đăng Ký
                </router-link>
            </p>

        </div>
    </div>
</template>

<style scoped>
.page {
    text-align: center;
    width: 40%;
    margin: 0 auto;
}

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