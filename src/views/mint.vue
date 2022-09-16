<template>
  <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />
  <div
    class="overflow-y-auto overflow-x-hidden w-full min-h-screen flex flex-col bg-white items-center font-['joystix'] bg-[#aad999] pb-20 bg">
    <!-- nav -->
    <div class="transition-all fixed top-0 left-0 w-full text-center bg-black/[.9] text-white z-10" v-bind:class="{
      'py-2 md:py-4': scrollPos >= 40,
      'py-6 md:py-12': scrollPos < 40,
    }">
      <div class="font-['MK'] text-2xl md:text-3xl">
        TAMAGOGI</div>
      <div class="text-sm">
        Fully onchain tamagotchi dapp
      </div>
      <div class="inline-flex justify-center gap-2 mt-2  md:mt-4">
        <a class="hover:opacity-75" href="https://twitter.com/tamagogi_dapp" target="_blank"><img class="w-8 md:w-12"
            src="@/assets/icon/twitter.svg" alt="" srcset=""></a>
        <a class="hover:opacity-75" href="https://opensea.io/collection/tamagogi" target="_blank"><img
            class="w-8 md:w-12" src="@/assets/icon/opensea.svg" alt="" srcset=""></a>
        <a class="hover:opacity-75" href="https://discord.gg/MjcceahkVk" target="_blank"><img class="w-8 md:w-12"
            src="@/assets/icon/discord.svg" alt="" srcset=""></a>
        <a class="hover:opacity-75" href="https://etherscan.io/address/0x2841413795Bbe4E42C1A8558B3e55EcDE4a12014"
          target="_blank"><img class="w-8 md:w-12" src="@/assets/icon/etherscan.svg" alt="" srcset=""></a>
      </div>
    </div>
    <!-- container -->
    <div class="container pt-24 md:pt-52 mt-24 font-['joystix'] px-4">
      <div class="alert bg-red-300 shadow-lg justify-center">
        <div class="flex-col md:flex-row">STAGE 2 (PET mint) whitelist Registration is in progress, please <a
            @click="scrollTo('register-btn')" target="_blank" class="bg-white btn text-black btn-sm">GO
            register</a></div>
      </div>

      <div class="flex flex-col-reverse md:flex-row justify-between items-center mb-12 md:mb-0">
        <!-- intro -->
        <div class="basis-full py-8 px-8 h-auto bg-black/[.7] text-white text-xl border-[#ffaa00] border-2">
          Welcome to Tamagogi!<br><br>First released by bandai in 1996, tamagotchi is the world's first virtual pet. In
          September 2022, we build tamagogi on the Ethereum blockchain as a tribute to bandai.<br />

        </div>
        <!-- eggs -->
        <div data-aos="zoom-in"
          class="basis-full machine relative min-w-full max-w-full md:min-w-[512px] md:max-w-[512px] lg:min-w-[768px] lg:max-w-[768px] aspect-square">
          <div
            class="text-black px-1 py-0 md:px-4 font-['MK'] text-[12px] md:text-md lg:text-xl absolute z-[3] left-1/2 -translate-x-[50%] top-[15%]">
            TAMAGOGI
          </div>
          <img class="w-full absolute left-0 top-0 z-[0] drop-shadow-3xl" src="@/assets/machine.svg" alt="" srcset="">
          <img class="light w-full absolute left-0 top-0 z-[1]" src="@/assets/machine_l.svg" alt="" srcset="">
          <img class="w-[34%] absolute left-[33%] top-[36%] z-[2]" src="@/assets/egg.gif" alt="" srcset="">
          <div class="m-btns">
            <div class="m-btn aspect-square"></div>
            <div class="m-btn aspect-square"></div>
            <div class="m-btn aspect-square"></div>
          </div>
        </div>
      </div>
      <!-- feature -->
      <div
        class="text-2xl md:text-5xl mb-4 text-white bg-black/[0.6] border-[#ffaa00] border-2 inline-block ml-auto mr-auto w-auto p-4">
        Feature
      </div>
      <div class="basis-full py-8 px-8 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 mb-32">
        1. Pet are completely generated on-chain and stored in smart contracts instead of the IPFS (except for props and
        egg).<br><br>
        2. The classic tamagotchi gameplay is preserved.<br><br>
        3. Pet reaction, hunger, bored, and happiness will change with time and stats.<br><br>
        4. Birthday system, you can find pets with the same birthday as yours.<br><br>
        5. you can name your pet.<br><br>

      </div>
      <!-- introduce  -->
      <div
        class="text-2xl md:text-5xl mb-4 text-white bg-black/[0.6] border-[#ffaa00] border-2 inline-block ml-auto mr-auto w-auto p-4">
        introduce
      </div>
      <div class="basis-full py-8 px-8 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 mb-32">
        Over time, the pet's hunger and boredom will increase, and its reaction will change. You need to feed and play
        in the DAPP, or "hit" (but not recommended, haha!).<br /><br />
        And anyone can feed, play or hit other people's pets.<br /><br />

        In addition to the above, you can hold the following three props to avoid the above situation.<br /><br />
        <div class="flex flex-col md:flex-row justify-center gap-8 my-16">
          <div class="basis-1/6">
            <img class="w-full rounded-xl" style="filter: brightness(0) invert(1);" src="@/assets/props/unreveal.gif"
              alt="" srcset="">
            <p class="text-xl text-center my-4">Unreveal Box</p>
          </div>
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

        <div class="text-yellow-500 text-center text-xl md:text-5xl mb-4">Master trait</div>
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


        <div class="text-yellow-500 text-center text-xl md:text-5xl mb-4">Visualize UI</div>
        <div class="text-yellow-500 text-center">The visualize UI will be designed into our dapp frontend, you can check
          others pets, your pets and interact with it. More practical applications will continue to be launched, such as
          combining APP or your apple watch , etc.</div>

        <div class="flex flex-col md:flex-row justify-center gap-8 my-16">

          <div class="basis-full md:basis-1/3">
            <img class="w-full rounded-xl" src="@/assets/ui/ui_1.png" alt="" srcset="">
            <p class="text-center mt-4">dapp ui</p>
          </div>
          <div class="basis-full md:basis-1/3">
            <img class="w-full rounded-xl" src="@/assets/ui/watchface_1.png" alt="" srcset="">
            <p class="text-center mt-4">Apple watch face</p>
          </div>

        </div>

        <div class="text-center"> For more infomation, please read <span class="underline cursor-pointer"
            @click="scrollTo('faq')">FAQ</span></div>

      </div>

      <!-- MINT -->
      <div
        class="text-2xl md:text-5xl mb-4 text-white bg-black/[0.6] border-[#ffaa00] border-2 inline-block ml-auto mr-auto w-auto p-4">
        MINT STAGE
      </div>
      <div
        class="basis-full py-16 px-2 md:px-32 2xl:px-48 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 mb-32 text-center">
        <div class="text-black inline-block bg-red-400 cursor-pointer px-4 py-1" @click="requestAccount()"
          v-if="store.state.connectedAddress == ''">
          connect wallet
        </div>
        <div class="text-red-400" v-else>
          {{ store.state.connectedAddress.substring(0,
          5)
          }}...{{ store.state.connectedAddress.substr(store.state.connectedAddress.length - 4) }}
        </div>
        <div class="text-2xl md:text-2xl 2xl:text-4xl text-center mt-8">
          supply:
          <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
          <number :from="0" :to="store.state.nftConfig.petMaxSupply + store.state.nftConfig.propMaxSupply"
            :duration="1" />
        </div>
        <div class="mt-16 bg-black/[0.8] p-8"
          v-bind:class="{'border-8 border-yellow-400 current-stage': store.state.nftConfig.mintStage == 1}">
          <div
            class="text-yellow-500 text-xl md:text-4xl text-left flex flex-col md:flex-row md:items-end justify-between">
            <span class="border p-2 border-yellow-500">STAGE 1 - prop</span> <span class="text-lg">id: 1 ~ 2000</span>
          </div>
          <div class="flex gap-8 justify-center my-8">
            <div class="underline">45% : toy</div>
            <div class="underline">45% : food</div>
            <div class="underline">10% : shield</div>
          </div>
          <div>
            UTC 9/16 18:00<br/>
            max mint : 1<br />
            price : free
          </div>
          <div class="btn btn-md mt-8 bg-yellow-400 hover:bg-yellow-500 text-black" @click="mint('prop')">
            get a prop
          </div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8"
          v-bind:class="{'border-8 border-yellow-400 current-stage': store.state.nftConfig.mintStage == 2}">
          <div
            class="text-yellow-500 text-xl md:text-4xl text-left flex flex-col md:flex-row md:items-end justify-between">
            <span class="border p-2 border-yellow-500">STAGE 2 - pets (WL)</span> <span class="text-lg">id: 2001 ~
              3825</span>
          </div>
          <div class="my-8">
            Check twitter and discord for start & end time / schedule<br/>
            max mint : 1<br />
            price : {{ store.state.nftConfig.mintStage != 2 ? '?' :
            store.state.web3.utils.fromWei(store.state.nftConfig.price.toString(), 'ether')}} eth<br />
          </div>
          <div class="bg-red-200 py-4">
            <div class="text-sm text-black">
              The whitelist is still in the registration stage, <br />please connect wallet and register, the result
              will
              be announced on Discord and Twitter.
            </div>
            <a id="register-btn" class="btn mt-4 bg-red-400 text-black hover:bg-yellow-300" target="_blank"
              @click="register()">
              register now !
            </a>
          </div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8"
          v-bind:class="{'border-8 border-yellow-400 current-stage': store.state.nftConfig.mintStage == 3}">
          <div
            class="text-yellow-500 text-xl md:text-4xl text-left flex flex-col md:flex-row md:items-end justify-between">
            <span class="border p-2 border-yellow-500">STAGE 3 - pets (Public)</span> <span class="text-lg">id: 2001 ~
              3825</span>
          </div>
          <div class="my-8">
            max mint : 1<br />
            price : {{ store.state.nftConfig.mintStage != 3 ? '?' :
            store.state.web3.utils.fromWei(store.state.nftConfig.price.toString(), 'ether')}} eth
          </div>
          <div class="flex gap-8 justify-center mt-4">
            <div class="underline text-sm">The remaining quantity after the whitelist sale will be allocated to the
              public sale
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
            <span>{{ store.state.nftConfig.petMaxSupply + store.state.nftConfig.propMaxSupply }}</span>
          </div>
          <div class="flex justify-between">
            <span>team reserve: </span>
            <span>2</span>
          </div>
          <div class="flex justify-between">
            <span>contract: </span>
            <a href="https://etherscan.io/address/0x2841413795Bbe4E42C1A8558B3e55EcDE4a12014"
              target="_blank">0x2841413795Bbe4E42C1A8558B3e55EcDE4a12014</a>
          </div>
        </div>

      </div>

      <!-- FAQ -->
      <div id="faq"
        class="text-2xl md:text-5xl mb-4 text-white bg-black/[0.6] border-[#ffaa00] border-2 inline-block ml-auto mr-auto w-auto p-4">
        FAQ
      </div>
      <div
        class="basis-full py-16 px-2 md:px-32 2xl:px-48 h-auto bg-black/[.7] text-white text-md border-[#ffaa00] border-2 mb-36 text-center">
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            roadmap
          </div>
          <div>We don't have a roadmap, but anything can be happen.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            Can I reroll my pet
          </div>
          <div>Yes, but each TOKEN ID can only be reroll once, please use it with caution.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            Can I have multiple pets
          </div>
          <div>yes</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            a prop be used on multiple pets
          </div>
          <div>All pets in an address will be affected by an item</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            What are the restrictions on changing names
          </div>
          <div>The pet's name can be changed unlimited times, but the name once given cannot be used again, even if it
            has been changed.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            Is this 100% on-chain rendering
          </div>
          <div>The pet part is 100% on-chain, and images of props are stored in IPFS, but the path has been written in
            the contract and cannot be changed.</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            When can I see my pet
          </div>
          <div>Please follow TWITTER and join DISCORD for the latest reveal news</div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            How are pet hunger and other values ​​calculated
          </div>
          <div>Each state has a different level, and the value is calculated according to the rate and the time, but the
            ratio of this level can be adjusted, and we will continue to observe it for a few weeks after the sale ends.
          </div>
        </div>
        <div class="mt-16 bg-black/[0.8] p-8">
          <div class="text-yellow-500 text-md md:text-2xl">
            How pet birthdate works
          </div>
          <div>In order to save the gas cost during minting, we cannot guarantee that there will be pet birthdays every
            day, but it is certain that the pet birthdays obtained during minting will be random.
          </div>
        </div>

      </div>

      <!-- footer -->
      <div
        class="text-md text-white bg-black/[0.6] border-[#ffaa00] border-2 block mr-auto w-1/2 md:w-1/3 mx-auto p-4 text-center">
        Powered by <span class="underline">hash/hatch</span>
      </div>
    </div>
  </div>
  <div class="alert-bottom alert shadow-lg fixed z-[100] bottom-40 font-['joystix']" data-aos="zoom-in"
    v-if="showAlert">
    <div>
      {{alertMsg}}
    </div>
    <div class="flex-none">
      <button class="btn btn-sm btn-ghost text-red-500" @click="showAlert = false; alertMsg = '';">Close</button>
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

