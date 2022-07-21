<template>
  <!--Loading-->
  <div
    class="fixed z-[100] w-full h-full bg-[#fafafa] flex flex-col items-center justify-center transition-all duration-500"
    v-bind:class="{ '-translate-x-[100%]': !loading }">
    <img class="logo w-60" src="@/assets/logo.gif" alt="">
    <div class="mt-12 text-sm uppercase ">loading...</div>
    <div class="absolute w-1/4 h-[2px] bg-gray-700"></div>
  </div>
  <!--Loading end-->
  <div
    class="overflow-x-hidden overflow-y-scroll w-screen min-h-screen py-10 flex flex-col bg-gray-300 items-center justify-center font-['Josefin_Sans','sans-serif'] select-none">
    <!-- <Sale class="line relative px-8 z-20 hover:-translate-y-4 transition-all" /> -->
    <Navbar />
  </div>

</template>

<style lang="scss">
.logo {

  filter: invert(100%) sepia(6%) saturate(19%) hue-rotate(275deg) brightness(114%) contrast(96%);
}
</style>


<script setup>
import { ref, onMounted } from "vue"
import store from "@/store"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"

import AOS from "aos"
import Navbar from "../components/navbar.vue"

const loading = ref(true)


const { init } = useEthereum()
onMounted(() => {

  setTimeout(() => {
    loading.value = false
    AOS.init()
    // init()
  }, 3000);
})
</script>
