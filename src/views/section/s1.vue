<template>
  <div class="section" id="s1">
    <div class="title">
      <h1
        data-aos="fade-right"
        data-aos-duration="3000"
        v-html="$t('s1.title_1')"
      ></h1>
      <p data-aos="fade-left" data-aos-duration="3000" data-aos-delay="1000">
        {{ $t("s1.title_2") }}
      </p>
    </div>
    <div class="filter"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "s1",
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

.section {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("~@/views/section/s1/bg.svg");
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .title {
    position: relative;
    z-index: 1;
    font-family: $font2;
    color: #fff;
    letter-spacing: 5px;

    h1 {
      font-size: 1.5vw;
      margin-bottom: 1.5vw;
      line-height: 1.5;
    }
    p {
      font-size: 1vw;
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
    backdrop-filter: blur(1px);
    transform: scale(1);
    animation: blurIn 2s alternate-reverse infinite;

    @keyframes blurIn {
      from {
        backdrop-filter: blur(15px);
        transform: scale(1);
      }
      to {
        backdrop-filter: blur(1px);
        transform: scale(1);
      }
    }
  }
}
</style>