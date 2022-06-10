<template>
  <div class="flex-col md:flex-row flex gap-4 md:gap-8">
    <!--Info-->
    <div class="flex flex-col gap-4 md:gap-8 justify-between">
      <!--Supply-->
      <div class="text-3xl font-bold text-center">
        <number :from="0" :to="store.state.totalSupply" :duration="1" /> ~
        <number :from="0" :to="store.state.nftConfig.maxSupply" :duration="1" />
      </div>
      <div
        class="flex flex-col shadow-lg bg-white rounded-xl px-4 md:px-6 py-4 md:py-6"
      >
        <!--Count-->
        <div class="flex items-center gap-4">
          <div
            class="text-5xl w-10 h-10 text-black flex items-center justify-center cursor-pointer hover:text-6xl"
            v-bind:class="{
              'text-gray-200': buyCount == 1,
            }"
            @click="minusBuyCount()"
          >
            -
          </div>
          <div class="text-xl md:text-3xl text-center font-black uppercase">
            {{ buyCount }}
          </div>
          <div
            class="text-5xl w-10 h-10 text-black flex items-center justify-center cursor-pointer hover:text-6xl"
            @click="plusBuyCount()"
            v-bind:class="{
              'text-gray-200': buyCount == store.state.nftConfig.maxMint,
            }"
          >
            +
          </div>
        </div>

        <!--Price-->
        <div class="text-center text-xl mt-2 md:mt-8">
          {{
            store.state.freeMint > 0
              ? 0
              : (
                  (buyCount * parseInt(store.state.nftConfig.price)) /
                  Math.pow(10, 18)
                ).toFixed(3)
          }}
          ETH<br />
          {{ store.state.freeMint }} free miso left
        </div>
      </div>
    </div>
    <!--Mint-->
    <div
      @click="mint()"
      class="w-full aspect-square md:aspect-auto md:w-52 h-full flex justify-center items-center text-white bg-yellow-400 text-3xl rounded-full shadow-xl cursor-pointer hover:bg-amber-500 hover:text-4xl transition-all"
    >
      <div v-if="store.state.totalSupply < store.state.nftConfig.maxSupply">
        {{ store.state.freeMint > 0 ? "FREE MINT !" : "MINT !" }}
      </div>
      <div v-else>NO MORE MISO!</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import useEthereum from "@/utils/useEthereum"
import store from "@/store"

const { getBuyed, buy } = useEthereum()
const buyCount = ref(store.state.nftConfig.maxMint)

// const ownBoy = computed(() => store.state.balance)

const plusBuyCount = () => {
  if (buyCount.value + 1 > store.state.nftConfig.maxMint) {
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

const mint = () => {
  if (
    parseInt(store.state.minted) + parseInt(buyCount.value) <=
    store.state.nftConfig.maxMint
  ) {
    buy(buyCount.value)
  } else if (
    parseInt(store.state.minted) + parseInt(buyCount.value) >
    store.state.nftConfig.maxMint
  ) {
    alert("miso , miso.")
  }
}

onMounted(() => {
  setInterval(() => {
    getBuyed()
  }, 1000)
})
</script>
