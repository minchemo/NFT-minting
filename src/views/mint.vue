<template>
  <div class="container mx-auto flex flex-col min-h-screen pb-40">
    <PageTitle title="mint & claim 鋳造" subtitle="claim and mint boys" />
    <div class="container mx-auto p-8 pt-0 w-full h-full flex flex-col gap-4">
      <div
        class="flex items-center justify-between font-['nunito'] uppercase font-black flex-col lg:flex-row"
        v-if="store.state.connectedAddress != ''"
      >
        <div class="flex items-center gap-4 flex-col lg:flex-row">
          <div
            v-if="store.state.connectedAddress != ''"
            class="text-lg flex items-center gap-4 font-[nunito] text-md bg-white inline-block px-4 py-2 rounded-md shadow-md"
          >
            <font-awesome-icon :icon="['fa', 'wallet']" />
            {{ store.state.connectedAddress.substring(0, 8) }}
          </div>
          <p class="text-lg">You own {{ store.state.balance }} boy</p>
        </div>
        <p class="text-3xl mt-2 lg:mt-0">
          {{ store.state.totalSupply }} / {{ store.state.nftConfig.maxSupply }}
        </p>
      </div>
      <div class="w-full flex gap-8 flex-col lg:flex-row">
        <template v-for="(stage, i) in stages">
          <div
            v-bind:class="{
              'opacity-50': store.state.nftConfig.stage != stage.stage,
            }"
            class="bg-orange-700 w-full h-60 rounded-xl p-4 font-[nunito] overflow-hidden relative hover:opacity-100 shadow-ji transition-all"
          >
            <div
              class="text-sm pl-12 lg:pl-24 text-white font-thin"
              v-html="stage.desc"
            ></div>
            <div
              class="text-sm pl-12 lg:pl-24 text-white mt-1 underline font-[nunito] font-black uppercase"
              v-if="stage.stage == 2 && store.state.nftConfig.stage == 2"
            >
              Claim deadline : 05/30/2022 PM2100 GMT+9
            </div>
            <div
              class="text-sm pl-12 lg:pl-24 text-white mt-1 underline font-[nunito] font-black uppercase"
              v-else-if="stage.stage == 3 && store.state.nftConfig.stage == 2"
            >
              Scheduled time : 05/30/2022 PM2200 GMT+9
            </div>

            <div
              v-html="stage.title"
              class="text-xl lg:text-4xl uppercase absolute text-gray-100 font-black left-16 lg:left-28 bottom-2 tracking-wider"
            ></div>
            <div
              data-aos="zoom-in"
              class="absolute text-5xl lg:text-8xl font-black text-white left-4 bottom-2 lg:bottom-0"
            >
              {{ stage.stage }}
            </div>
            <span
              class="flex h-10 w-10 absolute top-2 left-2 justify-center items-center"
            >
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                v-if="store.state.nftConfig.stage == stage.stage"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3"
                v-bind:class="{
                  'bg-green-500': store.state.nftConfig.stage == stage.stage,
                  'bg-white': store.state.nftConfig.stage != stage.stage,
                }"
              ></span>
            </span>
            <div
              class="absolute w-1/3 lg:w-1/4 aspect-square bg-contain right-0 bottom-0"
              v-bind:style="{ backgroundImage: `url('${stage.img}')` }"
            ></div>
          </div>
        </template>
      </div>
      <Connect
        v-if="
          store.state.connectedAddress == '' && store.state.nftConfig.stage >= 2
        "
      />
      <Airdrop v-if="store.state.nftConfig.stage == 1" />
      <Claim v-else-if="store.state.nftConfig.stage == 2" />
      <Sale v-else-if="store.state.nftConfig.stage == 3" />
    </div>
  </div>
</template>

<script setup>
import PageTitle from "@/components/pagetitle.vue"

import { ref, onMounted } from "vue"
import store from "@/store"
import Claim from "./mint/claim.vue"
import Connect from "./mint/connect.vue"

import useEthereum from "@/utils/useEthereum"
import Airdrop from "./mint/airdrop.vue"
import Sale from "./mint/sale.vue"
const { init } = useEthereum()

const stages = ref([
  {
    stage: 1,
    title: "airdrop",
    desc: "Picking 395 token ids from <b>Jidori Girls</b> which selected token owners will airdropped 1 BOY.",
    img: new URL("../assets/boys/1.png", import.meta.url).href,
  },
  {
    stage: 2,
    title: "claim",
    desc: "1 Girl = Claim 1 Boy<br/><br/>Each token id can only be claimed once and the claimed boy's id will not be the same as the token id you choose.",
    img: new URL("../assets/boys/2.png", import.meta.url).href,
  },
  {
    stage: 3,
    title: "public<br/>sale",
    desc: "The rest after claiming will be allocated to public sale, you can mint max to 3 per wallet at this stage.<br/><br/> <span class='underline font-black uppercase'>Price: 0.025 ETH</span>",
    img: new URL("../assets/boys/3.png", import.meta.url).href,
  },
])

onMounted(() => {
  init()
})
</script>
