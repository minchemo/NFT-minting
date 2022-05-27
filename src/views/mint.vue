<template>
  <div class="container mx-auto flex flex-col pb-40">
    <PageTitle title="mint & claim 鋳造" subtitle="claim and mint boys" />
    <div class="container mx-auto p-8 pt-0 w-full h-full flex flex-col gap-4">
      <div class="w-full flex gap-8">
        <template v-for="stage, i in stages">
          <div v-bind:class="{
            'opacity-50': store.state.nftConfig.stage != stage.stage,
          }"
            class="bg-orange-700 w-full h-52 rounded-xl p-4 font-[nunito] overflow-hidden relative hover:opacity-100 shadow-ji transition-all">
            <div class="text-sm pl-24 text-white font-thin" v-html="stage.desc"></div>
            <div  v-html="stage.title"
              class="text-4xl uppercase absolute text-gray-100 font-black left-28 bottom-2 tracking-wider">
            </div>
            <div data-aos="zoom-in" class="absolute text-8xl font-black text-white left-4 bottom-0">
              {{ stage.stage }}
            </div>
            <span class="flex h-10 w-10 absolute top-2 left-2 justify-center items-center">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                v-if="store.state.nftConfig.stage == stage.stage"></span>
              <span class="relative inline-flex rounded-full h-3 w-3" v-bind:class="{
                'bg-green-500': store.state.nftConfig.stage == stage.stage,
                'bg-white': store.state.nftConfig.stage != stage.stage
              }"></span>
            </span>
          </div>
        </template>
      </div>
      <Claim v-if="store.state.nftConfig.stage == 2" />
    </div>
  </div>
</template>

<script setup>
import PageTitle from "@/components/pagetitle.vue"

import { ref } from "vue"
import store from '@/store'
import Claim from './mint/claim.vue'

const stages = ref([
  {
    stage: 1,
    title: "airdrop",
    desc: "Picking 395 token ids from <b>Jidori Girls</b> which selected token owners will airdropped 1 BOY.",
  },
  {
    stage: 2,
    title: "claim",
    desc: "1 Girl = Claim 1 Boy<br/><br/>  Each token id can only be claimed once and the claimed boy's id will not be the same as the token id you choose.",
  },
  {
    stage: 3,
    title: "public<br/>sale",
    desc: "The rest after claiming will be allocated to public sale, you can mint max to 3 per wallet at this stage.",
  },
])
</script>
