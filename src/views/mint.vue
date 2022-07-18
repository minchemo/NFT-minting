<template>
  <div
    class="overflow-x-hidden overflow-y-scroll w-screen min-h-screen md:h-screen py-10 md:py-0 flex flex-col bg-black items-center justify-center font-['VT323'] select-none">

    <div class="font-['VT323'] my-12 md:my-0 md:fixed right-20 bottom-12 z-10 text-right z-20">
      <!--Supply-->
      <div class="mb-4 text-2xl text-right text-white">
        <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
        <number :from="0" :to="store.state.nftConfig.maxSupply" :duration="1" />
      </div>
    </div>

    <video autoplay muted loop class="bg-video">
      <source src="https://i.imgur.com/USCHX9Q.mp4" type="video/mp4">
    </video>

    <Title />

    <!-- <Sale class="px-8 z-20" /> -->

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
  opacity: .5;
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
