<template>
  <div class="section" id="s7">
    <div class="title">
      <h1 class="styled-title" data-aos="fade">
        {{ $t("s7.title_1") }}
      </h1>
    </div>
    <div class="roadmap">
      <div class="roadmap-item" v-for="(item, i) in roadmap" :key="i">
        <div class="line"></div>
        <div v-html="item.desc"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted, ref } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "s7",
  setup() {
    const store = useStore();
    const roadmap = ref([
      {
        desc: `銷售1000張：捐出一個1 ETH給予台灣公益團體且Discord人數超過1千人，官方將額外抽出賦能廠商所提供的贊助益生菌10盒回饋給群組的參與者們。`,
      },
      {
        desc: `銷售2000張：捐出一個1 ETH給予台灣公益團體且Discord人數超過2千人，官方將額外抽出賦能廠商所提供的贊助印加果油10盒回饋給群組的參與者們。`,
      },
      {
        desc: `銷售3000張：捐出一個1 ETH給予台灣公益團體，舉辦台灣好覓二創活動比賽，活動模式由Discord群內喜歡繪畫的朋友共同舉辦與參與，台灣好覓贊助活動。`,
      },
      {
        desc: `銷售4000張：捐出一個1 ETH給予台灣公益團體，於線下舉辦一場實體見面活動，並且於現場舉辦AMA活動宣導，歡迎大家來與我們相見歡。`,
      },
      {
        desc: `銷售5000張：捐出一個1 ETH給予台灣公益團體且在以太坊基礎的元宇宙購買虛擬土地及興建台灣好覓俱樂部。`,
      },
      {
        desc: `銷售5001至10000張：於達成一張萬張銷售後，我們將再捐出一個5 ETH給予台灣公益團體，公售捐款部分全數結束，且規劃設計台灣好覓的專屬回饋WE3網站，增加更多會員賦能活動結合與回饋給持有者們，大家一起開心參與，並且提供寶貴的回饋給我們，共同建構我們的元宇宙`
      },
      {
        desc: `歡迎您一起加入關注台灣好覓與持有我們的NFT，我們將會於銷售過程陸續於社群內跟大家做討論，增加更多的持有者福利 讓持有者享受更多的好康，讓這個社群更加完整，謝謝大家`,
      },
    ]);

    return {
      roadmap,
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
@import "~@/assets/global.scss";

.section {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  background-color: $primaryLightBlue;
  padding: 5vw 0;
  background-image: url("~@/views/section/s7/bg.svg");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  .title {
    position: relative;
    z-index: 1;
    font-family: "Noto serif tc";
    color: #fff;
    letter-spacing: 5px;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.9));

    h1 {
      font-size: 3vw;
      margin-bottom: 2.5vw;
    }
  }

  .roadmap {
    font-family: $font2;
    color: #fff;
    width: 60%;
    .roadmap-item {
      position: relative;
      font-size: 1.5vw;
      line-height: 2;
      padding-left: 5vw;
      padding-bottom: 3vw;
      font-weight: 300;

      &:hover {
        text-decoration: underline;
        .line {
          &::after {
            background: #fff;
            transform: translateX(-50%) scale(1.5);
            animation: pulse 0.5s alternate-reverse infinite;
            @keyframes pulse {
              from {
                transform: translateX(-50%) scale(1.5);
              }
              to {
                transform: translateX(-50%) scale(1);
              }
            }
          }
        }
      }

      .line {
        position: absolute;
        left: 0;
        height: 100%;
        width: 0;
        border-left: 1px dotted #fff;
        border-right: 1px dotted #fff;
        background: #fff;
        &::after {
          content: "";
          width: 0.8vw;
          height: 0.8vw;
          border-radius: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 30%;
          transition: all 0.3s;
          background: $primaryOrange;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    padding: 30px 0;
    .title {
      position: relative;
      z-index: 1;
      font-family: "Noto serif tc";
      color: #fff;
      letter-spacing: 5px;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.9));

      h1 {
        font-size: 24px;
        margin-bottom: 30px;
        padding: 16px;
      }
    }

    .roadmap {
      width: 90%;
      .roadmap-item {
        font-size: 14px;
        line-height: 2;
        padding-left: 40px;
        padding-bottom: 40px;

        &:hover {
          text-decoration: underline;
          .line {
            &::after {
              background: #fff;
              transform: translateX(-50%) scale(1.5);
              animation: pulse 0.5s alternate-reverse infinite;
              @keyframes pulse {
                from {
                  transform: translateX(-50%) scale(1.5);
                }
                to {
                  transform: translateX(-50%) scale(1);
                }
              }
            }
          }
        }

        .line {
          width: 3px;
          &::after {
            content: "";
            width: 20px;
            height: 20px;
            border-radius: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 30%;
            transition: all 0.3s;
            background: $primaryOrange;
          }
        }
      }
    }
  }
}
</style>