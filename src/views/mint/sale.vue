<template>
  <div v-if="!loading">
    <!--Info-->
    <div>
      <!--Selection-->
      <div class="my-2" v-if="store.state.minted <= 1">
        <div class="text-center text-3xl uppercase text-teal-700 font-black">
          select a set
        </div>
        <template v-if="store.state.minted == 0">
          <div class="selectButton" v-bind:class="{ selected: selectedSet == 0 }"
            @click="selectedSet = 0; buyCount = 1;">
            <div>Satosan x 1 (FREE)</div>
          </div>
          <div class="selectButton" v-bind:class="{ selected: selectedSet == 1 }"
            @click="selectedSet = 1; buyCount = 2;">
            <div>Satosan x 2 (FREE + {{ store.state.nftConfig.price / Math.pow(10, 18) }} ETH)</div>
          </div>
        </template>
        <template v-else-if="store.state.minted == 1">
          <div class="selectButton line-through">
            <div>Satosan x 1 (FREE)</div>
          </div>
          <div class="selectButton" v-bind:class="{ selected: selectedSet == 1 }"
            @click="selectedSet = 1; buyCount = 1;">
            <div>Satosan x 1 ({{ store.state.nftConfig.price / Math.pow(10, 18) }} ETH)</div>
          </div>
        </template>
        <div class="text-center">
          Total Cost: {{ calcPrice() }} ETH + Gas
        </div>
      </div>
      <div class="my-2" v-else>
        You have reached the maximum number of mints.
      </div>
    </div>
    <!--Supply-->
    <div class="my-4 text-3xl font-bold text-center">
      <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
      <number :from="0" :to="store.state.nftConfig.maxSupply" :duration="1" />
    </div>
    <!--Mint-->
    <div class="cursor-pointer hover:bg-teal-800 bg-teal-700 text-white text-center py-2 text-3xl font-bold rounded-md"
      v-if="store.state.connectedAddress != ''">
      <div @click="mint()" class="flex items-center justify-center"
        v-if="store.state.totalSupply < store.state.nftConfig.maxSupply">
        <div v-if="store.state.minting">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
        <div>{{ store.state.minting ? 'Confirming...' : 'MINT' }}</div>
      </div>
      <div v-else>
        ALL SATOSAN SOLD-OUT!<br /><a href="https://opensea.io/collection/satosan">Check on Opensea</a>
      </div>
    </div>
    <Connect v-else="store.state.connectedAddress == ''" class="z-20" />
    <!-- Tip -->
    <p class="mt-4 text-center text-lg underline">Each wallet has 1 free-mint quota.<br>1000 satosan reserved for
      ourselves</p>
  </div>
  <div v-else>
    <div class="text-3xl">This is sato-san,</div>
    <div class="text-3xl">chotto matte kudasai ┏( ._. ┏ ) ┓</div>
  </div>
</template>

<style lang="scss">
.selectButton {
  position: relative;
  display: flex;
  font-size: 1.5rem;
  cursor: pointer;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
  border-radius: 5px;
  margin: 8px 0;

  &:hover {
    background-color: #eee;
  }

  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: rgb(152, 152, 152);
    border-radius: 100%;
    left: 8px;
    top: 50%;
    margin-top: -6px;
  }

  &.selected {
    &::after {
      background-color: rgb(15 118 110);
    }
  }
}
</style>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import useEthereum from "@/utils/useEthereum"
import store from "@/store"
import Connect from "@/views/mint/connect.vue"

const { getBuyed, buy } = useEthereum()
const buyCount = ref(2)
const selectedSet = ref(1)
const loading = ref(true);

const calcPrice = () => {
  let price = 0;
  if (store.state.minted == 0) {
    let priceCount = buyCount.value - 1
    price = (store.state.nftConfig.price / Math.pow(10, 18)) * priceCount
  } else if (store.state.minted >= 1) {
    price = (store.state.nftConfig.price / Math.pow(10, 18)) * 1
  }

  return price;
}

const minted = computed(() => store.state.minted);

watch(minted, (newVal, oldVal) => {
  let lastMinted = newVal;

  if (lastMinted < 1) {
    buyCount.value = 2;
    selectedSet.value = 1;
  } else if (lastMinted == 1) {
    buyCount.value = 1;
    selectedSet.value = 1;
  }
})

const mint = async () => {
  if (store.state.minting) {
    return;
  }
  if (
    parseInt(store.state.minted) + parseInt(buyCount.value) <=
    store.state.nftConfig.maxMint
  ) {
    store.dispatch("setStateData", { name: "setMinting", data: true })
    await buy(buyCount.value)

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
    setTimeout(() => {

      loading.value = false;
    }, 1000);
  }, 1000)
})
</script>
