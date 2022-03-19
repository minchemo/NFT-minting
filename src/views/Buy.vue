<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | 台灣好覓 NFT` : `台灣好覓 NFT`
    }}</template>
  </metainfo>
  <div class="section" id="buy">
    <div class="box" data-aos="fade">
      <div class="mint">
        <div class="mint-info">1 / 10000</div>
        <div class="mint-button">購買</div>
      </div>
      <div class="desc">
        <h1>購買說明</h1>
        <p>
          1.購買之前請先詳閱購買說明<br />
          2.購買之前請先詳閱購買說明<br />
          3.購買之前請先詳閱購買說明<br />
          4.購買之前請先詳閱購買說明<br />
          5.購買之前請先詳閱購買說明<br />
          6.購買之前請先詳閱購買說明<br />
        </p>
      </div>
    </div>
  </div>
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
  name: "Buy",
  components: {},
  setup() {
    const globals = getCurrentInstance().appContext.config.globalProperties;
    const store = useStore();
    const route = useRoute();
    // const { } = useEthereum();

    const smoothScroll = inject("smoothScroll");

    //Meta
    useMeta({
      title: "購買",
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
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-size: cover;
  color: #fff;

  .box {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    background: rgba($color: #fff, $alpha: 0.1);
    padding: 5vw 10vw;
    border-radius: 50px;
    backdrop-filter: blur(3px);
    .mint {
      margin-left: 10vw;
      .mint-info {
        font-family: "noto serif tc";
        font-size: 3vw;
        margin-bottom: 5vw;
      }
      .mint-button {
        font-size: 2vw;
        background-color: $primaryYellow;
        padding: 1vw 2.5vw;
        border-radius: 100px;
        text-align: center;
      }
    }
    .desc {
      text-align: center;
      h1 {
        font-size: 2.5vw;
        font-weight: 900;
        margin-bottom: 3vw;
      }
      p {
        font-size: 1.5vw;
        line-height: 2;
        font-weight: 300;
        letter-spacing: 1.5px;
      }
    }
  }
}
</style>
