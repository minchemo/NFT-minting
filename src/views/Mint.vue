<template>
  <div class="section" id="buy"></div>
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

export default defineComponent({
  name: "Mint",
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();
    const { requestAccount } = useEthereum();

    useMeta({
      title: "Mint｜",
      htmlAttrs: { lang: "en", amp: false },
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
@import "~@/assets/variable.scss";
.section {
}
</style>
