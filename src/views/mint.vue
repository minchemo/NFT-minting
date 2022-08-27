<template>
  <div
    class="overflow-x-hidden overflow-y-scroll w-screen h-screen flex flex-col bg-white items-center justify-center font-['VT323'] select-none">

    <div class="mb-12 flex items-center font-['VT323']">
      <div class="uppercase">
        <div class="text-5xl font-black">NANGO HENTAI</div>
        <p>5000 generated Nango Heitai PFP, Are you perverted ?</p>
      </div>
    </div>

    <Sale class="px-8" />

    <div class="mt-24">
      <div class="hover:opacity-90 cursor-pointer justify-center gap-5 flex" @click="generateHentai()">
        <template v-for="i in gen_nums">
          <img class="rounded-xl select-none" :src="`/preview/${i}.png`" alt="" srcset="">
        </template>
      </div>
      <div class="mt-4 text-center text-lg font-['VT323'] uppercase select-none">click to load more</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { ref, onMounted } from "vue"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"

import AOS from "aos"

const { init } = useEthereum()

const nums = Array.from(Array(355).keys());
const gen_nums = ref([]);

function in_array(array, el) {
  for (var i = 0; i < array.length; i++)
    if (array[i] == el) return true;
  return false;
}

function get_rand(array) {
  var rand = array[Math.floor(Math.random() * array.length)];
  if (!in_array(gen_nums.value, rand)) {
    gen_nums.value.push(rand);
    return rand;
  }
  return get_rand(array);
}

const generateHentai = () => {
  gen_nums.value = [];
  for (var i = 0; i < 3; i++) {
    console.log(get_rand(nums));
  }
}

onMounted(() => {
  AOS.init()
  init()
  generateHentai()
})
</script>
