<template>
  <div class="section" id="s3">
    <div class="main">
      <Splide :options="slideOption" :extensions="extensions">
        <SplideSlide v-for="i in 6" :key="i">
          <img :src="require(`@/assets/images/${i}.png`)" />
        </SplideSlide>
      </Splide>
    </div>
    <div class="filter"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, defineComponent, onMounted, ref } from "vue";
import useEthereum from "@/utils/useEthereum";
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

export default defineComponent({
  name: "s3",
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const store = useStore();
    const slideOption = reactive({
      type: "loop",
      drag: "free",
      rewind: true,
      autoScroll: {
        speed: 0.35,
      },
      perPage: 7,
      perMove: 1,
      gap: 20,
      pagination: false,
      arrows: false,
      breakpoints: {
        640: {
          perPage: 1,
        },
      },
    });

    onMounted(() => {
    })

    return {
      store,
      slideOption,
      extensions: { AutoScroll },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/global.scss";
@import "~@/assets/variable.scss";

.section {
  position: relative;
  width: 100%;
  min-height: auto;
  background-color: $primaryLightBlue;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  font-family: $font2;

  .main {
    width: 100%;

    img {
      width: 100%;
      border-radius: 10px;
    }
  }

  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
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