<template>
  <div class="section" id="s3">
    <div class="main">
      <h1>WORKS</h1>
      <p>
        Not just a cat, not just a holder is also a PFP, combining the most
        suitable photo with over 80 (more) different various meme traits and
        feature. <b>THIS IS TCOC!</b>
      </p>
      <div class="swiper-box">
        <Splide :options="slideOption" :extensions="extensions">
          <SplideSlide v-for="i in workCount" :key="i">
            <img :src="require(`@/assets/images/work/${i}.jpg`)" />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, defineComponent, onMounted, reactive } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

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
        speed: 1,
      },
      perPage: 5,
      perMove: 1,
      gap: 20,
      breakpoints: {
        640: {
          perPage: 1,
        },
      },
    });
    const workCount = ref(11);

    onMounted(() => {});

    return {
      slideOption,
      workCount,
      extensions: { AutoScroll },
      store,
    };
  },
});
</script>

<style lang="scss">
@import "~@/assets/variable.scss";

.section {
  position: relative;
  width: 100%;
  height: auto;
  font-family: $font2;
  .main {
    margin-left: auto;
    position: relative;
    width: 95%;
    height: 100%;
    background: $primaryYellow;
    right: 0;
    bottom: 0;
    padding: 8vw 10vw;
    color: $primaryGreen;

    h1 {
      font-size: 3vw;
      font-weight: 1000;
      text-transform: uppercase;
    }

    p {
      font-size: 1vw;
      line-height: 1.5;
    }
    .swiper-box {
      margin-top: 5vw;
      .splide__slide {
        img {
          width: 100%;
          border-radius: 100%;
          border: 0.5vw solid $primaryGreen;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    position: relative;
    width: 100%;
    height: auto;
    font-family: $font2;
    .main {
      margin-left: auto;
      position: relative;
      width: 95%;
      height: 100%;
      background: $primaryYellow;
      right: 0;
      bottom: 0;
      padding: 8vw 10vw;
      color: $primaryGreen;

      h1 {
        font-size: 40px;
        font-weight: 1000;
        text-transform: uppercase;
      }

      p {
        font-size: 18px;
        line-height: 2;
      }
      .swiper-box {
        margin-top: 5vw;
        .splide__slide {
          img {
            width: 100%;
            border-radius: 100%;
            border: 0.5vw solid $primaryGreen;
          }
        }
      }
    }
  }
}
</style>