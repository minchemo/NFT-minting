<template>
  <!--Not allow-->
  <div
    class="font-['Josefin_Sans','sans-serif'] fixed z-[1000] w-full h-full bg-[#fafafa] flex flex-col items-center justify-center transition-all duration-500"
    v-if="$isMobile()">
    Your device is not allow,<br /> Only PC or Mac accepted.
  </div>
  <!--Loading-->
  <div
    class="fixed z-[100] w-full h-full bg-[#fafafa] flex flex-col items-center justify-center transition-all duration-500"
    v-bind:class="{ '-translate-x-[100%]': !loading }">
    <img class="logo w-60" src="@/assets/logo.gif" alt="">
    <div class="mt-12 text-sm uppercase ">loading...</div>
    <div class="absolute w-1/4 h-[2px] bg-gray-700"></div>
  </div>
  <!--Loading end-->
  <div class="font-['Josefin_Sans','sans-serif'] select-none h-screen w-screen overflow-hidden">
    <Navbar />
    <Splide ref="splide" @splide:move="move" :options="{
      autoWidth: true,
      arrows: false,
      wheel: true,
      pagination: true,
      wheelMinThreshold: 50
    }">
      <SplideSlide>
        <S1 />
      </SplideSlide>
      <SplideSlide>
        <S2 />
      </SplideSlide>
      <SplideSlide>
        <S3 />
      </SplideSlide>
      <SplideSlide>
        <S4 />
      </SplideSlide>
    </Splide>
  </div>

</template>

<style lang="scss">
.splide__pagination {
  position: absolute;
  top: 5%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;

  .splide__pagination__page {
    width: 10px;
    height: 2px;
    background-color: rgba($color: #000000, $alpha: .2);
    transition: all .5s;

    &.is-active {
      width: 20px;
      background-color: #000;
    }

    &:hover {

      width: 20px;
    }
  }
}

.logo {
  filter: invert(100%) sepia(6%) saturate(19%) hue-rotate(275deg) brightness(114%) contrast(96%);
}
</style>


<script setup>
import store from "@/store"
import { ref, onMounted } from "vue"

import useEthereum from "@/utils/useEthereum"

import AOS from "aos"
import Navbar from "../components/navbar.vue"
import S1 from "./screens/s1.vue"
import S2 from "./screens/s2.vue"
import S3 from "./screens/s3.vue"
import S4 from "./screens/s4.vue"

const { init } = useEthereum()
const loading = ref(true)
const splide = ref()

const move = (newIdx, prevIdx, destIdx) => {
  store.dispatch("setStateData", {
    name: "setSlideIndex",
    data: prevIdx,
  })
}

onMounted(() => {

  setTimeout(() => {
    loading.value = false
    AOS.init()
    store.dispatch("setStateData", {
      name: "setSplide",
      data: splide.value,
    })
    init()

  }, 1000);
})
</script>
