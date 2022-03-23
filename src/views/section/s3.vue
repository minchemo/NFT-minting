<template>
  <div class="section" id="s3">
    <div class="main">
      <div class="swiper-box">
        <Splide :options="slideOption">
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
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import "@splidejs/splide/dist/css/splide.min.css"


export default defineComponent({
  name: "s3",
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const store = useStore();
    const slideOption = reactive({
      type: 'loop',
      drag: 'free',
      rewind: true,
      autoScroll: {
        speed: 2,
      },
      perPage: 5,
      perMove: 1,
    });
    const workCount = ref(9)

    onMounted(() => {

    })

    return {
      slideOption,
      workCount, store
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
    .swiper-box {
      .splide__slide {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>