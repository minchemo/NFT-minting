import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import VueSmoothScroll from "vue3-smooth-scroll"
import VueLazyLoad from "vue3-lazyload"
import AOS from "aos"
import "aos/dist/aos.css"
import "normalize.css/normalize.css"
import { createI18n } from "vue-i18n"
// import { lang } from "./lang"

// const i18n = createI18n({
//     locale: "zh",
//     fallbackLocale: "en",
//     messages: lang,
// })

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueSmoothScroll, {
        duration: 1000,
        updateHistory: false,
    })
    // .use(i18n)
    .use(AOS)
    .use(VueLazyLoad)

AOS.init({
    duration: 1500,
})

app.mount("#app")