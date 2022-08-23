<template>
  <!--Loading-->
  <div
    class="fixed z-[100] w-full h-full bg-[#fafafa] flex flex-col items-center justify-center transition-all duration-500"
    v-bind:class="{ 'translate-y-[100%]': !loading }">
    <div class="mt-12 text-sm uppercase ">loading...</div>
  </div>
  <!--Loading end-->
  <div class="relative top-0 left-0 bg-[black] overflow-x-hidden font-['Work_Sans']">
    <img class="fixed bottom-0 right-5 md:right-20 z-10 w-20 md:w-60" src="@/assets/paint-can.png" alt="" srcset="">
    <div class="relative w-full h-screen overflow-hidden" data-relative-input="true" ref="parallax_scene">
      <div data-depth="0.25" class="logo"></div>
      <div data-depth="0.2" class="l2"></div>
      <div data-depth="0.15" class="l3"></div>
      <div data-depth="0.1" class="l4"></div>

      <Cursor />

    </div>
    <div class="w-full h-20 bg-[yellow] opacity-80 flex items-center justify-center font-bold text-xl">
      KID AND REKTED
    </div>
    <div class="container mx-auto">
      <div class="text-white font-black py-4 md:py-12 uppercase mt-4 md:mt-0 px-4 md:px-0">
        <div class="text-5xl md:text-9xl mb-12">NO ROADMAP<br />AND NO despair</div>
        <div class="flex flex-col gap-4 md:gap-8">
          <div class="text-2xl">doing interesting things</div>
          <div class="text-2xl">create more possibilities</div>
          <div class="text-2xl">no land, no game and no hoodie</div>
          <div class="text-2xl">only rekt kids like you and me</div>
        </div>
      </div>
      <div class="text-white font-black py-12 uppercase px-4 md:px-0">
        <div class="text-5xl">COLLECTION</div>
        <div class="text-sm md:text-xl py-4">4000 REKT KIDS and 5 skins with multiple daily accessory traits <span
            class="underline">(Not
            instant reveal, will announce on Twitter)</span></div>
        <div class="flex flex-wrap gap-4 bg-gray-500 p-8 rounded-xl">
          <img class="work-img" src="@/assets/works/1.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/2.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/3.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/4.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/5.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/6.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/7.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/8.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/9.png" alt="" srcset="">
          <img class="work-img" src="@/assets/works/10.png" alt="" srcset="">
        </div>
      </div>
      <div class="text-white font-black py-4 md:py-12 uppercase px-4 md:px-0">
        <div class="text-5xl">Instagram story filter</div>
        <div class="text-sm md:text-xl py-4">Ready to make 3+ diffirent instagram filter and spread on social media.
        </div>
        <div class="flex flex-wrap gap-4">
          <div class="w-full md:w-1/6 text-center relative">
            <video class="rounded-xl" loop="true" autoplay="autoplay" muted playsinline>
              <source src="https://i.imgur.com/DpwLbRi.mp4#t=0.001" type="video/mp4" />
            </video>
            <div class="absolute bottom-12 left-2">
              <div class="flex items-center gap-2">
                <img class="w-10 h-10 rounded-full" src="@/assets/filter/rektme.jpg" alt="" srcset="">
                <div class="text-md">REKT ME</div>
              </div>
            </div>
            <a class="block mt-4 underline cursor-pointer" target="_blank"
              href="https://www.instagram.com/ar/1248029719361930/">OPEN ON INSTAGRAM</a>
          </div>
          <div class="w-full md:w-1/6 flex items-center justify-center bg-white rounded-xl text-black">
            coming..
          </div>
          <div class="w-full md:w-1/6 flex items-center justify-center bg-white rounded-xl text-black">
            coming..
          </div>
          <div class="w-full md:w-1/6 flex items-center justify-center bg-white rounded-xl text-black">
            coming..
          </div>
        </div>
      </div>
      <div class="text-white font-black py-12 uppercase px-4 md:px-0">
        <div class="text-5xl mb-4">GET YOUR REKT KIDS</div>
        <Sale />
      </div>
      <div class="text-white font-black py-12 uppercase px-4 md:px-0">
        <div class="text-5xl mb-4">OFFICIAL LINK</div>
        <div class="flex flex-col md:flex-row gap-4">
          <a class="underline cursor-pointer" target="_blank" href="https://twitter.com/rektkids_nft">TWITTER</a>
          <a class="underline cursor-pointer" target="_blank"
            href="https://www.instagram.com/rektkidsnft/">INSTAGRAM</a>
          <a class="underline cursor-pointer" target="_blank"
            href="https://etherscan.io/address/0xdd887ed281e2717d5831189f5d73ef77b8e48379">ETHERSCAN</a>
          <a class="underline cursor-pointer" target="_blank"
            href="https://opensea.io/collection/rektkidsnft">OPENSEA</a>
        </div>
      </div>
      <div class="text-white text-center text-sm py-8 mb-32 md:mb-0 ">
        Copyright © 2022 REKT KIDS. All rights reserved.
      </div>
    </div>
  </div>

