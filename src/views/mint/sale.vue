<template>
  <div class="mt-4 inline-flex mx-auto flex-col font-['nunito']">
    <div class="text-3xl text-center mt-6 mb-3">
      {{ store.state.totalSupply }} / {{ store.state.nftConfig.maxSupply }}
    </div>
    <div class="text-3xl text-center my-6 font-black">
      1 JIDORI BOY = {{ (buyCount * parseInt(store.state.nftConfig.publicSalePrice) / Math.pow(10, 18)).toFixed(4) }}
      ETH
    </div>
    <div class="flex justify-center items-center gap-8">
      <div class="bg-white shadow-xl rounded-xl text-orange-700 px-6 py-4 font-semibold">
        You have mint
        <span class="font-black"> {{ store.state.buyed }} </span> boy<br />
        Max to <span class="font-black"> {{ store.state.nftConfig.publicSaleMaxMint }} </span><br/>
        <span class="font-black" v-html="store.state.freeMintSlots > 0 ? `You can free mint (#${store.state.freeMintSlots})`:''"> </span>
      </div>
      <div v-bind:class="{
        'bg-gray-500': store.state.buyed == store.state.nftConfig.publicSaleMaxMint,
        'bg-orange-700': store.state.buyed < store.state.nftConfig.publicSaleMaxMint,
        'hover:bg-orange-800': store.state.buyed < store.state.nftConfig.publicSaleMaxMint,
      }" class="hover:cursor-pointer text-white bg-white shadow-xl rounded-xl px-6 py-4 text-2xl font-black"
        @click="mint()">
        {{ store.state.freeMintSlots > 0 ? 'FREE MINT':'BUY' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import useEthereum from "@/utils/useEthereum"
import store from "@/store"

const { getBuyed, buy } = useEthereum()
const buyCount = ref(1)

// const ownBoy = computed(() => store.state.balance)

// const plusBuyCount = () => {
//   if (buyCount.value + 1 > 3) {
//     return
//   }

//   buyCount.value++
// }
// const minusBuyCount = () => {
//   if (buyCount.value - 1 < 1) {
//     return
//   }

//   buyCount.value--
// }

const mint = () => {
  if (parseInt(store.state.buyed) + parseInt(buyCount.value) > store.state.nftConfig.publicSaleMaxMint) {
    store.dispatch("setStateData", {
      name: "setToast",
      data: {
        show: true,
        msg: `Exceed max buy quantity.`,
      },
    })
  } else {
    buy(buyCount.value)
  }
}

onMounted(() => {
  setInterval(() => {
    getBuyed()
  }, 1000)
})
</script>
