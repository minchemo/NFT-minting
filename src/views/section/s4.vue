<template>
  <div class="section" id="s4">
    <div class="title">
      <h1 class="styled-title" data-aos="fade">
        {{ $t("s4.title_1") }}
      </h1>
      <p data-aos="fade" data-aos-delay="400" v-html="$t('s4.desc')"></p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "s4",
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
@import "~@/assets/global.scss";

.section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  background-color: #32325d;
  padding: 5vw 0;
  background-image: url("~@/views/section/s4/bg.svg");
  background-size: 100%;
  background-position: center;
  .title {
    position: relative;
    z-index: 1;
    font-family: "Noto serif tc";
    color: #fff;
    letter-spacing: 5px;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.9));

    h1 {
      font-size: 3vw;
      margin-bottom: 2.5vw;
    }
    p {
      font-size: 1vw;
      line-height: 1.5;
    }
  }
}
</style>