<template>
  <div>
    <!--Info-->
    <div>
      <!--Supply-->
      <div class="text-3xl font-bold text-center">
        <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
        <number :from="0" :to="store.state.nftConfig.maxSupply" :duration="1" />
      </div>
      <!--Selection-->
      <div v-if="store.state.minted <= 1">
        <div class="text-3xl uppercase text-teal-700 font-black">
          select your mint set: 
        </div>
        <template v-if="store.state.minted == 0">
          <div class="flex text-2xl">
            <div>1 x Satosan (0 ETH + Gas fee)</div>
          </div>
          <div class="flex text-2xl">
            <div>2 x Satosan (0 ETH + {{ store.state.nftConfig.price / Math.pow(10, 18) }} ETH + Gas fee)</div>
          </div>
        </template>
        <template v-else-if="store.state.minted == 1">
          <div class="flex text-2xl line-through">
            <div>1 x Satosan (0 ETH + Gas fee)</div>
          </div>
          <div class="flex text-2xl">
            <div>1 x Satosan ({{ store.state.nftConfig.price / Math.pow(10, 18) }} ETH + Gas fee)</div>
          </div>
        </template>
      </div>
      <div v-else>
        You have reached the maximum number of mints.
      </div>
    </div>
    <!--Mint-->
    <div @click="mint()" class="cursor-pointer hover:bg-teal-800 bg-teal-700 text-white text-center py-2 text-3xl font-bold rounded-md">
      <div v-if="store.state.totalSupply < store.state.nftConfig.maxSupply">
        NEXT
      </div>
      <div v-else>
        ALL SATOSAN GONE!<br /><a href="https://opensea.io/collection/satosan">Check on Opensea</a>
      </div>
    </div>
    <!-- Tip -->
    <p>Each wallet has 1 free-mint quota.</p>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import useEthereum from "@/utils/useEthereum"
import store from "@/store"

const { getBuyed, buy } = useEthereum()
const buyCount = ref(store.state.nftConfig.maxMint)
const finalPrice = ref(0);

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
    alert("Arigato gozaimasu.")
  }
}

onMounted(() => {
  setInterval(() => {
    getBuyed()
  }, 1000)
})
</script>
