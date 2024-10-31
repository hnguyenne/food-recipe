<template>
    <nav class="navbar navbar-expand bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <a
                href="/"
                class="navbar-brand"
            >Food Recipes Blog</a>
            <div class="me-auto navbar-nav">
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'foodrecipe' }"
                        class="nav-link"
                    >
                        HomePage
                    </router-link>
                </li>
            </div>
        </div>
    </nav>
</template>