.alert-bottom {
  width: 600px;
  left: 50%;
  margin-left: -300px;
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

.m-btns {
  display: flex;
  position: absolute;
  width: 120px;
  height: 120px;
  bottom: 17%;
  left: 42%;
  z-index: 10;
  justify-content: space-between;
  align-items: center;

  .m-btn {
    width: 25%;
    background-color: #e0ff53;
    border-radius: 100%;
    cursor: pointer;
    box-shadow: 2px 2px 0px #000;

    &:active {
      transform: translateY(1px);
      box-shadow: 1px 1px 0px #000;
    }
  }
}

.current-stage {
  border-radius: 40px;
  animation: round .8s infinite alternate-reverse linear;

  @keyframes round {
    0% {
      border-style: dashed;
    }

    100% {
      border-style: solid;
    }
  }
}

@media screen and (max-width: 769px) {
  .m-btns {
    width: 90px;
    height: 90px;
    bottom: 17%;
    left: 42%;
  }
}

@media screen and (max-width: 1025px) {
  .m-btns {
    width: 90px;
    height: 90px;
    bottom: 16%;
    left: 41%;
  }
}

@media screen and (max-width: 768px) {
  .m-btns {
    width: 15%;
    bottom: 13%;
    left: 42%;
  }

  .alert-bottom {
    width: 90%;
    margin-left: -45%;
  }
}
</style>

<script setup>

import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { ref, onMounted } from "vue"
import useEthereum from "@/utils/useEthereum"
import AOS from "aos"
import store from "@/store"

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyB9uJeHJjwyl3TN1f1OA6Bg18n_9dcwwhw",
  authDomain: "tamagogi-6455f.firebaseapp.com",
  projectId: "tamagogi-6455f",
  storageBucket: "tamagogi-6455f.appspot.com",
  messagingSenderId: "558491248440",
  appId: "1:558491248440:web:01d88f1e54bd3e010103cd",
  measurementId: "G-JJTDC0QEBZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LcrcgAiAAAAAAY1_M5ggplDzU9o8f8O0OW1-iu7'),
  isTokenAutoRefreshEnabled: true
});
const db = getFirestore(firebaseApp);

