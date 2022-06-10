import { createApp } from "vue"
import App from "@/App.vue"
import "@/index.css"
import store from "@/store"
import router from "@/router"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import "@/plugins/fontawesome"

import "aos/dist/aos.css"

import VueMobileDetection from "vue-mobile-detection"

import VueNumber from "vue-number-animation"

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(store)
    .use(router)
    .use(VueMobileDetection)
    .use(VueNumber)
    .mount("#app")