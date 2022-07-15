<template>
  <div
    class="overflow-x-hidden overflow-y-scroll w-screen min-h-screen md:h-screen py-10 md:py-0 flex flex-col bg-[#e16e28] items-center justify-center font-['Rubik_Bubbles'] select-none">

    <div class="font-['Rubik_Bubbles'] my-12 md:my-0 md:fixed right-20 bottom-12 z-10 text-right z-20">
      <!--Supply-->
      <div class="mb-4 text-2xl text-right">
        <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
        <number :from="0" :to="store.state.nftConfig.maxSupply" :duration="1" />
      </div>
      <a class="font-['Rubik_Bubbles'] underline text-sm" href="https://twitter.com/hashimotoscat"
        target="_blank">Twitter</a>
      <div class="text-3xl">Hashimoto Cat</div>
      <div class="text-sm">Try to click a cat!</div>
    </div>

    <!-- CATs -->
    <div class="fixed w-full h-full z-10 cats">
      <img v-bind:class="{ 'move': moving == i, 'speed': speed == i }" @click="catchCat()" @mouseover="speed = i"
        :style="`--bottom: ${7 * i}%`" :class="`-right-[10%] md:w-[10%] w-[30%]`" :src="`/1of1/${i}.png`" alt=""
        srcset="" v-for="i in 12">
    </div>

    <Sale class="px-8 z-20" />

  </div>


</template>

<style lang="scss" scoped>
.cats {
  img {
    position: absolute;
    height: auto;
    bottom: var(--bottom);
    transition: all 2s;
    opacity: 0;
    cursor: pointer;

    &.move {
      animation: move ease-in-out;
      animation-duration: 4s;

      @keyframes move {
        0% {
          transform: translateX(0%);
          opacity: 1;
        }

        90% {
          transform: translateX(-120vw);
          opacity: 1;
        }

        100% {
          transform: translateX(-120vw);
          opacity: 0;
        }
      }
    }

    &.speed {
      right: 100%;
    }

  }
}
</style>

<script setup>
import { ref, onMounted } from "vue"
import store from "@/store"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"

import AOS from "aos"


const { init } = useEthereum()

const moving = ref(0);
const speed = ref(0)

const moveCat = () => {
  moving.value = Math.floor(Math.random() * 12) + 1;
  speed.value = 0
}

const catchCat = () => {
  alert('memeeew... You clicked me, I am 1/1!');
}

onMounted(() => {
  AOS.init()
  init()

  setInterval(() => {
    moveCat()
  }, 4000);
})
</script>
