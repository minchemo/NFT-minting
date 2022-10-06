import { createRouter, createWebHistory } from "vue-router"

const routes = [{
        path: "/",
        name: "home",
        component: () =>
            import ("@/views/mint.vue"),
    },
    {
        path: "/my-potteds",
        name: "my-potteds",
        component: () =>
            import ("@/views/my_potteds.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router