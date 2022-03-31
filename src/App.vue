<template>
  <div class="error-page" v-if="error">
    <p>
      You're not able to visit this website, Please check your metamask network
      option (Mainnet only).<br />
    </p>
  </div>
  <div class="container" v-else>
    <div class="main" v-bind:class="{ active: gomint }">
      <div class="alert-msg" v-if="isShowAlert" @click="isShowAlert = false">
        {{ alertMsg }}
      </div>
      <div
        class="alert-msg-overlay"
        v-if="isShowAlert"
        @click="isShowAlert = false"
      ></div>
      <div class="header">
        <h1 class="name">自撮り Jidori</h1>
        <div class="subtitle">あなたに最適な自撮り写真を見つけましょう</div>
        <div class="go-mint" @click="gomint = !gomint">GO MINT！</div>
        <div class="slide">
          <Splide :options="slideOption" :extensions="extensions" ref="slide">
            <SplideSlide v-for="i in 4" :key="i">
              <img :src="require(`@/assets/images/${i}.png`)" />
            </SplideSlide>
          </Splide>
        </div>
      </div>

      <div class="lens"></div>

      <div class="mint">
        <template v-if="connectedWalletAddress">
          <!--Loading-->
          <template v-if="loading"> Loading... </template>
          <!--Paused-->
          <template v-else-if="jidoriConfig.paused">
            販售尚未開始或已停止
          </template>
          <template
            v-else-if="
              parseInt(totalSupply) >= parseInt(jidoriConfig.maxSupply)
            "
          >
            <div class="sold-out">
              We sold out.<br /><br />
              But you can buy it on OpenSea now.
            </div>
          </template>
          <!--Pre-Sale-->
          <template v-else-if="!jidoriConfig.paused && jidoriConfig.isPreSale">
            <template v-if="whitelistAddressesIndex >= 0">
              <div class="supply">
                {{ totalSupply }} / {{ jidoriConfig.maxSupply }}
              </div>
              <p class="whitelist-msg">{{ isWhitelistedMsg }}</p>
              <div class="mint-button" @click="preSaleMint">Pre-Sale MINT</div>

              <div class="minted">You have minted: {{ mintedAmount }}</div>
            </template>
            <template v-else>
              <div class="supply">
                {{ totalSupply }} / {{ jidoriConfig.maxSupply }}
              </div>
              <p class="whitelist-msg">{{ isWhitelistedMsg }}</p>
            </template>
          </template>
          <!--Public-Sale-->
          <template
            v-else-if="!jidoriConfig.paused && jidoriConfig.isPublicSale"
          >
            <div class="supply">
              {{ totalSupply }} / {{ jidoriConfig.maxSupply }}
            </div>
            <p class="public-msg">
              Public-sale is now live, Maximum mint amount:
              {{ jidoriConfig.publicSaleMaxMint }}
            </p>
            <div class="selection">
              <p>Select Amount</p>
              <div
                class="item"
                v-for="(amount, i) in parseInt(jidoriConfig.publicSaleMaxMint)"
                :key="i"
                v-bind:class="{ selected: publicSaleSelectedAmount == amount }"
                @click="publicSaleSelectedAmount = amount"
              >
                {{ amount }}
              </div>
              <!-- <p>Amount</p> -->
            </div>
            <div class="mint-button" @click="publicSaleMint">
              Public-Sale MINT
            </div>

            <div class="minted">You have minted: {{ mintedAmount }}</div>
          </template>
        </template>
        <template v-else>
          <div class="init-warning">Please connect to Metamask wallet</div>
        </template>
        <div class="go-back" @click="gomint = !gomint">GO BACK！</div>
      </div>
    </div>
    <div class="info">
      <div class="about">
        <div class="item">
          <h2>概念 Concept</h2>
          <p>
            The creative idea comes from people's usual selfie habits, and maybe
            it's similar to you.
          </p>
        </div>
        <div class="item">
          <h2>収集 Collection</h2>
          <p>
            This collection is N in total and contains hundreds of fully
            hand-painted features.
          </p>
        </div>
        <div class="item">
          <h2>将来の開発 Future</h2>
          <p>
            Jidori is the author's first creation (v1), all genders are female,
            and a male version (v2) will be released in the future, we will pick
            10% v1 holders and random airdrop, and then reserved 50% v2 slots
            for whitelist stay tuned!
          </p>
        </div>
        <div class="item">
          <h2>チーム Team</h2>
          <div class="team">
            <div class="member">
              <img class="image" src="@/assets/images/1.png" alt="" srcset="" />
              <p>Artist e11i</p>
            </div>
            <div class="member">
              <img class="image" src="@/assets/images/2.png" alt="" srcset="" />
              <p>Founder&Dev Jmo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg">
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>

        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
    <div class="connect-wallet" @click="requestAccount()">
      <div v-if="connectedWalletAddress">
        {{ connectedWalletAddress.substring(-5, 7) }}...{{
          connectedWalletAddress.slice(37)
        }}
      </div>
      <div v-else>Connect Wallect</div>
    </div>
  </div>
  <div class="flash" v-if="!error && takingPicture"></div>
