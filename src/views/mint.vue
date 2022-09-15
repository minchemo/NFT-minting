<template>
  <div
    class="overflow-y-auto overflow-x-hidden w-full min-h-screen flex flex-col bg-white items-center font-['joystix'] bg-[#aad999] pb-20 bg">
    <!-- nav -->
    <div class="transition-all fixed top-0 left-0 w-full text-center bg-black/[.9] text-white z-10" v-bind:class="{
      'py-4': scrollPos >= 40,
      'py-12': scrollPos < 40,
    }">
      <div class="font-['MK'] text-3xl">
        TAMAGOGI</div>
      <div class="text-sm">
        Fully onchain tamagotchi dapp
      </div>
      <div class="inline-flex justify-center gap-2 mt-4">
        <a class="hover:opacity-75" href="https://twitter.com/tamagogi_dapp" target="_blank"><img class="w-12" src="@/assets/icon/twitter.svg" alt=""
            srcset=""></a>
        <a class="hover:opacity-75" href="" target="_blank"><img class="w-12" src="@/assets/icon/opensea.svg" alt=""
            srcset=""></a>
        <a class="hover:opacity-75" href="https://discord.gg/MjcceahkVk" target="_blank"><img class="w-12" src="@/assets/icon/discord.svg" alt=""
            srcset=""></a>
        <a class="hover:opacity-75" href="" target="_blank"><img class="w-12" src="@/assets/icon/etherscan.svg" alt=""
            srcset=""></a>
      </div>
    </div>
    <!-- container -->
    <div class="container pt-52 mt-24 font-['joystix'] px-2 md:px-0">

      <div class="alert alert-warning shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Stage 1 mint is living. STAGE 2 whitelist Registration is in progress, please <a href="" target="_blank" class="bg-white btn text-black btn-sm">GO register</a></span>
        </div>
      </div>

      <div class="flex flex-col-reverse md:flex-row justify-between items-center mb-12 md:mb-0">
        <!-- intro -->
        <div class="basis-full py-8 px-8 h-auto bg-black/[.7] text-white text-xl border-[#ffaa00] border-2 rounded-xl">
          Welcome to Tamagogi.<br><br>First released by bandai in 1996, tamagotchi is the world's first virtual pet. In
          September 2022, we build tamagogi on the Ethereum blockchain as a tribute to bandai.<br />

        </div>
        <!-- eggs -->
        <div
          class="basis-full machine relative min-w-full max-w-full md:min-w-[512px] md:max-w-[512px] lg:min-w-[768px] lg:max-w-[768px] aspect-square">
          <div
            class="text-black px-1 py-0 md:px-4 font-['MK'] text-[12px] md:text-md lg:text-xl absolute z-[3] left-1/2 -translate-x-[50%] top-[15%]">
            TAMAGOGI
          </div>
          <img class="w-full absolute left-0 top-0 z-[0] drop-shadow-3xl" src="@/assets/machine.svg" alt="" srcset="">
          <img class="light w-full absolute left-0 top-0 z-[1]" src="@/assets/machine_l.svg" alt="" srcset="">
          <img class="w-[34%] absolute left-[33%] top-[36%] z-[2]" src="@/assets/egg.gif" alt="" srcset="">
        </div>
      </div>
      <!-- feature -->
      <div class="text-2xl md:text-5xl pl-8 mb-4 text-white">
        Feature
      </div>
      <div
        class="basis-full py-8 px-8 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 rounded-xl mb-12">
        1. Pet are completely generated on-chain and stored in smart contracts instead of the IPFS (except for props and
        egg).<br><br>
        2. The classic tamagotchi gameplay is preserved.<br><br>
        3. Pet reaction, hunger, bored, and happiness will change with time and stats.<br><br>
        4. Birthday system, you can find pets with the same birthday as yours.<br><br>
        5. you can name your pet.<br><br>

      </div>
      <!-- introduce  -->
      <div class="text-2xl md:text-5xl pl-8 mb-4 text-white">
        introduce
      </div>
      <div
        class="basis-full py-8 px-8 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 rounded-xl mb-12">
        Over time, the pet's hunger and boredom will increase, and its reaction will change. You need to feed and play
        in the DAPP, or "hit" (but not recommended, haha!).<br /><br />
        And anyone can feed, play or hit other people's pets.<br /><br />

        In addition to the above, you can hold the following three props to avoid the above situation.<br /><br />
        <div class="flex flex-col md:flex-row justify-center gap-8 my-16">
          <div class="basis-1/6">
            <img class="w-full rounded-xl" src="@/assets/props/food.gif" alt="" srcset="">
            <p class="text-xl text-center my-4">Food</p>
            <p>Holding the food will keep your pet from starving and you won't need to feed it again.</p>
          </div>
          <div class="basis-1/6">
            <img class="w-full rounded-xl" src="@/assets/props/toy.gif" alt="" srcset="">
            <p class="text-xl text-center my-4">Toy</p>
            <p>Holding toys can keep pets from getting bored.</p>
          </div>
          <div class="basis-1/6">
            <img class="w-full rounded-xl" src="@/assets/props/shield.gif" alt="" srcset="">
            <p class="text-xl text-center my-4">Shield</p>
            <p>Holding a shield can avoid reducing pet happiness when attacked.</p>
          </div>
        </div>

        <div class="text-yellow-500 text-center text-5xl mb-4">Master trait</div>
        <div class="text-yellow-500 text-center">If all three items are held, what will happen to the following
          situation.<br /><br />
          Your pet will no longer be hungry, bored or hit, but will always be happy and most importantly your pet
          pictures will have hearts and master traits ! <br><span class="underline">(the pet's birthday will also be the
            master)</span></div>

        <div class="flex justify-center gap-8 my-16">
          <div class="basis-1/6">
            <img class="w-full rounded-xl" src="@/assets/normal.png" alt="" srcset="">
            <p class="text-xl text-center my-4">Normal</p>
          </div>
          <div class="basis-1/6">
            <img class="w-full rounded-xl" src="@/assets/master.png" alt="" srcset="">
            <p class="text-xl text-center my-4">Master</p>
          </div>
        </div>

        <div class="text-center"> For more infomation, please read <span class="underline">FAQ</span></div>

      </div>

      <!-- MINT -->
      <div class="text-2xl md:text-5xl pl-8 mb-4 text-white">
        MINT STAGE
      </div>
      <div
        class="basis-full py-16 px-2 md:px-32 2xl:px-48 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 rounded-xl mb-12 text-center">
        <div class="text-md md:text-xl flex flex-col md:gap-4 md:flex-col">
          <span>MInt STAGE</span><span class="underline">1.PROPS (PUBLIC)</span><span class="underline">2.EGGS
            (Whitelist)</span><span class="underline">3.EGGS (public)</span>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            STAGE 1<br />prop (public)<br />(id: 0 ~ 1000)
          </div>
          <div class="flex gap-8 justify-center mt-4">
            <div class="underline">45% : toy</div>
            <div class="underline">45% : food</div>
            <div class="underline">10% : shield</div>
          </div>
          <div>
            max mint : 1
          </div>
          <div class="btn btn-md mt-8 bg-yellow-400 hover:bg-yellow-500 text-black">
            mint a prop
          </div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            STAGE 2<br />pets (whitelist)<br />(id: 1001 ~ 2460)
          </div>
          <div class="flex gap-8 justify-center mt-4">
            <div class="underline">One of the three types of eggs is randomly minted, and the probability of revealing a
              pet is the same.</div>
          </div>
          <div class="text-sm mt-16">
            The whitelist is still in the registration stage, <br />please connect wallet and register, and the result will be announced on Discord.
          </div>
          <a class="btn mt-4 bg-green-500 text-black hover:bg-yellow-300" 
            target="_blank">
            register now
          </a>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            STAGE 3<br />pets (public)<br />(id: 1001 ~ 2460)
          </div>
          <div class="flex gap-8 justify-center mt-4">
            <div class="underline">The remaining quantity after the whitelist sale will be allocated to the public sale
            </div>
          </div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8  ">
          <div class="text-yellow-500 text-2xl">
            Token Information
          </div>
          <div class="flex justify-between">
            <span>blockchain: </span>
            <span>ethereum (ERC721A)</span>
          </div>
          <div class="flex justify-between">
            <span>supply: </span>
            <span>2460</span>
          </div>
          <div class="flex justify-between">
            <span>team reserve: </span>
            <span>2</span>
          </div>
          <div class="flex justify-between">
            <span>contract: </span>
            <span>0x0</span>
          </div>
        </div>

      </div>

      <!-- FAQ -->
      <div class="text-5xl pl-8 mb-4 text-white">
        FAQ
      </div>
      <div
        class="basis-full py-16 px-2 md:px-32 2xl:px-48 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 rounded-xl mb-36 text-center">
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            roadmap ?
          </div>
          <div>We don't have a roadmap, but anything can be happen.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            Can I reroll my pet?
          </div>
          <div>Yes, but each TOKEN ID can only be reroll once, please use it with caution.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            Can I have multiple pets?
          </div>
          <div>yes</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            a prop be used on multiple pets?
          </div>
          <div>All pets in an address will be affected by an item</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            What are the restrictions on changing names?
          </div>
          <div>The pet's name can be changed unlimited times, but the name once given cannot be used again, even if it
            has been changed.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            Is this 100% on-chain rendering?
          </div>
          <div>The pet part is 100% on-chain, and images of props are stored in IPFS, but the path has been written in
            the contract and cannot be changed.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            When can I see my pet ?
          </div>
          <div>Please follow TWITTER and join DISCORD for the latest reveal news</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            How are pet hunger and other values ​​calculated?
          </div>
          <div>Each state has a different level, and the value is calculated according to the rate and the time, but the
            ratio of this level can be adjusted, and we will continue to observe it for a few weeks after the sale ends.
          </div>
        </div>

      </div>

      <!-- footer -->
      <div class="text-xl mb-4 text-white text-center">
        Powered by <span class="underline">hash%hatch</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('@/assets/bg.png');
  background-size: initial;
  background-repeat: repeat;
  background-attachment: fixed;
  animation: bgMove 25s linear 0s infinite;
  will-change: auto;

  @keyframes bgMove {
    0% {
      background-position-x: 0;
      background-position-y: 0;
    }

    100% {
      background-position-x: -1000px;
      background-position-y: 500px;
    }
  }
}

.light {
  animation: lighting 1s infinite;

  @keyframes lighting {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue"
import useEthereum from "@/utils/useEthereum"
import AOS from "aos"

const scrollPos = ref(0);

const { init, requestAccount, buy } = useEthereum()

onMounted(() => {
  AOS.init()
  // init()

  window.addEventListener('scroll', function () { scrollPos.value = this.scrollY })
})
</script>
