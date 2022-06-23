<template>
  <div
    class="text-center mx-auto bg-teal-700 py-4 text-3xl uppercase text-white rounded-md cursor-pointer hover:bg-teal-800 font-black"
    @click="init"
  >
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { init } = useEthereum()
</script>
