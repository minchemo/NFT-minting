import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Mint from "../views/Mint.vue"
import Raffle from "../views/Raffle.vue"

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
}, ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router