</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');

.logo {
  position: absolute;
  height: 20vw;
  width: 20vw;
  left: 50% !important;
  top: 50% !important;
  margin-left: -10vw;
  margin-top: -10vw;
  background-image: url('@/assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 3;
  animation: zoomIn 0.5s;
  animation-delay: 1s;
  transform: scale(1);

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
}

.l2 {
  position: absolute;
  height: 50vw;
  width: 50vw;
  left: 50% !important;
  top: 50% !important;
  margin-left: -25vw;
  margin-top: -20vw;
  background-image: url('@/assets/l2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;
  animation: zoomIn 0.5s;
  animation-delay: 1s;
  transform: scale(1);

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
}

.l3 {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/l3.png');
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;
  animation: zoomIn 0.5s;
  animation-delay: 1s;
  transform: scale(1);

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
}

.l4 {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/l4.png');
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 0;
  animation: lighten 4s infinite alternate-reverse;
  opacity: 1;

  @keyframes lighten {
    0% {
      opacity: 0.5;
    }

    20% {
      opacity: 0.5;
    }

    30% {
      opacity: 1;

    }

    31% {
      opacity: 0.5;
    }

    40% {
      opacity: .5;

    }

    50% {
      opacity: 1;
    }

    51% {
      opacity: 0.5;
    }

    90% {
      opacity: .5;

    }

    100% {
      opacity: 1;
    }
  }
}

.work-img {
  width: 200px;
  border-radius: 10px;
  border: 4px solid #000;
}

@media screen and (max-width:600px) {

  .logo {
    height: 50vw;
    width: 50vw;
    margin-left: -25vw;
    margin-top: -25vw;
  }

  .l2 {
    position: absolute;
    height: 80vw;
    width: 80vw;
    left: 50% !important;
    top: 50% !important;
    margin-left: -40vw;
    margin-top: -25vw;
    background-image: url('@/assets/l2.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 2;
    animation: zoomIn 0.5s;
    animation-delay: 1s;
    transform: scale(1);

    @keyframes zoomIn {
      from {
        transform: scale(0);
      }

      to {
        transform: scale(1);
      }
    }
  }

  .work-img {
    width: 45%;
    border-radius: 10px;
    border: 4px solid #000;
  }
}
</style>


<script setup>
import store from "@/store"
import { ref, onMounted } from "vue"

import useEthereum from "@/utils/useEthereum"

import AOS from "aos"
import Parallax from 'parallax-js'
import Cursor from "../components/cursor.vue"
import Sale from "./mint/sale.vue"

const { init } = useEthereum()
const loading = ref(true)

const parallax_scene = ref();

onMounted(() => {

  setTimeout(() => {
    loading.value = false
    AOS.init()
    init()
    new Parallax(parallax_scene.value);
  }, 1000);
})
</script>
