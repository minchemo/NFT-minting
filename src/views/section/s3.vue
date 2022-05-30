<template>
  <div class="section" id="s3">
    <div class="main">
      <h1>GET CAT FOR FREE</h1>
      <div class="supply">
        {{ store.state.totalSupply }} / 3400, You have
        {{ store.state.buyed }} cats.<br />
        Max is 5, all for free.
      </div>
      <div class="flex">
        <div class="count">
          <div
            v-for="i in 5"
            :key="i"
            class="item"
            @click="selectedCount = i"
            v-bind:class="{ active: i == selectedCount }"
          >
            {{ i }}
          </div>
        </div>
        <div class="mint" @click="mint(selectedCount)">
          {{ store.state.mintOpen ? "MINT" : "mint is not opened" }}
        </div>
      </div>

      <h1>WORKS</h1>
      <p>
        Combining the most suitable photo with 80+ different various meme traits
        and feature. <b>THIS IS TCOC!</b>
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
import useEthereum from "@/utils/useEthereum"
import { useStore } from "vuex"
import { ref, defineComponent, onMounted, reactive } from "vue"
import { Splide, SplideSlide } from "@splidejs/vue-splide"
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll"
import "@splidejs/splide/dist/css/splide.min.css"

export default defineComponent({
  name: "s3",
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const selectedCount = ref(5)
    const { mint } = useEthereum()
    const store = useStore()
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
    })
    const workCount = ref(11)

    onMounted(() => {})

    return {
      slideOption,
      workCount,
      extensions: { AutoScroll },
      store,
      mint,
      selectedCount,
    }
  },
})
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

    .supply {
      font-size: 18px;
      line-height: 1.5;
    }

    .flex {
      margin: 5% 0;
      display: flex;
      align-items: center;
      .count {
        margin-right: 20px;
        .item {
          width: 30px;
          height: 30px;
          border-radius: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            background-color: $primaryGreen;
            color: #fff;
          }
          &.active {
            background-color: $primaryGreen;
            color: #fff;
          }
        }
        display: flex;
      }
      .mint {
        font-size: 30px;
        font-weight: bold;
        background-color: #fff;
        padding: 12px 20px;
        cursor: pointer;
        border-radius: 10px;
        text-transform: uppercase;
        &:hover {
          background-color: $primaryGreen;
          color: #fff;
        }
      }
    }

    h1 {
      font-size: 3vw;
      font-weight: 1000;
      text-transform: uppercase;
      margin: 2vh 0;
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

      .flex {
        margin: 5% 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        .count {
          margin-right: 20px;
          .item {
            width: 30px;
            height: 30px;
            border-radius: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            cursor: pointer;
            &:hover {
              background-color: $primaryGreen;
              color: #fff;
            }
            &.active {
              background-color: $primaryGreen;
              color: #fff;
            }
          }
          display: flex;
        }
        .mint {
          margin-top: 30px;
          font-size: 30px;
          font-weight: bold;
          background-color: #fff;
          padding: 12px 20px;

          cursor: pointer;
          &:hover {
            background-color: $primaryGreen;
            color: #fff;
          }
        }
      }
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
