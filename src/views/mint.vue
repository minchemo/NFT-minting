<template>
  <div
    class="overflow-x-hidden overflow-y-scroll w-screen min-h-screen py-10 flex flex-col bg-gray-700 items-center justify-center font-['Josefin_Sans','sans-serif'] select-none">

    <!-- <Sale class="line relative px-8 z-20 hover:-translate-y-4 transition-all" /> -->
    <Navbar />
  </div>

</template>


<script setup>
import { ref, onMounted } from "vue"
import store from "@/store"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"

import AOS from "aos"
import Navbar from "../components/navbar.vue"


const { init } = useEthereum()
onMounted(() => {
  AOS.init()
  init()
})
</script>
