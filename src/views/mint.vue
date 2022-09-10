<template>
  <div
    class="overflow-y-scroll w-screen md:h-screen flex flex-col bg-white items-center justify-center font-['Blocktopia'] select-none">
    <!-- <Sale class="px-8" /> -->
    <!-- logo -->
    <div
      class="flex flex-col md:flex-row justify-center gap-4 items-center relative md:absolute z-[15] text-white top-0 md:left-16 2xl:left-40 mt-20 md:mt-0 md:top-10 2xl:top-20">
      <img class="w-20 md:w-24 2xl:w-32 logo" src="@/assets/logo.gif" alt="" srcset="">
      <div class="leading-none">
        <h1 class="text-3xl 2xl:text-5xl text-center md:text-left">NOT A LAND</h1>
        <p class="text-sm 2xl:text-xl text-center md:text-left">notaland.games</p>
      </div>
      <div
        class="bg-[#50ffab] text-black text-xl px-6 py-2 rounded-md md:ml-12 hover:cursor-pointer hover:bg-[#ffde36] btn normal-case tracking-wide font-normal"
        @click="mintOpen = true">MINT PAGE</div>
      <label for="my-tokens" class="bg-[#50ffab] text-black text-xl px-6 py-2 rounded-md md:ml-6 hover:cursor-pointer hover:bg-[#ffde36] btn normal-case tracking-wide font-normal">STORAGE</label>
    </div>
    <!-- main -->
    <div
      class="flex flex-col md:flex-row gap-10 2xl:gap-20 items-center justify-between z-10 w-full h-full md:px-40 text-white px-10 md:px-20 2xl:px-40 pt-12 md:pt-20">
      <!-- intro -->
      <div class="drop-shadow-2xl md:max-h-[80%] md:overflow-y-scroll 2xl:overflow-y-auto relative">
        <div class="text-xl md:text-2xl 2xl:text-5xl text-[#ffde36] uppercase">What is "Not a land"</div>
        <div class="text-md md:text-md 2xl:text-xl">This is a stealth launch NFT project and we are creating a
          cross-platform multiplayer game that allows
          players to
          survive, <br />build or more of the fun of playing together.<br /><br />In this world, land is shared,
          resources are
          shared,
          But what you have will not be shared.<br /><br />It will be a free-to-play game, and the gameplay includes
          characters, vegetation ecology, buildings, planting systems and your neighbors (?).<br />Blockchain was a
          landing spot for us and had already
          started alpha testing right now.<br /></div>

        <div class="text-xl md:text-2xl 2xl:text-5xl text-[#ffde36] uppercase mt-10">Tokens</div>
        <div class="text-md md:text-md 2xl:text-xl">"Not a land" is not PFP / land / pass, but <span
            class="underline">TOKENS</span>
          that
          will be used in the game. For more detail, please check our <span class="underline cursor-pointer"
            @click="mintOpen = true">mint page</span>.</div>

        <div class="text-xl md:text-2xl 2xl:text-5xl text-[#ffde36] uppercase mt-10 flex items-center gap-4">alpha test
          <label for="game-manual"
            class="uppercase btn-sm text-sm md:text-sm 2xl:text-xl btn rounded-md font-normal bg-[#50ffab] text-black hover:bg-white border-0 modal-button">game
            manual</label>
        </div>
        <div class="text-md md:text-md 2xl:text-xl mt-2">We have already done lot of things before public sale. We have
          prepared all requirements for alpha testing. <br />You can join the game on the right side !
        </div>

        <div class="text-xl md:text-2xl 2xl:text-5xl text-[#ffde36] uppercase mt-10 flex items-center gap-4">Official
          links
        </div>
        <div class="text-md md:text-md 2xl:text-xl">
          The twitter will be updated while sold out and all official news will announce there in the future.
          <div class="flex gap-4">
            <a class="underline" href="https://opensea.io/collection/notaland">Opensea</a>
            <a class="underline" href="https://etherscan.io/">Etherscan</a>
          </div>
        </div>
      </div>
      <!-- game -->
      <div
        class="w-full md:w-[unset] h-[unset] md:h-5/6 bg-[rgba(255,222,54,0.15)] backdrop-blur-md aspect-[9/16] shadow-xl mb-24 md:mb-0">
        <div v-if="gameOpen" class="z-[1] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
          <img class="w-20 logo" src="@/assets/logo.gif" alt="" srcset="">
          <p class="text-center">Loading...</p>
        </div>
        <iframe v-if="gameOpen" class="rounded-lg relative w-full h-full z-[2]"
          src="https://alpha.notaland.games/"></iframe>
        <div v-else class="h-full flex flex-col items-center justify-center">
          <div @click="gameOpen = true"
            class="text-3xl text-[#b86212] bg-white px-8 py-4 cursor-pointer hover:bg-[#b86212] hover:text-white transition-all text-center">
            Play Game</div>
          <div class="text-justify text-lg mt-20 bg-[rgba(0,0,0,0.3)] px-6 py-6 w-2/3 2xl:w-1/3">
            <div class="flex justify-between"><span>Stage：</span><span class="underline">Alpha</span></div>
            <div class="flex justify-between"><span>Web：</span><span>Open</span></div>
            <div class="flex justify-between"><span>IOS：</span><span>Close</span></div>
            <div class="flex justify-between"><span>Android：</span><span>Close</span></div>
          </div>
        </div>
      </div>
    </div>
    <!-- background -->
    <div class="bg">
      <img class="shadow" src="@/assets/tree_shadow.png" ref="bgShadow" alt="" srcset="">
      <img class="back" src="@/assets/tree_back.png" alt="" srcset="">
    </div>
  </div>
  <!-- game manual -->
  <input type="checkbox" id="game-manual" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box font-['Blocktopia']">
      <h3 class="text-2xl text-center">Game Manual</h3>
      <p class="py-4">Alpha game max to 200 players online and won't save any game progress.
      </p>
      <div class="text-lg break-words">
        <ul class="list-disc pl-4 my-8">
          <li>Select a location and character.</li>
          <li>Type a cool name and click Go!</li>
          <li>Check backpack and equip the weapon.</li>
          <li>Drag to move <span class="underline">(Press and hold the right of the screen)</span> and fight <span
              class="underline">(Click to the
              left of the screen)</span> with enemy to gain XP and Level up.</li>
        </ul>
        <div>
          <div>Tip: It will automatically respawn after death.</div>
          <div>Tip: Get HP while idle.</div>
          <div>Tip: You could be died.</div>
        </div>
      </div>
      <div class="modal-action">
        <label for="game-manual"
          class="uppercase btn font-normal text-xl bg-[#ffde36] text-black hover:bg-white border-0 modal-button">back</label>
      </div>
    </div>
  </div>
  <Mintpage v-if="mintOpen" />
  <MyTokens />
  <div
    class="fixed left-1/2 -translate-x-[50%] bottom-[3%] rounded-full z-[101] font-['Blocktopia'] tracking-wide font-normal px-4 py-2 bg-[#ffde36] text-black cursor-pointer text-xl"
    v-if="mintOpen" @click="mintOpen = false">CLOSE</div>
</template>

<style lang="scss" scoped>
.bg {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(185 112 28);
  z-index: 0;
  pointer-events: none;

  .shadow {
    position: relative;
    z-index: 5;
    height: 100%;
    min-width: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .back {
    position: absolute;
    z-index: 4;
    height: 100%;
    left: 0;
    top: 0;
    animation: move 40s linear infinite;
    max-width: unset;
    transition: all .5s;
    opacity: .5;
    filter: blur(2px);

    @keyframes move {
      from {
        transform: translateX(0%);
      }

      to {
        transform: translateX(-50%);
      }
    }
  }
}

.logo {

  // animation: rotate 30s infinite linear;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-360deg);
    }
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue"
import useEthereum from "@/utils/useEthereum"
import AOS from "aos"
import Mintpage from "./mintpage.vue"
import MyTokens from "./myTokens.vue"

const { init } = useEthereum()
const gameOpen = ref(false);
const mintOpen = ref(false);

onMounted(() => {
  AOS.init()
  init()
})
</script>
