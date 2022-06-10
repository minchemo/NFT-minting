<template>
  <div
    class="overflow-hidden w-screen h-screen flex flex-col bg-white items-center justify-center font-['Londrina_Solid'] select-none"
  >
    <Connect v-if="store.state.connectedAddress == ''" class="z-20" />
    <div class="flex flex-col items-center">
      <div class="flex items-end gap-12 justify-center">
        <img
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="500"
          class="w-1/3 md:w-96"
          src="@/assets/logo.png"
          alt=""
          srcset=""
        />
        <img
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="1000"
          class="w-1/3 md:w-80"
          src="@/assets/desc.png"
          alt=""
          srcset=""
        />
      </div>
      <Sale class="z-10 my-12 md:my-40" />
      <div class="text-sm">
        Since we changed the minting price to free, those who paid for minting
        will receive a refund asap
      </div>
      <img
        class="miso w-full md:w-1/2"
        src="@/assets/miso.png"
        alt=""
        srcset=""
      />
    </div>
    <img
      class="w-0 md:w-1/6 animate-pulse absolute bottom-40 md:bottom-32 left-2 md:left-32"
      src="@/assets/hug.png"
      alt=""
      srcset=""
    />
  </div>
</template>

<style lang="scss" scoped>
.miso {
  animation: miso 2s alternate-reverse infinite ease-in-out;
  transform-origin: bottom;
  will-change: auto;
  @keyframes miso {
    from {
      transform: skewX(3deg);
    }
    to {
      transform: skewX(-6deg);
    }
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue"
import store from "@/store"
import Connect from "./mint/connect.vue"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"

import AOS from "aos"

const { init } = useEthereum()

onMounted(() => {
  AOS.init()
  init()
})
</script>
