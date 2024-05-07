/** @format */

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import StoreView from "./components/store/StoreView.vue";
import GalleryView from "./components/store/GalleryView.vue";
import AboutView from "./components/store/AboutView.vue";
import StoreNav from "./components/store/StoreNav.vue";
const routes = [
    // { path: "/", redirect: "/" },

    { path: "/", component: HomeView },
    {
        path: "/store",
        component: StoreNav,
        redirect: "/store/home",
        children: [
            { path: 'home', component: StoreView },
            { path: 'gallery', component: GalleryView },
            { path: 'about', component: AboutView },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    base: "https://gloved.dev/",
    routes,
    linkActiveClass: "routerActive",
});

export default router;
