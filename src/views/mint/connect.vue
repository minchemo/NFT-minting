<template>
  <div
    class="inline-block mx-auto bg-white px-4 py-2 uppercase text-orange-700 drop-shadow-lg font-['nunito'] font-normal tracking-wider rounded-md hover:cursor-pointer hover:bg-orange-700 hover:text-white transition-all mt-8"
    @click="init"
  >
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { init } = useEthereum()
</script>
