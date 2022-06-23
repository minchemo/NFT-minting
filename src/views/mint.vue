<template>
  <div
    class="overflow-hidden w-screen h-screen flex flex-col bg-white items-center justify-center font-['VT323'] select-none"
  >
   
    <div class="flex flex-col items-center">
      <Sale />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { ref, onMounted } from "vue"
import store from "@/store"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"

import AOS from "aos"

const { init } = useEthereum()

onMounted(() => {
  AOS.init()
  init()
})
</script>
