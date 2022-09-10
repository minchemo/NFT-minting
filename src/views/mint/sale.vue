<template>
  <div class="flex flex-col items-center justify-center text-[#603a18] gap-4 md:basis-2/3 2xl:basis-full 2xl:max-w-[800px] mt-8 md:mt-0 w-full md:w-auto" v-if="!loading">
    <!-- Address -->
    <!-- <p v-if="store.state.connectedAddress != ''" class="mb-8 text-center text-lg text-green-700">
        {{ store.state.connectedAddress.substring(0,
        5)
        }}...{{ store.state.connectedAddress.substr(store.state.connectedAddress.length - 4) }}</p> -->
    <!--Supply-->
    <div class="text-2xl md:text-2xl 2xl:text-4xl text-center">
      <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
      <number :from="0" :to="store.state.nftConfig.maxSupply" :duration="1" />
    </div>
    <!--Info-->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-8 w-full" v-if="store.state.connectedAddress != ''">
      <!--Selection-->
      <div class="aspect-square border-[#603a18] border-2 p-2 2xl:p-4 h-full flex flex-col items-center justify-center">
        <div class="text-center mb-4 text-lg md:text-2xl">1 .AMOUNT</div>
        <div class="flex justify-center items-center gap-4">
          <div class="text-xl flex items-center justify-center cursor-pointer" @click="minusBuyCount()">-
          </div>
          <div class="text-xl">{{ buyCount }}</div>
          <div class="text-xl flex items-center justify-center cursor-pointer" @click="plusBuyCount()">+
          </div>
        </div>
      </div>
      <!--Mint section-->
      <div class="aspect-square border-[#603a18] border-2 p-2 2xl:p-4 h-full flex flex-col items-center justify-center">
        <div class="text-center mb-4 text-lg md:text-2xl">2. HOW TO MINT</div>
        <div class="flex flex-col gap-4 justify-center ">
          <div @click="mint()" class="text-white font-normal text-md bg-[#603a18] hover:bg-[#4c2400] rounded-md cursor-pointer px-4 py-2 text-center" v-if="store.state.minted < 2">
            {{ store.state.minting ? 'processing..' : 'Free' }}
          </div>
          <div @click="freeMint()" class="text-white font-normal text-md bg-[#603a18] hover:bg-[#4c2400] rounded-md cursor-pointer px-4 py-2 text-center"
            v-if="store.state.freeRemain > 0 && store.state.freeMinted == 0">
            {{ store.state.minting ? 'processing..' : 'Free' }}
          </div>
          <div class="text-xl text-center" v-if="store.state.minted >= 2">
            Cant mint more
          </div>
        </div>
      </div>
      <!--Minted-->
      <div class="aspect-square border-[#603a18] border-2 p-2 2xl:p-4 h-full flex flex-col items-center justify-center">
        <div class="text-center mb-4 text-lg md:text-2xl">3. GET</div>
        <div class="text-lg text-center">
          {{ store.state.ownTokens.length == 0 ? 'No tokens.': `id: ${store.state.ownTokens.join(', ')}` }}
        </div>
      </div>
    </div>
    <Connect v-else="store.state.connectedAddress == ''" class="z-20" />

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

const { buy } = useEthereum()
const buyCount = ref(1)
const loading = ref(false);

const plusBuyCount = () => {
  if (buyCount.value + 1 <= store.state.nftConfig.maxMint) {
    buyCount.value++
  }
}

const minusBuyCount = () => {
  if (buyCount.value - 1 >= 1) {
    buyCount.value--
  }
}

const mint = async () => {
  if (store.state.minting) {
    return;
  }
  store.dispatch("setStateData", { name: "setMinting", data: true })
  await buy(buyCount.value, false)
}

const freeMint = async () => {
  if (store.state.minting) {
    return;
  }
  store.dispatch("setStateData", { name: "setMinting", data: true })
  await buy(1, true)
}
</script>