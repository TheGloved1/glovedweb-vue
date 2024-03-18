/** @format */

import { createRouter, createWebHistory } from "vue-router";
import HomeRoute from "./components/HomeRoute.vue";
import GeneticsProjRoute from "./components/GeneticsProjRoute.vue";

const routes = [
    { path: "/", redirect: "/Home" },

    { path: "/Home", component: HomeRoute },
    {
        path: "/Genetics",
        component: GeneticsProjRoute,
    },
];

const router = createRouter({
    history: createWebHistory(),
    base: "https://glovedweb.ddns.net/",
    routes,
    linkActiveClass: "routerActive",
});

export default router;
