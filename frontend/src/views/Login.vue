<script setup>

</script>

<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <form class="mb-6">
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
        </form>
    </div>
</template>

<style>
.page {
    text-align: center;
    width: 40%;
    margin: 0 auto;
}
</style>