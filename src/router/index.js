import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Official",
        component: () => import("@/views/home.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/about.vue"),
    },
    {
        path: "/gallery",
        name: "Gallery",
        component: () => import("@/views/gallery.vue"),
    },
    {
        path: "/mint",
        name: "Mint",
        component: () => import("@/views/mint.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router