<template>
  <div class="rank-popup" v-bind:class="{ show: enter }">
    <a href="https://raritysniper.com/jidori" target="_blank"
      >See on RaritySniper (rank might different)</a
    >
    <h1>rarity checker</h1>
    <div class="rank">
      <input
        v-model="customTokenId"
        class="input"
        type="text"
        placeholder="your TokenID"
      />
      <div class="top100">
        <template v-if="customTokenId == ''">
          <div
            v-for="(item, i) in top100"
            :key="i"
            class="item"
            @click="getAttr(item.token_id)"
          >
            <div class="rank">
              RANK {{ item.rank }} ( #{{ item.token_id }} )
              <a
                :href="`https://opensea.io/assets/0x0f7f90a5274ec882597be323f43347bf73e09bce/${item.token_id}`"
                target="_blank"
                ><img src="@/assets/os.png" alt="" srcset=""
              /></a>
            </div>
            <div class="image">
              <img v-lazy="`tokens/${item.token_id}.jpg`" alt="" srcset="" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="item" @click="getAttr(targetToken.token_id)">
            <div class="rank">
              RANK {{ targetToken.rank }} ( #{{ targetToken.token_id }} )
              <a
                :href="`https://opensea.io/assets/0x0f7f90a5274ec882597be323f43347bf73e09bce/${targetToken.token_id}`"
                target="_blank"
                ><img src="@/assets/os.png" alt="" srcset=""
              /></a>
            </div>
            <div class="image">
              <img
                v-lazy="`tokens/${targetToken.token_id}.jpg`"
                alt=""
                srcset=""
              />
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="attr" v-bind:class="{ active: showAttr }" v-if="showAttr">
      <h1>Token detail</h1>
      <div class="attr-detail">
        <p>
          (Score: {{ attr[0]["rarity_score"] }}) {{ attr[0]["trait_type"] }} :
          {{ attr[0]["value"] }}
        </p>
        <p>
          (Score: {{ attr[1]["rarity_score"] }}) {{ attr[1]["trait_type"] }} :
          {{ attr[1]["value"] }}
        </p>
        <p>
          (Score: {{ attr[2]["rarity_score"] }}) {{ attr[2]["trait_type"] }} :
          {{ attr[2]["value"] }}
        </p>
        <p>
          (Score: {{ attr[3]["rarity_score"] }}) {{ attr[3]["trait_type"] }} :
          {{ attr[3]["value"] }}
        </p>
        <p>
          (Score: {{ attr[4]["rarity_score"] }}) {{ attr[4]["trait_type"] }} :
          {{ attr[4]["value"] }}
        </p>
        <p>
          (Score: {{ attr[5]["rarity_score"] }}) {{ attr[5]["trait_type"] }} :
          {{ attr[5]["value"] }}
        </p>
        <p>
          (Score: {{ attr[6]["rarity_score"] }}) {{ attr[6]["trait_type"] }} :
          {{ attr[6]["value"] }}
        </p>
        <p>
          (Score: {{ attr[7]["rarity_score"] }}) {{ attr[7]["trait_type"] }} :
          {{ attr[7]["value"] }}
        </p>
      </div>
      <div class="close" @click="showAttr = false">close</div>
    </div>
    <div class="close" @click="enter = !enter">Close</div>
  </div>
  <div class="error-page" v-if="error">
    <p>
      You're not able to visit this website, Please check your metamask network
      option (Mainnet only).<br />
    </p>
  </div>
  <div class="container" v-else>
    <div class="main">
      <div class="header">
        <h1 class="name">自撮り Jidori</h1>
        <div class="subtitle">あなたに最適な自撮り写真を見つけましょう</div>
        <div class="rarity-checker" @click="enter = !enter">
          Rarity checker！
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
            This collection is 3950 in total and contains hundreds of fully
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
        <div class="item flex">
          <div>
            <h2>Links</h2>
            <div class="links">
              <a href="https://twitter.com/jidorinft" class="link"> Twitter </a>
              <a
                href="https://etherscan.io/address/0x0f7f90a5274ec882597be323f43347bf73e09bce"
                class="link"
              >
                Contract
              </a>
              <a href="https://opensea.io/collection/jidori" class="link">
                Opensea
              </a>
              <a href="https://discord.com/invite/yFsaAFCJr2" class="link">
                Discord
              </a>
            </div>
          </div>
          <div>
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
        </div>
        <div class="item"></div>
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
    <div class="roadmap">
      <h1>Roadmap</h1>
      <h2>Males</h2>
      <p>
        The males version is working on progress, we keeping release sneak-peeks
        on twitter and discord, 10% holder will get 1 males airdrop(we will pick
        395 female tokenId, the owner can get airdrop) and all holder can
        free-mint 1 males. currently tentatively release in 2 months.
      </p>
      <div class="males">
        <img src="@/assets/images/males/1.jpg" alt="" srcset="" />
        <img src="@/assets/images/males/2.jpg" alt="" srcset="" />
      </div>
      <h2>Official social APP on iOS and Android</h2>
      <p>
        Our dev team specializes in web and app development, Jidori is a selfie
        NFT and we will create a match-dating APP list on ios and android store
        and all of world can found us on appstore. This app will have
        Posture-Detection to verify a user to upload their selfie use on app
        before matching. Jidori's holder can use your NFT as a pass or unlock
        paid-only features(boost or superlike function like Tinder). What's
        different with others match-dating app? you can only see the half-face
        selfie with a user while your are trying match with someone and you will
        see others photo once you matched with the user you liked, why? because
        this is jidori.
      </p>
      <h2>Instagram Filter / effect</h2>
      <p>
        Everyone may see a jidori looks like self or someone, the filter can be
        used on instagram when someone try to post a feed/story selfie and tag
        friends or #jidorinft.
      </p>
      <h2>Land</h2>
      <p>
        we own a XL ArcadeLand, is a NFT project trying to build a game-fi or
        P2E metaverse, but didnt see any project intergration solution atm, but
        will follow-up and do what we can do.
      </p>
      <h2>leave it to you</h2>
    </div>
  </div>
  <div class="flash" v-if="!error && takingPicture"></div>
  <div class="bg">
    <img src="@/assets/bg.svg" alt="" srcset="" />
  </div>
</template>

<script>
import rarity from "@/assets/rarity.json";
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
  computed: {
    top100() {
      let sorted = rarity.sort(function (a, b) {
        return a.rank - b.rank
      })
      return sorted.slice(0, 100)
    }
  },
  watch: {
    customTokenId(newV, oldV) {
      this.setCustomToken()
    }
  },
  setup() {
    const customTokenId = ref('');
    const targetToken = ref({});
    const attr = ref({});
    const showAttr = ref(false);
    const enter = ref(false);
    const takingPicture = ref(false);
    const loading = ref(true);
    const error = ref(false);
    const isShowAlert = ref(false);
    const alertMsg = ref('');
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

    const showFlashlight = () => {
      takingPicture.value = true;

      setTimeout(() => {
        takingPicture.value = false
      }, 1000);
    }

    const showAlert = (msg) => {
      alertMsg.value = msg;
      isShowAlert.value = true;
    }

    const setCustomToken = () => {
      let item = rarity.find(item => item['token_id'] == customTokenId.value);
      if (item) {
        targetToken.value = item;
      }
    }

    const getAttr = (id) => {
      let item = rarity.find(item => item['token_id'] == id);
      if (item) {
        attr.value = item['attributes'];
        showAttr.value = true
      }
    }

    onMounted(() => {
      var url_string = window.location.href
      var url = new URL(url_string);
      var checkrarity = url.searchParams.get("rarity");


      if (checkrarity) {
        enter.value = true
      }
    })

    return {
      enter,
      showAlert, isShowAlert, alertMsg, error, loading,
      takingPicture,
      showFlashlight,
      slideOption, slide,
      extensions: { AutoScroll, Grid },
      customTokenId,
      setCustomToken,
      targetToken,
      attr,
      getAttr,
      showAttr
    }
  },
}
</script>


<style lang="scss" scoped>
@import url("./assets/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&family=Noto+Sans+JP:wght@400;900&family=Rampart+One&display=swap");

$secondaryColor: #707070;
$primaryColor: #e5d9c3;
$hoverColor: #b19f7e;
$family1: "Rampart One", cursive;
$family2: "Mochiy Pop P One", sans-serif;
$family3: "Noto Sans JP", sans-serif;

.rank-popup {
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
  transform: translateY(-100%);

  .rank {
    position: relative;
    height: 80%;
    width: 80%;
    margin-top: 10px;

    .top100 {
      position: relative;
      height: auto;
      max-height: 80%;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      margin-top: 50px;
      overflow-y: scroll;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }
      &::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
      }
      &::-webkit-scrollbar-thumb {
        background: #e1e1e1;
        border: 0px none #ffffff;
        border-radius: 50px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #ffffff;
      }
      &::-webkit-scrollbar-thumb:active {
        background: #000000;
      }
      &::-webkit-scrollbar-track {
        background: #666666;
        border: 0px none #ffffff;
        border-radius: 50px;
      }
      &::-webkit-scrollbar-track:hover {
        background: #666666;
      }
      &::-webkit-scrollbar-track:active {
        background: #333333;
      }
      &::-webkit-scrollbar-corner {
        background: transparent;
      }

      .item {
        font-family: $family1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        &:hover {
          cursor: pointer;
          .rank {
            font-size: 20px;
          }
        }
        .rank {
          margin-bottom: 5px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          a {
            margin-left: 10px;
            img {
              width: 20px;
            }
          }
        }
      }
    }
    .input {
      all: unset;
      font-family: $family1;
      border-bottom: 2px solid;
      color: #fff;
      font-size: 20px;
      &::placeholder {
        color: #fff;
      }
    }
  }

  .attr {
    position: absolute;
    z-index: 1000;
    width: auto;
    height: auto;
    padding: 40px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.95);
    border-radius: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;
    text-align: left;
    .close {
      position: relative;
      width: 20%;
      margin: 0 auto;
    }
    &.active {
      display: block;
    }
  }

  &.show {
    transform: translateY(0%);
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
  flex-wrap: wrap;
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
      .rarity-checker {
        margin-top: 2vw;
        font-size: 2vw;
        transition: all 0.2s;
        transform-origin: left center;
        cursor: pointer;
        color: rgb(243, 243, 0);
        &:hover {
          transform: scale(1.1);
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
        margin-bottom: 1.5vw;
        h2 {
          position: relative;
          font-size: 1.5vw;
          display: inline-block;
          margin-bottom: 0.25vw;
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
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          .link {
            font-size: 24px;
            color: #fff;
            margin-bottom: 10px;
          }
        }
        &.flex {
          display: flex;
          & > div {
            margin-right: 3vw;
          }
        }
      }
    }
  }

  .roadmap {
    color: #000;
    flex: 100%;
    width: 10%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    z-index: 10;
    flex-direction: column;
    font-family: $family3;
    padding: 10% 20%;
    h1 {
      position: relative;
      font-size: 46px;
      font-weight: 1000;
      text-transform: uppercase;
      margin-bottom: 30px;
      border: 5px solid #000;
      align-self: center;
      padding: 10px 20px;
      font-family: $family1;
      background: #fff;
      color: #000;
      border-radius: 15px;
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        position: absolute;
        bottom: -15px;
        right: -15px;
        z-index: -1;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.5);
      }
    }
    h2 {
      position: relative;
      font-size: 28px;
      font-weight: 1000;
      margin-top: 20px;
      padding-left: 32px;
      letter-spacing: 0px;
      text-transform: uppercase;

      &::after {
        content: "";
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background: #000;
        position: absolute;
        left: 0;
        bottom: 0;
        border: 2px solid rgb(255, 255, 255);
        box-sizing: border-box;
        animation: ani 1s alternate-reverse infinite;
        @keyframes ani {
          from {
            bottom: -10px;
          }
          to {
            bottom: 0;
          }
        }
      }
    }
    p {
      font-size: 18px;
      margin-bottom: 30px;
      line-height: 2;
      border-left: 1px dashed #000;
      padding-left: 24px;
      padding-top: 20px;
      margin-left: 7px;
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
  .rank-popup {
    border: 10px dashed rgb(231, 228, 33);
    padding: 25px;

    .rank {
      position: relative;
      height: 80%;
      width: 80%;

      .top100 {
        position: relative;
        height: auto;
        max-height: 80%;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        margin-top: 50px;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 2px;
          height: 2px;
        }
        &::-webkit-scrollbar-button {
          width: 0px;
          height: 0px;
        }
        &::-webkit-scrollbar-thumb {
          background: #e1e1e1;
          border: 0px none #ffffff;
          border-radius: 50px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #ffffff;
        }
        &::-webkit-scrollbar-thumb:active {
          background: #000000;
        }
        &::-webkit-scrollbar-track {
          background: #666666;
          border: 0px none #ffffff;
          border-radius: 50px;
        }
        &::-webkit-scrollbar-track:hover {
          background: #666666;
        }
        &::-webkit-scrollbar-track:active {
          background: #333333;
        }
        &::-webkit-scrollbar-corner {
          background: transparent;
        }

        .item {
          font-family: $family1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 30px;
          .rank {
            margin-bottom: 5px;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            a {
              margin-left: 10px;
              img {
                width: 20px;
              }
            }
          }
        }
      }
      .input {
        all: unset;
        font-family: $family1;
        border-bottom: 2px solid;
        color: #fff;
        &::placeholder {
          color: #fff;
        }
      }
    }

    .attr {
      position: absolute;
      z-index: 1000;
      width: 100%;
      height: 100%;
      padding: 40px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.95);
      border-radius: 10px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: none;
      text-align: left;
      .close {
        position: relative;
        width: 20%;
        margin: 0 auto;
      }
      &.active {
        display: block;
      }
    }
    .jidori {
      width: 90%;
    }

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
        .rarity-checker {
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
            margin: 20px 0;

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
          &.flex {
            display: block;
            & > div {
              margin-right: 0;
            }
          }
        }
      }
    }

    .roadmap {
      width: 100%;
      padding: 5%;
      margin-left: -10%;
      .males {
        img {
          width: 100%;
        }
      }
      h1 {
        margin: 50px 0;
      }
      h2 {
        margin-top: 50px;
        line-height: 1.5;

        &::after {
          content: "";
          width: 15px;
          height: 15px;
          border-radius: 100%;
          background: #000;
          position: absolute;
          left: 0;
          bottom: 0;
          border: 2px solid rgb(255, 255, 255);
          box-sizing: border-box;
          animation: ani 1s alternate-reverse infinite;
          @keyframes ani {
            from {
              bottom: -10px;
            }
            to {
              bottom: 0;
            }
          }
        }
      }
      p {
        font-size: 18px;
        margin-bottom: 30px;
        line-height: 2;
        border-left: 1px dashed #000;
        padding-left: 24px;
        padding-top: 20px;
        margin-left: 7px;
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
