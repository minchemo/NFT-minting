import { createRouter, createWebHistory } from "vue-router"

const routes = [{
        path: "/",
        name: "App",
        component: () =>
            import ("@/views/home.vue"),
    },
    {
        path: "/timeline",
        name: "Timeline",
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