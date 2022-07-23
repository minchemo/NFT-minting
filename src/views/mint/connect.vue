<template>
  <div
    class="text-center mx-auto bg-white py-2 px-6 text-xl uppercase cursor-pointer block text-black hover:text-white hover:bg-blue-700 cursor-pointer"
    @click="requestAccount">
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { requestAccount } = useEthereum()


</script>
