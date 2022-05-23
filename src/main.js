import { createApp } from 'vue'
import App from '@/App.vue'
import '@/index.css'
import store from "@/store"
import router from '@/router'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/plugins/fontawesome";


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(store).use(router).mount('#app')
