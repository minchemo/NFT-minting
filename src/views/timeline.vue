<template>
  <div class="container mx-auto min-h-screen flex flex-col pb-40">
    <PageTitle
      title="timeline タイムライン
"
      subtitle="From girls to boys"
    />

    <div class="container mx-auto p-8 pt-0 pb-20 h-full scrollbar">
      <div class="flex mb-8 font-['Nunito'] gap-8">
        <div class="flex items-center">
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-green-500 mr-4"
          ></span>
          <p class="uppercase font-black">finished</p>
        </div>
        <div class="flex items-center">
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-orange-500 mr-4"
          ></span>
          <p class="uppercase font-black">processing</p>
        </div>
        <div class="flex items-center">
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-gray-500 mr-4"
          ></span>
          <p class="uppercase font-black">planing</p>
        </div>
      </div>
      <div class="grid grid-rows-2 grid-cols-4 gap-5">
        <div
          data-aos="zoom-in"
          class="text-3xl p-10 w-full flex items-center justify-center uppercase text-gray-500 font-black bg-white shadow-ji rounded-3xl relative hover:bg-sky-200 hover:translate-y-2 transition-all font-['Nunito']"
        >
          More<br />plan<br />is<br />coming
        </div>
        <template v-for="(item, i) in timelines">
          <div
            data-aos="zoom-in"
            :data-aos-delay="i * 100"
            class="w-full flex flex-col bg-white p-8 pb-32 shadow-ji rounded-3xl relative overflow-hidden hover:bg-sky-200 hover:translate-y-2 font-normal transition-all font-['Nunito']"
          >
            <div
              class="text-sm tracking-wide leading-relaxed transition-all text-cyan-800"
              v-html="item.description"
            ></div>
            <div class="absolute flex items-center left-8 bottom-8">
              <span class="flex h-3 w-3 mr-3">
                <span
                  class="absolute inline-flex h-3 w-3 rounded-full opacity-75"
                  v-bind:class="{
                    'animate-ping': item.isProcessing,
                    'bg-orange-500': !item.isFinished,
                  }"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3"
                  v-bind:class="{
                    'bg-orange-500': !item.isFinished,
                    'bg-green-500': item.isFinished,
                    'bg-gray-300': !item.isProcessing && !item.isFinished,
                  }"
                ></span>
              </span>
              <div class="font-black uppercase">
                {{ item.title }}
              </div>
            </div>
            <div
              class="absolute w-1/2 aspect-square bg-contain right-0 bottom-0"
              v-bind:style="{ backgroundImage: `url('${item.img}')` }"
            ></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/pagetitle.vue"
import { ref } from "vue"
export default {
  components: { PageTitle },
  setup() {
    const timelines = ref([
      {
        isFinished: true,
        isProcessing: false,
        title: "Girls",
        description: `Jidori girls is our genesis collection, art and outfit ideas from people's selfies online, all hand-painted by Japanese amateur painters.
        <br/><br/><b>SOLD-OUT</b><br/> 3950 Supplys <br/> Mint-price: 0.009eth<br/>(Apr-04-2022)`,
        img: new URL("../assets/timelines/girl.png", import.meta.url).href,
      },
      {
        isFinished: false,
        isProcessing: true,
        title: "Boys",
        description:
          "Jidori boys is the second collection from us, allowing boys to find web3 selfies that look the most like you. Jidori-girl owners can claim 1:1 for free and have chance receive airdropped.",
        img: new URL("../assets/timelines/boy.png", import.meta.url).href,
      },
      {
        isFinished: false,
        isProcessing: true,
        title: "App",
        description: `Ready to develop a match-dating APP list on the ios and android store and all of the world can find us on the appstore.<br/><br/>
Jidori's holder can use your NFT as a pass or unlock paid-only features (boost or superlike function like Tinder).`,
        img: new URL("../assets/timelines/app.png", import.meta.url).href,
      },
      {
        isFinished: false,
        isProcessing: false,
        title: "Staking",
        description: "Coming soon...",
        img: "",
      },
      {
        isFinished: false,
        isProcessing: false,
        title: "Instagram Filter",
        description:
          "Use jidori filter on instagram and share with your friends.",
        img: "",
      },
    ])

    return {
      timelines,
    }
  },
}
</script>
