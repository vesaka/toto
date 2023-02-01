<template>
        <RouterView v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName || 'scale-up'">
            <component :is="Component" />
        </transition>
    </RouterView>
</template>

<script setup>
    import { computed, onMounted, reactive } from 'vue';
    import { useAuthStore } from './bootstrap/stores';
    import api from '$core/services/laravel-spa-api.js';
    import { t, setLocales } from '$core/utils/i18n';
    import en from './assets/i18n/en.json';

    setLocales({en});
    const auth = useAuthStore();
    api.setBearer(auth.user.token);
</script>
