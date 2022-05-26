<template>
  <div class="container mx-auto h-full flex flex-col pb-40">

    <PageTitle title="timeline タイムライン
" subtitle="From girls to boys" />

    <div class="container mx-auto p-8 grid grid-rows grid-cols-4 gap-5 h-full">
      <template v-for="item, i in timelines">
        <div data-aos="zoom-in" :data-aos-delay="i * 100" class="w-full flex flex-col bg-white p-8 drop-shadow-xl rounded-3xl relative overflow-hidden max-h-96
         hover:bg-sky-200 hover:translate-y-2 font-thin transition-all font-['Nunito']">
          <div class="text-sm  tracking-wide leading-relaxed transition-all text-cyan-800" v-html="item.description">
          </div>
          <div class="absolute flex items-center left-8 bottom-8">
            <span class="flex h-3 w-3 mr-3">
              <span class="absolute inline-flex h-3 w-3 rounded-full opacity-75" v-bind:class="{
                'animate-ping': item.isProcessing,
                'bg-orange-500': !item.isFinished,
              }"></span>
              <span class="relative inline-flex rounded-full h-3 w-3" v-bind:class="{
                'bg-orange-500': !item.isFinished,
                'bg-green-500': item.isFinished,
                'bg-gray-300': !item.isProcessing && !item.isFinished
              }"></span>
            </span>
            <div class="font-black uppercase">
              {{ item.title }}
            </div>
          </div>
          <div class="absolute w-1/2 aspect-square bg-cover right-0 bottom-0"
            v-bind:style="{ backgroundImage: `url('${item.img}')` }"></div>
        </div>
      </template>
    </div>
  </div>

</template>


<script>
import PageTitle from "@/components/pagetitle.vue";
import { ref } from "vue";
export default {
  components: { PageTitle },
  setup() {
    const timelines = ref([
      {
        isFinished: true,
        isProcessing: false,
        title: 'Girls',
        description: `Jidori girls is our genesis collection, art and outfit ideas from people's selfies online, all hand-painted by Japanese amateur amateur painters.
        <br/><br/><b>SOLD-OUT</b><br/> 3950 Supplys <br/> Mint-price: 0.009eth<br/>(Apr-04-2022)`,
        img: new URL('../assets/timelines/girl.png', import.meta.url).href
      },
      {
        isFinished: false,
        isProcessing: true,
        title: 'Boys',
        description: 'Jidori boys is second collection from us, allowing boys to find web3 selfies that look the most like you, Jidori-girl owners can claim 1:1 for free.',
        img: new URL('../assets/timelines/boy.png', import.meta.url).href
      },
      {
        isFinished: false,
        isProcessing: true,
        title: 'App',
        description: `Ready to develop a match-dating APP list on ios and android store and all of world can found us on appstore. <br/><br/>Jidori's holder can use your NFT as a pass or unlock paid-only features (boost or superlike function like Tinder).`,
        img: new URL('../assets/timelines/app.png', import.meta.url).href
      },
      {
        isFinished: false,
        isProcessing: false,
        title: 'Staking',
        description: 'Coming soon...',
        img: ''
      },
    ]);

    return {
      timelines
    }

  }
}
</script>