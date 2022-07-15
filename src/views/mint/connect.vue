<template>
  <div
    class="text-center mx-auto bg-white py-4 text-xl uppercase rounded-md cursor-pointer0 text-black hover:text-[#e16e28] cursor-pointer"
    @click="requestAccount">
    connect
  </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
const { requestAccount } = useEthereum()


</script>
