<template>
  <div
    class="inline-block mx-auto bg-purple-500 px-4 py-2 uppercase text-white drop-shadow-lg font-['Cabin_Sketch'] font-normal tracking-wider rounded-md hover:cursor-pointer"
    @click="init"
  >
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { init } = useEthereum()
</script>