// Web3
const { init, requestAccount, getProp, hatchEgg, merkleHatchEgg } = useEthereum()

const scrollPos = ref(0);
const scrollTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });;
}

const isLoading = ref(false);
const showAlert = ref(false);
const alertMsg = ref('');

const mint = async (type) => {
  if (store.state.connectedAddress == '') {
      showAlert.value = true
      alertMsg.value = 'Please connect wallet first.'
    return;
  }
  if (store.state.minting) {
    return;
  }
  store.dispatch("setStateData", { name: "setMinting", data: true })

  if (type == 'prop') {
    await getProp();
    showAlert.value = true
    alertMsg.value = 'ok'
  } else if (type == 'merkleHatchEgg') {

  } else if (type == 'hatchEgg') {

  }
}

const register = async () => {
  isLoading.value = true;
  if (store.state.connectedAddress == '') {
    requestAccount();

  } else {
    const docRef = doc(db, "whitelist", store.state.connectedAddress);
    const docSnap = await getDoc(docRef);



    if (docSnap.exists()) {
      showAlert.value = true
      alertMsg.value = 'Address exist.'
    } else {
      await setDoc(doc(db, "whitelist", store.state.connectedAddress), {
        add: true,
      });
      showAlert.value = true
      alertMsg.value = 'Address added successfully, Please follow our twitter and <span class="underline">discord</span> for latest news!'
    }
  }
  isLoading.value = false;
}


onMounted(() => {
  AOS.init()
  init()

  setTimeout(() => {
    requestAccount();
  }, 1000);

  window.addEventListener('scroll', function () { scrollPos.value = this.scrollY })
})
</script>
