import './style.css';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory  } from 'vue-router';


import App from './App.vue';
import env from './bootstrap/env';
import pinia from './bootstrap/pinia';
import router from './bootstrap/router';
createApp(App)
    .use(env)
    .use(router)
    .use(pinia)
    .mount('#app');
