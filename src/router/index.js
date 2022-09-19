import { createRouter, createWebHistory } from "vue-router"

const routes = [{
        path: "/",
        name: "home",
        component: () =>
            import ("@/views/mint.vue"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () =>
            import ("@/views/dashboard.vue"),
    },
]

const router = createRouter({
    // history: createWebHistory(),
    routes,
})

export default router