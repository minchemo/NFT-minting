<template>
  <div class="section" id="s2">
    <div class="preview" data-aos="fade-up"></div>
    <div class="title">
      <h1 data-aos="fade-up" data-aos-delay="200">{{ $t("s2.title_1") }}</h1>
      <p data-aos="fade-up" data-aos-delay="400">{{ $t("s2.title_2") }}</p>
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

.section {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("~@/views/section/s2/bg.jpeg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

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
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.9));

    h1 {
      font-size: 5vw;
      margin-bottom: 1.5vw;
    }
    p {
      font-size: 3vw;
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