</template>

<script>
import Web3 from 'web3';
import contractConfig from '@/utils/contract';
import whitelist from "@/assets/whitelist.json";

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

import { onMounted, ref, reactive } from "vue";

import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Grid } from '@splidejs/splide-extension-grid';
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

export default {
  name: 'App',
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const connectedWalletAddress = ref();
    const whitelistAddresses = ref(whitelist);
    const whitelistAddressesIndex = ref(-1);

    const mintedAmount = ref(0);
    const totalSupply = ref(0);
    const jidoriConfig = ref({
      paused: true,
      isPublicSale: false,
      isPreSale: false,
      preSaleMaxMint: 1,
      publicSaleMaxMint: 2,
      publicSalePrice: 0,
      preSalePrice: 0,
      maxSupply: 0
    });
    const publicSaleSelectedAmount = ref(1);

    const targetNetworkId = ref(4);
    const isWhitelistedMsg = ref('');
    const contract = ref();

    const exceedMaxAmount = ref(false);

    const takingPicture = ref(false);
    const web3 = ref();

    const loading = ref(true);
    const error = ref(false);

    const isShowAlert = ref(false);
    const alertMsg = ref('');

    const interval = ref();

    const gomint = ref(false);

    const slide = ref(null);
    const slideOption = reactive({
      type: "loop",
      rewind: true,
      autoScroll: {
        speed: 4,
        rewind: true,
        pauseOnHover: false,
        pauseOnFocus: false
      },
      grid: {
        rows: 2,
        cols: 2,
        gap: 0,
      },
      perPage: 3,
      perMove: 1,
      gap: 0,
      pagination: false,
      arrows: false,
      breakpoints: {
        640: {
          perPage: 1,
          gap: 0,
          autoScroll: {
            speed: 0.5,
          },
        },
      },
    });

    //連線錢包請求
    const requestAccount = () => {
      if (connectedWalletAddress.value) {
        return;
      }
      const { ethereum } = window;

      ethereum.request({ method: 'eth_requestAccounts' }).then((account) => {
        connectedWalletAddress.value = account[0];
        checkWhitelisted();
        getSupply();
        getMintedAmount();
      }).catch(e => {
        const errorCode = e.code;

        if (errorCode == 4001) {
          showAlert('User rejected the request, Please connect again.');
        } else if (errorCode == -32002) {
          showAlert('Request already pending, please check on your Metamask.');
        }

      });
    }

    //讀取合約目前設定
    const getConfig = () => {
      contract.value.methods
        .jidoriConfig().call().then((config) => {
          jidoriConfig.value = config;

          if (loading.value) {
            setTimeout(() => {

              loading.value = false;
            }, 1000);
          }
        });
    };

    const getSupply = () => {
      contract.value.methods
        .totalSupply().call().then((supply) => {
          totalSupply.value = supply;
        });
    }

    //取得白名單證明
    const getProof = () => {
      const leafNodes = whitelistAddresses.value.addresses.map((addr) => keccak256(addr))
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

      return merkleTree.getHexProof(leafNodes[whitelistAddressesIndex.value]);
    }

    //白名單檢查
    const checkWhitelisted = () => {
      if (connectedWalletAddress.value) {
        let addressIndex = whitelistAddresses.value.addresses.findIndex(item => item.toLowerCase() == connectedWalletAddress.value.toLowerCase());
        whitelistAddressesIndex.value = addressIndex;
        if (addressIndex > -1) {
          isWhitelistedMsg.value = 'You are in whitelist! (Maximum mint amount: 1)';
        } else {
          isWhitelistedMsg.value = 'Not in whitelist';
        }
      } else {
        isWhitelistedMsg.value = 'Not connected Metamask';
      }
    }

    //檢查已mint數量
    const getMintedAmount = () => {
      contract.value.methods
        .addressMinted(connectedWalletAddress.value).call().then((amount) => {
          mintedAmount.value = amount;

          if (jidoriConfig.value.isPreSale) {
            if (amount >= jidoriConfig.value.preSaleMaxMint) {
              exceedMaxAmount.value = true;
            } else {
              exceedMaxAmount.value = false;
            }
          } else if (jidoriConfig.value.isPublicSale) {
            if (amount >= jidoriConfig.value.publicSaleMaxMint) {
              exceedMaxAmount.value = true;
            } else {
              exceedMaxAmount.value = false;
            }
          }
        });
    }

    //預售mint
    const preSaleMint = () => {
      if (exceedMaxAmount.value) {

        showAlert("Can't mint more.")
        return
      }

      let proof = getProof();

      const { ethereum } = window;

      const transactionParams = {
        to: contractConfig.contract_address,
        from: connectedWalletAddress.value,
        gasLimit: web3.value.utils.toHex(300000),
        value: web3.value.utils.toHex(jidoriConfig.value.preSalePrice),
        data: contract.value.methods.preSaleMint(1, proof).encodeABI()
      };
      return ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams]
      })
    }

    //公售mint
    const publicSaleMint = () => {
      if (exceedMaxAmount.value) {
        showAlert("Can't mint more.")
        return
      }

      const { ethereum } = window;

      const transactionParams = {
        to: contractConfig.contract_address,
        from: connectedWalletAddress.value,
        gasLimit: web3.value.utils.toHex(300000),
        value: web3.value.utils.toHex(jidoriConfig.value.publicSalePrice * publicSaleSelectedAmount.value),
        data: contract.value.methods.publicSaleMint(publicSaleSelectedAmount.value).encodeABI()
      };
      return ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams]
      })
    }

    //閃光燈
    const showFlashlight = () => {
      takingPicture.value = true;

      setTimeout(() => {
        takingPicture.value = false
      }, 1000);
    }

    //顯示錯誤訊息
    const showAlert = (msg) => {
      alertMsg.value = msg;
      isShowAlert.value = true;
    }

    //初始化
    onMounted(() => {
      const { ethereum } = window;

      if (!ethereum) {
        showAlert('No wallet plugin is available! Please change your browser or install wallet plugin.');
        return;
      }

      web3.value = new Web3(ethereum);

      //連接合約
      contract.value = new web3.value.eth.Contract(contractConfig.ABI, contractConfig.contract_address)
      //取得合約設定
      getConfig();

      ethereum.on('chainChanged', function (id) {
        web3.value.eth.getChainId().then((id) => {

          if (id != targetNetworkId.value) {
            error.value = true;
            clearInterval(interval.value);
          } else {
            window.location.reload();
          }
        })
      })

      web3.value.eth.getChainId().then((id) => {
        //檢查chainId
        if (id != targetNetworkId.value) {
          showAlert('Please Change to mainnet.')
          return
        }
        //監聽地址變化
        ethereum.on('accountsChanged', function (accounts) {
          connectedWalletAddress.value = accounts[0]
          checkWhitelisted();
        })
        //開始請求錢包同意
        requestAccount();
        //定時
        interval.value = setInterval(() => {
          getConfig();

          if (connectedWalletAddress.value) {
            getSupply();
            getMintedAmount();
          }
        }, 1000);

      })
      // slide.value.play();

    })

    return {
      isShowAlert, alertMsg, error, loading, connectedWalletAddress, whitelistAddresses,
      whitelistAddressesIndex, publicSaleSelectedAmount, mintedAmount, isWhitelistedMsg,
      contract, totalSupply, jidoriConfig, takingPicture,
      requestAccount, showFlashlight, getConfig, getSupply, getProof,
      checkWhitelisted, preSaleMint, publicSaleMint, gomint,
      slideOption, slide,
      extensions: { AutoScroll, Grid },
    }
  },
}
</script>


