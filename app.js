import './style.css';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory  } from 'vue-router';

import App from './App.vue';
import pinia from './bootstrap/pinia';
import router from './bootstrap/router';
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');
