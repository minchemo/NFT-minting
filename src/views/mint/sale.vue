<template>
  <div
    class="py-8 flex md:flex-wrap md:flex-row flex-col gap-[10vw] md:gap-[5vw] items-center md:items-end justify-center"
    v-if="!loading">
    <div>
      <!-- Tip -->
      <p v-if="store.state.connectedAddress != ''" class="mb-8 text-center text-lg text-green-700">
        {{ store.state.connectedAddress.substring(0,
            5)
        }}...{{ store.state.connectedAddress.substr(store.state.connectedAddress.length - 4) }}</p>
      <!--Supply-->
      <div class="mb-4 text-3xl text-center text-black font-black">
        <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
        <number :from="0" :to="store.state.nftConfig.maxSupply" :duration="1" />
      </div>
      <!--Info-->
      <div class="flex flex-col justify-around items-center" v-if="store.state.connectedAddress != ''">
        <div>
          <!--Selection-->
          <div class="mb-4 w-full" v-if="store.state.minted < store.state.nftConfig.maxMint">
            <div class="flex justify-between items-center">
              <div class="text-sm px-2 mr-4 hover:text-blue-700 cursor-pointer" @click="buyCount = 1">MIN</div>
              <div class="hover:text-blue-700 text-3xl w-12 h-12 flex items-center justify-center cursor-pointer"
                @click="minusBuyCount()">-</div>
              <div class="text-xl">{{ buyCount }}</div>
              <div class="hover:text-blue-700 text-3xl w-12 h-12 flex items-center justify-center cursor-pointer"
                @click="plusBuyCount()">+</div>
              <div class="text-sm px-2 ml-4 hover:text-blue-700 cursor-pointer" @click="setMax()">MAX</div>
            </div>
            <div class="text-center text-xl font-bold mt-4 underline" v-if="store.state.freeSlots == 0">
              {{ Number(calcPrice().toFixed(4)) }} ETH + gas
            </div>
            <div class="text-center text-xl font-bold mt-4 underline" v-else>
              FREE + gas
            </div>
            <div class="text-left text-xl font-bold mt-4">
              <div>
                STEP 1 > FREE MINT ({{ 600 - store.state.freeSlots }} /
                600) (MAX {{
                    store.state.nftConfig.maxFree
                }})<span v-if="store.state.freeSlots > 0">✔️</span>
              </div>
              <div>
                STEP 2 > MINT {{ (store.state.nftConfig.price / Math.pow(10, 18)) }} ETH per Nango Hentai (MAX
                {{ store.state.nftConfig.maxMint }})<span v-if="store.state.freeSlots == 0">✔️</span>
              </div>
            </div>
          </div>
          <div class="my-2 text-center" v-else>
            You can't mint more.
          </div>
        </div>
        <!--Mint-->
        <div
          class="cursor-pointer text-white hover:text-white text-center py-2 text-xl mt-8 bg-green-900 hover:bg-green-800 hover:text-white transition-all rounded">
          <div @click="mint()" class="inline-flex px-4 py-2 items-center justify-center"
            v-if="store.state.totalSupply < store.state.nftConfig.maxSupply && store.state.minted == 0">
            <div v-if="store.state.minting">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
            <div>{{ store.state.minting ? '' : 'GET HENTAI' }}</div>
          </div>
          <div v-else-if="store.state.totalSupply == store.state.nftConfig.maxSupply">
            Nothing left.<br /><a href="https://opensea.io/collection/nangohentai">Check on Opensea</a>
          </div>
        </div>
      </div>
      <Connect v-else="store.state.connectedAddress == ''" class="z-20" />
    </div>

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
const buyCount = ref(1)
const loading = ref(true);

const plusBuyCount = () => {
  if (store.state.freeSlots > 0) {
    if (buyCount.value + 1 + store.state.minted <= store.state.nftConfig.maxFree) {
      buyCount.value++
    }
  } else {
    if (buyCount.value + 1 + store.state.minted <= store.state.nftConfig.maxMint) {
      buyCount.value++
    }
  }

}

const minusBuyCount = () => {
  if (buyCount.value - 1 >= 1) {
    buyCount.value--
  }
}

const setMax = () => {
  if (store.state.freeSlots > 0) {
    buyCount.value = store.state.nftConfig.maxFree - store.state.minted;
  } else {
    buyCount.value = store.state.nftConfig.maxMint - store.state.minted;
  }
}

const calcPrice = () => {
  let price = (store.state.nftConfig.price / Math.pow(10, 18)) * buyCount.value

  return price;
}

const minted = computed(() => store.state.minted);

watch(minted, (newVal, oldVal) => {
  let lastMinted = newVal;

  buyCount.value = store.state.nftConfig.maxMint - lastMinted;
})

const mint = async () => {
  if (store.state.minting) {
    return;
  }
  if (store.state.nftConfig.pause) {
    alert('Unable to mint, its paused now.')
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
    console.log('...');
  }
}


const nums = Array.from(Array(100).keys());
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


onMounted(() => {

  setInterval(() => {
    // getBuyed()
    setTimeout(() => {

      loading.value = false;
    }, 200);
  }, 500)
})
</script>