<template>
  <div class="container mx-auto h-full flex flex-col pb-40">
    <PageTitle title="mint & claim 鋳造" subtitle="claim and mint boys" />
    <div class="container mx-auto p-8 h-full flex">
      <div class="w-1/4 flex flex-col gap-8">
        <template v-for="stage in stages">
          <div
            v-bind:class="{
              'bg-orange-300': !stage.isFinished,
              'bg-orange-700': stage.isFinished,
            }"
            class="w-full aspect-video rounded-xl p-4 font-[nunito] overflow-hidden relative"
          >
            <div
              class="text-sm pl-24 text-white font-thin"
              v-html="stage.desc"
            ></div>
            <div
              class="text-4xl uppercase absolute text-gray-100 font-black right-4 bottom-2 tracking-wider leading-relaxed"
            >
              {{ stage.title }}
            </div>
            <div
              class="absolute text-8xl font-black text-white opacity-20 left-4 top-4"
            >
              {{ stage.stage + 1 }}
            </div>
          </div>
        </template>
      </div>
      <div class="w-3/4"></div>
    </div>
  </div>
</template>

<script setup>
import PageTitle from "@/components/pagetitle.vue"
import { ref } from "vue"

const stages = ref([
  {
    stage: 0,
    isFinished: true,
    title: "airdrop",
    desc: "We pick 395 token ids from <b>Jidori Girls collection</b> which selected token owners will airdropped 1 boy.",
  },
  {
    stage: 1,
    isFinished: false,
    title: "claim",
    desc: "All girl will be able to claim 1 boy, each token can be only claimed once.",
  },
  {
    stage: 2,
    isFinished: false,
    title: "public sale",
    desc: "The rest after claiming will be allocated to the public sale, you can mint max to 3 per wallet at this stage.",
  },
])
</script>
