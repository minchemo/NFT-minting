<template>
  <div
    class="text-center mx-auto bg-white py-2 px-2 text-xl uppercase cursor-pointer border block text-black hover:text-pink-500 cursor-pointer"
    @click="requestAccount">
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { requestAccount } = useEthereum()


</script>
