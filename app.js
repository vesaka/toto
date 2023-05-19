import './style.css';
import { createApp } from 'vue';

import App from './App.vue';
import env from './bootstrap/env';
import pinia from './bootstrap/pinia';
import router from './bootstrap/router';
createApp(App)
    .use(env)
    .use(router)
    .use(pinia)
    .mount('#app');


//     import { defineConfig } from 'vitest/config';
// import vue from "@vitejs/plugin-vue";
// import path from 'path';
// export default defineConfig({
//     plugins: [vue()],
//     include: ['**/src/game/blocks/**/*.{test,spec}.{js,ts}'],
//     exclude: ['**/src/game/{toto,core}/*'],
//     resolve: {
//         alias: {
//             $core: path.resolve(__dirname, './src/game/core'),
//             $blocks: path.resolve(__dirname, './src/game/blocks'),
//             $toto: path.resolve(__dirname, './src/game/toto'),
//         }
//     },
//     test: {
//         environment: 'jsdom',
//         threads: false
//     },
// })