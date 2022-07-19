<template>
  <div
    class="overflow-x-hidden overflow-y-scroll w-screen min-h-screen py-10 flex flex-col bg-black items-center justify-center font-['koulen'] select-none">
    <video autoplay muted loop class="bg-video">
      <source src="https://i.imgur.com/USCHX9Q.mp4" type="video/mp4">
    </video>

    <Title class="relative px-8 mb-20" />
    <Sale class="line relative px-8 z-20 hover:-translate-y-4 transition-all" />
    <div class="bg-white z-30 overflow-hidden rounded-full border-black mt-20 w-32 md:w-60">
      <img class="max-w-full" src="@/assets/preview.gif" alt="" srcset="">
    </div>

  </div>


</template>

<style lang="scss" scoped>
.bg-video {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .4;
}

.line {
  &::after {
    content: '';
    width: 5px;
    height: 150px;
    background-color: white;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue"
import store from "@/store"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"

import Title from "@/components/title.vue"

import AOS from "aos"


const { init } = useEthereum()
onMounted(() => {
  AOS.init()
  init()
})
</script>
