import Home from '$toto/components/pages/Home.vue';
import Playground from '$toto/components/pages/Playground.vue';
import NotFound from '$toto/components/pages/NotFound.vue';

import { BASE, PLAY, PAGE_404 } from './paths';

const routes = [
    {
        path: BASE,
        name: 'home',
        component: Home,
        meta: {
            title: 'Welcome',
            transitionName: 'slide-left',
        }
    },
    {
        path: PLAY,
        name: 'play',
        component: Playground,
        meta: {
            title: 'Play',
            transitionName: 'slide-left',
        }
    },
    {
        path: PAGE_404,
        name: '404',
        component: NotFound,
        meta: {
            title: '404',
            transitionName: 'slide-left',
        }
    },
];

export default routes;

