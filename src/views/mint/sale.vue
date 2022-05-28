<template>
  <div class="mt-12 inline-flex mx-auto flex-col font-['nunito']">
    <div class="flex items-center justify-center gap-8">
      <div
        @click="minusBuyCount()"
        class="hover:cursor-pointer hover:bg-orange-800 w-16 h-16 bg-orange-700 text-white flex items-center justify-center rounded-full text-xl font-thin"
      >
        <font-awesome-icon :icon="['fa', 'minus']" />
      </div>
      <p class="text-3xl font-black">{{ buyCount }}</p>
      <div
        @click="plusBuyCount()"
        class="hover:cursor-pointer hover:bg-orange-800 w-16 h-16 bg-orange-700 text-white flex items-center justify-center rounded-full text-xl font-thin"
      >
        <font-awesome-icon :icon="['fa', 'plus']" />
      </div>
    </div>
    <div class="text-3xl text-center my-12 font-black">
      {{ (buyCount * 0.025).toFixed(3) }} ETH
    </div>
    <div class="flex justify-center items-center gap-8">
      <div
        class="bg-white shadow-xl rounded-xl text-orange-700 px-6 py-4 font-semibold"
      >
        You have buyed
        <span class="font-black"> {{ store.state.buyed }} </span> boy<br />
        Max to <span class="font-black"> 3 </span>
      </div>
      <div
        class="hover:cursor-pointer hover:bg-orange-700 hover:text-white bg-white shadow-xl rounded-xl text-orange-700 px-6 py-4 text-2xl font-black"
      >
        Buy
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import useEthereum from "@/utils/useEthereum"
import store from "@/store"

const { getBuyed } = useEthereum()

const buyCount = ref(1)

const plusBuyCount = () => {
  if (buyCount.value + 1 > 3) {
    return
  }

  buyCount.value++
}
const minusBuyCount = () => {
  if (buyCount.value - 1 < 1) {
    return
  }

  buyCount.value--
}

// watch(girlBalance, (oldBalance, newBalance) => {})

onMounted(() => {
  setInterval(() => {
    getBuyed()
  }, 1000)
})
</script>
