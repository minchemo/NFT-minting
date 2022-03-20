<template>
  <div class="section" id="s2" data-aos="fade" data-aos-delay="500">
    <div class="title">
      <h1 class="styled-title" data-aos="fade" data-aos-delay="500">
        {{ $t("s2.title_1") }}
      </h1>
      <p data-aos="fade" data-aos-delay="1000" v-html="$t('s2.title_2')"></p>
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
  background-color: #32325d;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 0 100px rgba($color: rgb(0, 0, 0), $alpha: 0.5);
  z-index: 5;

  .preview {
    z-index: 1;
    width: 25vw;
    height: 25vw;
    background-image: url("~@/assets/images/01.jpg");
    background-size: 100%;
    background-position: center;
    filter: drop-shadow(10px 20px 10px rgba(0, 0, 0, 0.5));
    margin-right: 10vw;
    transition: all 1s;
    &:hover {
      transform: translateY(-5%);
      filter: drop-shadow(10px 30px 5px rgba(0, 0, 0, 0.7));
      background-size: 105%;
    }
  }
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
</style>