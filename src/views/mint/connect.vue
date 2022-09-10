<template>
  <div
    class="text-center hover:bg-[#603a18] hover:text-white border-[#603a18] text-[#603a18] border-4 px-8 py-4 text-xl uppercase text-black rounded-md cursor-pointer"
    @click="requestAccount">
    connect wallet
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { requestAccount } = useEthereum()


</script>
