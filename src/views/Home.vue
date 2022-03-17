<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | 台灣好覓 NFT` : `台灣好覓 NFT`
    }}</template>
  </metainfo>
  <S1 />
  <S2 />
  <S3 />
  <S4 />

  <router-view />
</template>

<script>
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
import S1 from "@/views/section/s1.vue";
import S2 from "@/views/section/s2.vue";
import S3 from "@/views/section/s3.vue";
import S4 from "@/views/section/s4.vue";

export default defineComponent({
  name: "Home",
  components: {
    S1,
    S2,
    S3,
    S4
  },
  setup() {
    const globals = getCurrentInstance().appContext.config.globalProperties;
    const store = useStore();
    const route = useRoute();
    // const { } = useEthereum();

    const smoothScroll = inject("smoothScroll");

    //Meta
    useMeta({
      title: "官方",
      htmlAttrs: { lang: "en", amp: false },
    });

    const hashScroll = () => {
      let section = globals.$router.currentRoute.value.hash.replace("#", "");
      if (section) {
        smoothScroll({
          scrollTo: window.document.getElementById(section),
        });
      }
    };

    watch(route, () => hashScroll(), { deep: true });
    onMounted(() => {
      hashScroll();
    });

    return {
      store,
      // init,
      // connectedAddress,
      // requestAccount,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/reset.css";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Noto+Serif+TC:wght@500;900&display=swap");

* {
  font-family: "Noto Sans TC", sans-serif;
  box-sizing: border-box;
}
</style>
