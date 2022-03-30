<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content
        ? `${content} | 台灣好覓NFT｜Taiwan goodthing NFT`
        : `台灣好覓NFT｜Taiwan goodthing NFT`
    }}</template>
  </metainfo>
  <Header />
  <router-view />
  <Footer />
</template>


<script>
import Header from "@/views/layout/header.vue";
import Footer from "@/views/layout/footer.vue";
import { useMeta } from "vue-meta";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  getCurrentInstance,
  nextTick,
  defineComponent,
  onMounted,
  watch,
  inject,
} from "vue";

import useEthereum from "@/utils/useEthereum";
import useFirebase from "@/utils/firebase";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  setup() {
    const globals = getCurrentInstance().appContext.config.globalProperties;
    const store = useStore();
    const route = useRoute();
    // const { } = useEthereum();
    // const { initFirebase } = useFirebase();

    const smoothScroll = inject("smoothScroll");

    //Meta
    useMeta({
      title: "官方",
      htmlAttrs: { lang: "en", amp: false },
    });

    const hashScroll = () => {
      let section = globals.$router.currentRoute.value.hash.replace("#", "");
      setTimeout(() => {

        if (section && document.getElementById(section)) {

          smoothScroll({
            scrollTo: document.getElementById(section),
          });
        } else {
          window.scrollTo(0, 0);
        }
      }, 0);
    };

    watch(route, () => hashScroll(), { deep: true });
    onMounted(() => {
      hashScroll();
      // 初始化 firebase
      // initFirebase();
    });


    return {
      store,
      // init,
      // connectedAddress,
      // requestAccount,
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/variable.scss";
@import "~@/assets/reset.css";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Noto+Serif+TC:wght@500;900&display=swap");

* {
  font-family: $font1;
  box-sizing: border-box !important;
}

html,
body {
  background: $primaryLightBlue;
}
</style>
