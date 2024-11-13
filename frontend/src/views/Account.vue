<script setup>
const user = JSON.parse(localStorage.getItem('user_login'));
</script>

<template>
    <div>
        {{ user?.USER_NAME }}
    </div>
    <div>
        {{ user?.USER_EMAIL }}
    </div>
    <div>
        {{ user?.USER_BIRTH_DATE }}
    </div>
    <div>
        {{ user?.USER_CREATE_AT }}
    </div>
</template>