<style lang="scss" scoped>
@import url("./assets/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Klee+One&family=Rampart+One&display=swap");

$secondaryColor: #707070;
$primaryColor: #e5d9c3;
$hoverColor: #b19f7e;
$family1: "Rampart One", cursive;
$family2: "Klee One", cursive;
.error-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $family2;
  text-align: center;
  line-height: 1.5;
}

.container {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 2.5vw;
  font-family: $family1;
  color: $secondaryColor;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.4;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .main {
    position: relative;
    width: 22vw;
    height: 45vw;
    padding: 2.5vw;
    border-radius: 4vw;
    background-color: transparent;
    box-sizing: border-box;
    border: 10px solid #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    backdrop-filter: blur(1px);
    transition: all 0.8s;
    animation: in 1s;
    animation-delay: 1s;
    transform: rotate(-5deg);

    @keyframes in {
      0% {
        transform: rotate(-5deg);
      }
      20% {
        transform: rotate(5deg);
      }
      80% {
        transform: rotate(5deg);
      }
      100% {
        transform: rotate(-5deg);
      }
    }

    .slide {
      position: absolute;
      left: -2.5vw;
      top: 2vw;
      width: 22vw;
      img {
        width: 100%;
      }
    }

    .alert-msg {
      font-family: "Noto Sans TC";
      font-weight: bolder;
      line-height: 1.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      background: rgba($color: #fff, $alpha: 0.8);
      width: 50%;
      height: auto;
      padding: 20px 20px;
      backdrop-filter: blur(3px);
      opacity: 1;
      animation: fadeIn 0.35s;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 0 15px 15px;
      &::after {
        content: "New Message";
        font-weight: 500;
        text-align: center;
        color: #fff;
        width: 100%;
        height: 30px;
        position: absolute;
        top: -30px;
        left: 0;
        background-color: #b19f7e;
        border-radius: 15px 15px 0 0;
        padding: 5px 0;
      }
      &:hover {
        cursor: pointer;
        background: rgba($color: #fff, $alpha: 0.9);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
    .alert-msg-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9;
      background: rgba($color: #000000, $alpha: 0.4);
    }
    .header {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      -webkit-animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53)
        both;
      animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
      line-height: 1.2;
      .name {
        font-size: 3vw;
        font-weight: normal;
        text-transform: uppercase;
      }
      .subtitle {
        font-size: 1.5vw;
        margin-top: 2vw;
      }
      .go-mint {
        margin-top: 2vw;
        font-size: 2vw;
        transition: all 0.2s;
        transform-origin: left center;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
          color: #000;
        }
      }
    }
    .lens {
      display: none;
      position: absolute;
      left: 2vw;
      top: 2vw;
      width: 3vw;
      height: 3vw;
      background-color: rgb(53, 53, 53);
      border-radius: 100%;
      border: 5px solid #fff;
      filter: drop-shadow(1px 1px);
      transform: rotateY(-180deg);
      &::before {
        content: "";
        width: 0.9vw;
        height: 0.8vw;
        background-color: rgb(0, 0, 0);
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
        border-radius: 100%;
      }
      &::after {
        content: "";
        width: 0.3vw;
        height: 0.3vw;
        background-color: rgb(0, 0, 0);
        position: absolute;
        top: 50%;
        left: -50%;
        z-index: 1;
        transform: translateY(-50%);
        border-radius: 100%;
      }
    }
    .mint {
      display: none;
      font-family: $family2;
      text-align: center;
      height: 100%;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .init-warning {
        text-align: left;
      }
      .whitelist-msg {
        margin-top: 0.8vw;
      }
      .public-msg {
        margin-top: 0.8vw;
      }
      .supply {
        font-family: "Noto Sans TC";
        font-weight: bolder;
        font-size: 1vw;
      }
      .selection {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .item {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          background-color: #fff;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
          &.selected {
            background-color: $hoverColor;
            color: #fff;
          }
          &:hover {
            background-color: $hoverColor;
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .mint-button {
        font-family: $family1;
        display: inline-block;
        font-size: 1.5vw;
        padding: 0.5vw 1.3vw;
        border-radius: 1000px;
        margin-top: 1vw;
        transition: all 0.3s;
        &:hover {
          cursor: pointer;
          color: #000;
        }
      }
      .minted {
        margin-top: 20px;
        font-size: 18px;
      }

      .go-back {
        margin-top: 4vw;
        font-family: $family1;
        font-size: 1.5vw;
        transition: all 0.2s;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
          color: #000;
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 50%;
      height: 1.5vw;
      top: -1px;
      border-radius: 0 0 20px 20px;
      background: #000;
    }
    &:hover {
      transform: rotate(-5deg) translateY(-10px);
      .header {
        .name {
          color: #000;
        }
        .subtitle {
          color: #000;
        }
        .go-mint {
          color: #000;
        }
      }
      .mint {
        color: #000;
      }
    }

    &.active {
      &:hover {
        transform: rotateY(180deg) rotate(-5deg) translateY(-10px);
      }
      transform: rotateY(180deg) rotate(-5deg);
      .header {
        display: none;
      }
      &::after {
        display: none;
      }
      .lens {
        display: block;
      }
      .mint {
        transform: rotate3d(0, -1, 0, 180deg);
        display: flex;
      }
      .alert-msg {
        transform: translate(-50%, -50%) rotateY(-180deg);
      }
    }
  }
  .info {
    position: relative;
    width: 45vw;
    height: 45vw;
    padding: 5vw 2.5vw;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    .about {
      .item {
        margin-bottom: 1vw;
        h2 {
          position: relative;
          font-size: 1.2vw;
          background-color: $primaryColor;
          display: inline-block;
          padding: 0.4vw 1vw;
          border-radius: 1000px;
          margin-bottom: 0.5vw;
          text-transform: uppercase;
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: $hoverColor;
            z-index: -1;
            right: -2.5%;
            top: 9%;
            border-radius: 1000px;
            transition: all 0.3s;
          }
        }
        p {
          padding-left: 0.5vw;
          line-height: 1.2;
          font-size: 1vw;
          text-align: justify;
          font-family: $family2;
        }
        .team {
          display: flex;
          align-items: center;
          margin-top: 1vw;
          .member {
            margin-right: 1vw;
            img {
              border-radius: 1vw;
              width: 10vw;
            }
            p {
              font-size: 1vw;
              font-family: $family2;
            }
          }
        }
      }
    }
  }

  .connect-wallet {
    right: 2vw;
    top: 2vw;
    position: absolute;
    background-color: $primaryColor;
    color: $secondaryColor;
    padding: 1vw 2vw;
    border-radius: 1000px;
    font-size: 1vw;
    transition: all 0.2s;
    font-family: $family2;
    &:hover {
      cursor: pointer;
      color: $hoverColor;
      background-color: #fff;
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: $hoverColor;
      z-index: -1;
      right: -2.5%;
      top: 9%;
      border-radius: 1000px;
      transition: all 0.3s;
    }
  }
}

.flash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  animation: flash 1s;
  opacity: 0;
  pointer-events: none;
  @keyframes flash {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}

@media screen and (max-width: 767px) {
  .container {
    padding: 50px;
    height: auto;
    flex-direction: column;
    padding-top: 70px;

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      z-index: -1;
      opacity: 0.4;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    .main {
      width: 90vw;
      height: 90vh;
      padding: 30px;
      border-radius: 30px;
      flex-direction: column;
      &::after {
        right: -1.5%;
        top: 1%;
        border-radius: 30px;
      }
      &:hover {
        &::after {
          right: -2.5%;
          top: 2%;
        }
      }
      .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
          font-size: 40px;
          font-weight: normal;
        }
        .lens {
          position: relative;
          width: 40px;
          height: 40px;
          background-color: rgb(53, 53, 53);
          border-radius: 100%;
          border: 5px solid #fff;
          filter: drop-shadow(1px 1px);
          &::before {
            content: "";
            width: 10px;
            height: 10px;
            background-color: rgb(0, 0, 0);
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
            border-radius: 100%;
          }
          &::after {
            content: "";
            width: 5px;
            height: 5px;
            background-color: rgb(0, 0, 0);
            position: absolute;
            top: 50%;
            left: -50%;
            z-index: 1;
            transform: translateY(-50%);
            border-radius: 100%;
          }
        }
      }
      .mint {
        font-family: $family2;
        text-align: center;
        .supply {
          font-size: 24px;
        }
        .mint-button {
          font-size: 30px;
          padding: 12px 20px;
          margin-top: 32px;
        }
      }
    }
    .info {
      position: relative;
      width: 90vw;
      height: auto;
      padding: 0;
      margin-top: 50px;
      .about {
        .item {
          margin-bottom: 24px;
          h2 {
            font-size: 24px;
            padding: 12px 24px;
            margin-bottom: 12px;
            &::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 100%;
              background: $hoverColor;
              z-index: -1;
              right: -2.5%;
              top: 9%;
              border-radius: 1000px;
              transition: all 0.3s;
            }
          }
          p {
            padding-left: 10px;
            padding-right: 10px;
            font-size: 18px;
          }
          .team {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            .member {
              margin-right: 0;
              img {
                border-radius: 20px;
                width: 40vw;
              }
              p {
                margin-top: 12px;
                width: auto;
                font-size: 20px;
              }
            }
          }
        }
      }
    }

    .connect-wallet {
      right: 20px;
      top: 10px;
      padding: 12px 24px;
      font-size: 18px;
    }
  }

  .flash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 100;
    animation: flash 1s;
    opacity: 0;
    pointer-events: none;
    @keyframes flash {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2022-3-31 23:32:56
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-focus-in
 * ----------------------------------------
 */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
</style>
