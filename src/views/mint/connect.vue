<template>
  <div
    class="text-center mx-auto bg-teal-700 px-4 py-4 text-3xl uppercase text-white rounded-md cursor-pointer hover:bg-teal-800 font-black"
    @click="requestAccount">
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { requestAccount } = useEthereum()


</script>
