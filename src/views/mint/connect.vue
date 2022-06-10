<template>
  <div
    class="absolute left-20 top-20 inline-block mx-auto px-8 py-4 uppercase text-gray-500 border border-transparent hover:border-gray-500 font-thin text-2xl tracking-wider rounded-full hover:cursor-pointer"
    @click="init"
  >
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { init } = useEthereum()
</script>
