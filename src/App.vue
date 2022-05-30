<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content}The cat on chain` : `The cat on chain`
    }}</template>
  </metainfo>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/views/layout/header.vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import {
  getCurrentInstance,
  nextTick,
  defineComponent,
  onMounted,
  watch,
  inject,
} from "vue"

import useEthereum from "@/utils/useEthereum"
import useFirebase from "@/utils/firebase"

export default {
  name: "App",
  components: {
    Header,
  },
  setup() {
    const globals = getCurrentInstance().appContext.config.globalProperties
    const store = useStore()
    const route = useRoute()
    // const { } = useEthereum();
    // const { initFirebase } = useFirebase();

    const smoothScroll = inject("smoothScroll")

    const hashScroll = () => {
      let section = globals.$router.currentRoute.value.hash.replace("#", "")
      if (section && document.getElementById(section)) {
        smoothScroll({
          scrollTo: document.getElementById(section),
        })
      }
    }

    watch(route, () => hashScroll(), { deep: true })
    onMounted(() => {
      hashScroll()
      // 初始化 firebase
      // initFirebase();
    })

    return {
      store,
      // init,
      // connectedAddress,
      // requestAccount,
    }
  },
}
</script>

<style lang="scss">
@import "~@/assets/variable.scss";
@import "~@/assets/reset.css";
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Roboto:wght@300;400;700;900&display=swap");

* {
  box-sizing: border-box !important;
}

html,
body {
  background-color: $primaryGreen;
}
</style>
