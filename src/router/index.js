import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Buy from "../views/Buy.vue"
import Raffle from "../views/Raffle.vue"
import Register from "../views/Register.vue"

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/buy",
        name: "Buy",
        component: Buy,
    },
    {
        path: "/raffle",
        name: "Raffle",
        component: Raffle,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router