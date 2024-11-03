<script setup>
import { ref } from 'vue';
import AccountForm from '@/components/AccountForm.vue';

</script>

<template>
    <div class="page">
        <h4>Đăng ký</h4>
        <AccountForm />
    </div>
</template>

<style>
.page {
    text-align: center;
    width: 40%;
    margin: 0 auto;
}
</style>