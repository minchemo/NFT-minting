import { createRouter, createWebHistory } from "vue-router"

const routes = [{
        path: "/",
        name: "home",
        component: () =>
            import ("@/views/home.vue"),
    },
    {
        path: "/plan",
        name: "Plan",
        component: () =>
            import ("@/views/timeline.vue"),
    },
    {
        path: "/gallery",
        name: "Gallery",
        component: () =>
            import ("@/views/gallery.vue"),
    },
    {
        path: "/mint",
        name: "Mint",
        component: () =>
            import ("@/views/mint.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router