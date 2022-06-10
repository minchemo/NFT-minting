<template>
  <div
    class="mt-4 inline-flex mx-auto flex-col font-['Cabin_Sketch'] text-white"
  >
    <div class="text-3xl font-bold text-center mt-6 mb-3">
      {{ store.state.totalSupply }} / {{ store.state.nftConfig.maxSupply }}
    </div>

    <div class="flex items-center gap-8">
      <div
        class="text-5xl w-10 h-10 rounded-full bg-white text-black flex items-center justify-center cursor-pointer"
        @click="minusBuyCount()"
      >
        -
      </div>
      <div class="text-xl md:text-3xl text-center my-6 font-black uppercase">
        {{ buyCount }} undefined ghost =
        {{
          store.state.freeMint > 0
            ? 0
            : (
                (buyCount * parseInt(store.state.nftConfig.price)) /
                Math.pow(10, 18)
              ).toFixed(3)
        }}
        ETH<br />
        <span
          class="font-black text-lg"
          v-html="
            store.state.freeMint > 0
              ? `Remaining ${store.state.freeMint} ghost for free, then ${(
                  (1 * parseInt(store.state.nftConfig.price)) /
                  Math.pow(10, 18)
                ).toFixed(3)} ETH`
              : ''
          "
        >
        </span>
      </div>
      <div
        class="text-5xl w-10 h-10 rounded-full bg-white text-black flex items-center justify-center cursor-pointer"
        @click="plusBuyCount()"
      >
        +
      </div>
    </div>

    <div class="flex justify-center flex-col items-center gap-8">
      <div class="text-purple-500 px-6 py-4 font-semibold">
        You own {{ store.state.minted }} /
        {{ store.state.nftConfig.maxMint }}
      </div>
      <div
        v-if="store.state.totalSupply < 4000"
        class="hover:cursor-pointer text-white border border-white rounded-md px-6 py-4 text-2xl font-black"
        @click="mint()"
      >
        {{ store.state.freeMint > 0 ? "FREE MINT" : "MINT" }}
      </div>
      <div
        v-else
        class="hover:cursor-pointer text-white border border-white rounded-md px-6 py-4 text-2xl font-black"
      >
        ALL GHOST OUT
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import useEthereum from "@/utils/useEthereum"
import store from "@/store"

const { getBuyed, buy } = useEthereum()
const buyCount = ref(6)

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
    alert("gₑgₑgₑgₑgₑgₑ  ₙₒ ₘₒᵣₑ gₕₒₛₜ fₒᵣ yₒᵤ")
  }
}

onMounted(() => {
  setInterval(() => {
    getBuyed()
  }, 1000)
})
</script>
