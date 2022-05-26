import { createApp } from 'vue'
import App from '@/App.vue'
import '@/index.css'
import store from "@/store"
import router from '@/router'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/plugins/fontawesome";

import VueLazyLoad from 'vue3-lazyload'

import 'aos/dist/aos.css'

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(store).use(router)
    .use(VueLazyLoad, {
        loading: 'https://pixo.style/image/catalog/tee/new/TEE-012a.jpg',
        error: '',
    })
    .mount('#app')
