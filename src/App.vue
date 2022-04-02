<template>
  <div class="whitelist-popup" v-bind:class="{ hide: enter }">
    <h1>ホワイトリスト登録<br />Whitelist registration now</h1>
    <p>
      Whitelist can free mint 2 Jidori, will pick first 200 addresses for WL.<br />
      (It will going to raffle if more than 205 addresses are registered.)<br /><br />
      Go fill the form and you will receive an email once presale start, stay
      tuned! <br />( stealth launch in 48hours)
    </p>
    <a href="https://forms.gle/1Kbg48APAwncnEL59" target="_blank"
      >GO Fill form<br /><br />(CLOSE AT 04/03/2022 PM14:00 UTC+09:00)</a
    >
    <div class="close" @click="enter = true">ENTER WEBSITE</div>
  </div>
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
        <!-- <div class="go-mint" @click="gomint = !gomint">GO MINT！</div> -->
        <div class="go-mint" @click="showAlert('Sale not start!!!')">
          GO MINT！
        </div>
      </div>
      <div class="slide">
        <Splide :options="slideOption" :extensions="extensions" ref="slide">
          <SplideSlide v-for="i in 20" :key="i">
            <img :src="require(`@/assets/images/${i}.png`)" />
          </SplideSlide>
        </Splide>
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
              <p class="whitelist-msg" v-html="isWhitelistedMsg"></p>

              <div class="selection">
                <p>BUY</p>
                <div class="item-box">
                  <div
                    class="item"
                    v-for="(amount, i) in parseInt(jidoriConfig.preSaleMaxMint)"
                    :key="i"
                    v-bind:class="{
                      selected: selectedAmount == amount,
                    }"
                    @click="selectedAmount = amount"
                  >
                    {{ amount }}
                  </div>
                </div>
                <p>ITEMS</p>
              </div>
              <div class="mint-button" @click="preSaleMint">Pre-Sale MINT</div>

              <div class="minted">You have {{ mintedAmount }} Jidori</div>
            </template>
            <template v-else>
              <div class="supply">
                {{ totalSupply }} / {{ jidoriConfig.maxSupply }}
              </div>
              <p class="whitelist-msg" v-html="isWhitelistedMsg"></p>
            </template>
          </template>
          <!--Public-Sale-->
          <template
            v-else-if="!jidoriConfig.paused && jidoriConfig.isPublicSale"
          >
            <div class="supply">
              {{ totalSupply }} / {{ jidoriConfig.maxSupply }}
            </div>
            <div class="selection">
              <p>BUY</p>
              <div class="item-box">
                <div
                  class="item"
                  v-for="(amount, i) in parseInt(
                    jidoriConfig.publicSaleMaxMint
                  )"
                  :key="i"
                  v-bind:class="{
                    selected: selectedAmount == amount,
                  }"
                  @click="selectedAmount = amount"
                >
                  {{ amount }}
                </div>
              </div>
              <p>ITEMS</p>
            </div>
            <div class="mint-button" @click="publicSaleMint">
              Public-Sale MINT
            </div>

            <div class="minted">You have {{ mintedAmount }} Jidori</div>
          </template>
        </template>
        <template v-else>
          <div class="init-warning">Please connect to Metamask wallet</div>
        </template>
        <div class="go-back" @click="gomint = !gomint">➞</div>
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
            This collection is 4000 in total and contains hundreds of fully
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
              <img
                class="image"
                src="@/assets/images/team1.png"
                alt=""
                srcset=""
              />
              <p>Artist エリ</p>
            </div>
            <div class="member">
              <img
                class="image"
                src="@/assets/images/team2.png"
                alt=""
                srcset=""
              />
              <p>Dev ジャスミン</p>
            </div>
          </div>
        </div>
        <div class="item">
          <h2>Links</h2>
          <div class="links">
            <a href="twitter.com" class="link">
              Twitter (WILL OPENED ONCE PRESALE)
            </a>
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
    <!-- <div class="connect-wallet" @click="requestAccount()">
      <div v-if="connectedWalletAddress">
        {{ connectedWalletAddress.substring(-5, 7) }}...{{
          connectedWalletAddress.slice(37)
        }}
      </div>
      <div v-else>Connect Wallect</div>
    </div> -->
    <div class="connect-wallet" @click="showAlert('sale not start!!!')">
      <div v-if="connectedWalletAddress">
        {{ connectedWalletAddress.substring(-5, 7) }}...{{
          connectedWalletAddress.slice(37)
        }}
      </div>
      <div v-else>Connect Wallect</div>
    </div>
  </div>
  <div class="flash" v-if="!error && takingPicture"></div>
  <div class="bg">
    <img src="@/assets/bg.svg" alt="" srcset="" />
  </div>
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
    const enter = ref(false);
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
    const selectedAmount = ref(1);

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
        speed: 0.5,
        rewind: true,
        pauseOnHover: false,
        pauseOnFocus: false
      },
      grid: {
        rows: 2,
        cols: 2,
        gap: {
          row: '15px',
          col: '25px',
        },
      },
      perPage: 2,
      perMove: 1,
      gap: 25,
      pagination: false,
      arrows: false,
      breakpoints: {
        640: {
          grid: {
            rows: 2,
            cols: 2,
            gap: {
              row: '15px',
              col: '25px',
            },
          },
          perPage: 2,
          gap: 25,
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
          isWhitelistedMsg.value = 'You are in whitelist!';
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

        showAlert("You mint too much.")
        return
      }

      let proof = getProof();

      const { ethereum } = window;

      const transactionParams = {
        to: contractConfig.contract_address,
        from: connectedWalletAddress.value,
        // gasLimit: web3.value.utils.toHex(300000),
        value: web3.value.utils.toHex(jidoriConfig.value.preSalePrice * selectedAmount.value),
        data: contract.value.methods.preSaleMint(selectedAmount.value, proof).encodeABI()
      };
      return ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams]
      })
    }

    //公售mint
    const publicSaleMint = () => {
      if (exceedMaxAmount.value) {
        showAlert("You mint too much.")
        return
      }

      const { ethereum } = window;

      const transactionParams = {
        to: contractConfig.contract_address,
        from: connectedWalletAddress.value,
        // gasLimit: web3.value.utils.toHex(300000),
        value: web3.value.utils.toHex(jidoriConfig.value.publicSalePrice * selectedAmount.value),
        data: contract.value.methods.publicSaleMint(selectedAmount.value).encodeABI()
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
      // const { ethereum } = window;

      // if (!ethereum) {
      //   showAlert('No wallet plugin is available! Please change your browser or install wallet plugin.');
      //   return;
      // }

      // web3.value = new Web3(ethereum);

      // //連接合約
      // contract.value = new web3.value.eth.Contract(contractConfig.ABI, contractConfig.contract_address)
      // //取得合約設定
      // getConfig();

      // ethereum.on('chainChanged', function (id) {
      //   web3.value.eth.getChainId().then((id) => {

      //     if (id != targetNetworkId.value) {
      //       error.value = true;
      //       clearInterval(interval.value);
      //     } else {
      //       window.location.reload();
      //     }
      //   })
      // })

      // web3.value.eth.getChainId().then((id) => {
      //   //檢查chainId
      //   if (id != targetNetworkId.value) {
      //     showAlert('Please Change to mainnet.')
      //     return
      //   }
      //   //監聽地址變化
      //   ethereum.on('accountsChanged', function (accounts) {
      //     connectedWalletAddress.value = accounts[0]
      //     checkWhitelisted();
      //   })
      //   //開始請求錢包同意
      //   requestAccount();
      //   //定時
      //   interval.value = setInterval(() => {
      //     getConfig();

      //     if (connectedWalletAddress.value) {
      //       getSupply();
      //       getMintedAmount();
      //     }
      //   }, 1000);

      // })
    })

    return {
      enter,
      showAlert, isShowAlert, alertMsg, error, loading, connectedWalletAddress, whitelistAddresses,
      whitelistAddressesIndex, selectedAmount, mintedAmount, isWhitelistedMsg,
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
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&family=Rampart+One&display=swap");

$secondaryColor: #707070;
$primaryColor: #e5d9c3;
$hoverColor: #b19f7e;
$family1: "Rampart One", cursive;
$family2: "Mochiy Pop P One", sans-serif;

.whitelist-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 50px dashed rgb(231, 228, 33);
  box-shadow: inset 1em 1em rgb(0, 0, 0);
  box-sizing: border-box;
  transition: all 1s;
  animation: enter 1s;

  @keyframes enter {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }

  &.hide {
    transform: translateY(-100%);
  }
  h1 {
    font-family: $family1;
    font-size: 40px;
    text-transform: uppercase;
    line-height: 1.5;
  }
  p {
    margin: 30px 0;
    font-family: $family2;
    line-height: 2;
  }
  a {
    text-transform: uppercase;
    font-family: $family1;
    color: #fff;
    font-size: 24px;
  }
  .close {
    margin-top: 40px;
    font-family: $family2;
    background: #fff;
    color: rgb(0, 0, 0);
    border-radius: 10px;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}

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
    backdrop-filter: blur(10px);
    transition: all 0.8s;
    animation: in 1s;
    animation-delay: 1s;

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
        transform: rotate(0);
      }
    }

    .slide {
      position: absolute;
      left: 0;
      top: 5vw;
      width: 110%;
      img {
        width: 100%;
        border-radius: 100%;
        border: 3px dashed #fff;
      }
    }

    .alert-msg {
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
      border-radius: 0 0 5px 5px;
      font-family: $family2;
      &::after {
        content: "New Message";
        font-family: $family2;
        font-weight: 500;
        text-align: center;
        color: rgb(0, 0, 0);
        width: 100%;
        height: 40px;
        position: absolute;
        top: -40px;
        left: 0;
        background-color: #ffffff;
        border-radius: 5px 5px 0 0;
        padding: 5px 0;
        line-height: 40px;
        text-transform: uppercase;
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
      padding-top: 10vw;
      color: #fff;
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
      font-family: $family1;
      text-align: center;
      height: 100%;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #000;

      .init-warning {
        text-align: left;
        font-family: $family2;
      }
      .whitelist-msg {
        margin-top: 0.8vw;
        font-family: $family2;
        font-size: 14px;
        line-height: 1.5;
      }
      .public-msg {
        margin-top: 0.8vw;
        font-family: $family2;
        font-size: 14px;
      }
      .supply {
        font-weight: bolder;
        font-size: 2vw;
      }
      .minted {
        margin-top: 20px;
        font-size: 1vw;
        border: 1px solid;
        padding: 10px;
        border-radius: 10px;
        text-transform: uppercase;
      }
      .selection {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 60px 0;
        font-family: $family2;
        p {
          font-size: 20px;
        }
        .item-box {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin: 20px 0;
          .item {
            width: 40px;
            height: 40px;
            border-radius: 100%;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            border: 2px solid transparent;
            &.selected {
              border-color: #000;
            }
            &:hover {
              border-color: #000;
              cursor: pointer;
            }
          }
        }
      }
      .mint-button {
        font-family: $family1;
        display: inline-block;
        font-size: 1.5vw;
        padding: 0.5vw 1.3vw;
        border-radius: 1000px;
        transition: all 0.3s;
        &:hover {
          cursor: pointer;
          color: #000;
          transform: scale(1.1);
        }
      }

      .go-back {
        margin-top: 4vw;
        font-family: $family1;
        font-size: 1.5vw;
        transition: all 0.2s;
        cursor: pointer;
        transform: rotateY(180deg);
        &:hover {
          transform: scale(1.1) rotateY(180deg);
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
      transform: translateY(-10px);
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
        transform: rotateY(180deg) rotate(5deg) translateY(-10px);
      }
      transform: rotateY(180deg) rotate(5deg);
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
      .slide {
        display: none;
      }
    }
  }

  .info {
    position: relative;
    width: 45vw;
    height: 45vw;
    padding: 2.5vw 2.5vw;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    .about {
      .item {
        margin-bottom: 2vw;
        h2 {
          position: relative;
          font-size: 1.5vw;
          display: inline-block;
          margin-bottom: 0.5vw;
          text-transform: uppercase;
          color: #fff;
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
          border-left: 5px solid #fff;
          margin-top: 1vw;
          padding-left: 0.5vw;
          line-height: 2;
          font-size: 16px;
          font-family: $family2;
          color: #ffffff;
          letter-spacing: 1px;
        }
        .team {
          display: flex;
          align-items: center;
          margin-top: 1vw;
          .member {
            margin-right: 1vw;
            img {
              border-radius: 100%;
              width: 5vw;
              border: 3px dashed #fff;
            }
            p {
              font-size: 14px;
              font-family: $family2;
            }
          }
        }
        .links {
          margin-top: 10px;
          .link {
            font-size: 24px;
            color: #fff;
          }
        }
      }
    }
  }

  .connect-wallet {
    right: 2vw;
    top: 2vw;
    position: absolute;
    color: #fff;
    padding: 1vw 2vw;
    border-radius: 1000px;
    font-size: 1vw;
    transition: all 0.2s;
    font-family: $family1;
    text-transform: uppercase;
    &:hover {
      cursor: pointer;
      &::after {
        transform: scale(1);
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 5px;
      left: 0;
      bottom: 0;
      background: #fff;
      transform: scale(0);
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

.bg {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #9eac9e;
  z-index: -1;
  img {
    position: absolute;
    left: -25%;
    bottom: 0;
    width: 150%;
    animation: skew 3s alternate-reverse infinite;
    @keyframes skew {
      from {
        transform: skewX(10deg);
      }
      to {
        transform: skewX(-10deg);
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .whitelist-popup {
    border: 10px dashed rgb(231, 228, 33);
    padding: 25px;

    @keyframes enter {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0%);
      }
    }

    &.hide {
      transform: translateY(-100%);
    }
    h1 {
      font-size: 20px;
    }
    p {
      margin: 30px 0;
      font-family: $family2;
      line-height: 2;
      font-size: 14px;
    }
    a {
      text-transform: uppercase;
      font-family: $family1;
      color: #fff;
      font-size: 18px;
    }
    .close {
      margin-top: 40px;
      font-family: $family2;
      background: #fff;
      color: rgb(0, 0, 0);
      border-radius: 10px;
      padding: 10px;
      font-size: 20px;
      cursor: pointer;
    }
  }

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
      border-radius: 50px;
      border-width: 5px;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.2);
      &::after {
        content: "";
        position: absolute;
        width: 50%;
        height: 5vw;
        top: -1px;
        border-radius: 0 0 10px 10px;
        background: #000;
      }

      .header {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: column;
        -webkit-animation: text-focus-in 1s
          cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
        animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
        line-height: 1.2;
        padding-top: 10vw;
        color: #fff;
        .name {
          font-size: 32px;
        }
        .subtitle {
          font-size: 20px;
          margin-top: 18px;
        }
        .go-mint {
          margin-top: 30px;
          font-size: 32px;
        }
      }

      .lens {
        display: none;
        position: absolute;
        left: 5vw;
        top: 5vw;
        width: 15vw;
        height: 15vw;
        background-color: rgb(53, 53, 53);
        border-radius: 100%;
        border: 5px solid #fff;
        filter: drop-shadow(1px 1px);
        transform: rotateY(-180deg);
        &::before {
          content: "";
          width: 3vw;
          height: 3vw;
        }
        &::after {
          content: "";
          width: 2vw;
          height: 2vw;
        }
      }

      .mint {
        text-align: center;
        justify-content: flex-end;
        .supply {
          font-size: 24px;
        }
        .mint-button {
          font-size: 24px;
          padding: 0;
        }
        .go-back {
          margin-top: 40px;
          font-size: 30px;
        }
        .selection {
          margin: 30px 0;
          p {
            font-size: 14px;
          }
          .item-box {
            margin: 20px 0;
            .item {
              width: 20px;
              height: 20px;
              font-size: 15px;
              margin: 0 10px;
            }
          }
        }
      }
      .slide {
        top: 15vw;
      }
      &.active {
        &:hover {
          transform: rotateY(0) rotate(0) translateY(-10px);
        }
        transform: rotateY(0) rotate(0);
        .mint {
          transform: rotate3d(0, 0, 0, 180deg);
        }
        .lens {
          transform: rotateY(180deg);
        }
        .alert-msg {
          transform: translate(-50%, -50%) rotateY(-180deg);
        }
        .slide {
          display: none;
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
            font-size: 28px;
            margin-bottom: 20px;
            color: #000;
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
            border-width: 3px;
            font-size: 14px;
            color: #000;
            border-color: #000;
          }
          .team {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            .member {
              margin-right: 0;
              img {
                width: 40vw;
              }
              p {
                margin-top: 12px;
                width: auto;
                font-size: 20px;
              }
            }
          }
          .links {
            .link {
              color: #000;
            }
          }
        }
      }
    }

    .connect-wallet {
      right: 50%;
      transform: translate(50%);
      top: 30px;
      padding: 0;
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

  .bg {
    pointer-events: none;
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #9eac9e;
    z-index: -1;
    img {
      position: absolute;
      left: -25%;
      bottom: 0;
      width: auto;
      height: 60%;
      animation: skew 3s alternate-reverse infinite;
      @keyframes skew {
        from {
          transform: skewX(10deg);
        }
        to {
          transform: skewX(-10deg);
        }
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
