<template>
  <div class="section" id="s1">
    <div class="title">
      <h1 data-aos="fade-right">{{ $t("s1.title_1") }}</h1>
      <p  data-aos="fade-left" data-aos-delay="500">{{ $t("s1.title_2") }}</p>
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
  background-image: url("~@/views/section/s1/bg.jpeg");
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .title {
    position: relative;
    z-index: 1;
    font-family: "Noto serif tc";
    color: #fff;
    letter-spacing: 5px;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.9));

    h1 {
      font-size: 5vw;
      margin-bottom: 1.5vw;
    }
    p {
      font-size: 3vw;
      padding-left: 5vw;
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
    backdrop-filter: blur(2px);
    transform: scale(1);
    animation: blurIn 5s;

    @keyframes blurIn {
      from {
        backdrop-filter: blur(10px);
        transform: scale(1);
      }
      to {
        backdrop-filter: blur(2px);
        transform: scale(1);
      }
    }
  }
}
</style>