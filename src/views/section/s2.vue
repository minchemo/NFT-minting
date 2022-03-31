<template>
  <div class="section" id="s2" >
    <div class="title">
      <h1 class="styled-title" data-aos="fade" data-aos-delay="200">
        {{ $t("s2.title_1") }}
      </h1>
      <p data-aos="fade" data-aos-delay="500" v-html="$t('s2.title_2')"></p>
    </div>
    <div class="filter"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "s2",
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
  background-image: url("~@/views/section/s2/bg.svg");
  background-size: cover;
  background-color: $primaryLightBlue;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 0 100px rgba($color: rgb(0, 0, 0), $alpha: 0.5);
  z-index: 5;

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
      font-size: 1.25vw;
      line-height: 1.5;
    }
  }

  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    left: 0;
    top: 0;
    background: rgba($color: #000, $alpha: 0.2);
  }
}
@media screen and (max-width: 767px) {
  .section {
    height: auto;
    padding: 50px;

    .title {
      position: relative;
      z-index: 1;
      font-family: "Noto serif tc";
      color: #fff;
      letter-spacing: 5px;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.9));

      h1 {
        font-size: 24px;
        margin-bottom: 30px;
        padding: 16px;
      }
      p {
        font-size: 14px;
        line-height: 1.5;
        text-align: justify;
      }
    }

    .filter {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      left: 0;
      top: 0;
      background: rgba($color: #000, $alpha: 0.2);
    }
  }
}
</style>