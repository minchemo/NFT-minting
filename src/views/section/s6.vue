<template>
  <div class="section" id="s6">
    <div class="title">
      <h1 class="styled-title" data-aos="fade">
        {{ $t("s6.title_1") }}
      </h1>
    </div>
    <div class="question">
      <div
        class="question-item"
        v-for="(item, i) in question"
        :key="i"
        v-bind:class="{ active: selectedQuestion == i }"
      >
        <div
          v-html="`${i + 1}. ${item.q}`"
          class="title"
          @click="selectedQuestion = i"
          @mouseover="selectedQuestion = i"
          @mouseleave="selectedQuestion = null"
        ></div>
        <div v-html="item.a" class="answer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted, ref } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "s6",
  setup() {
    const store = useStore();
    const question = ref([
      {
        q: "台灣好覓是什麼樣的NFT呢？",
        a: "台灣好覓是一款以台灣特色規劃的NFT專案，裡面有動物異人與在地美食等元素結合的NFT，預計總共發行10625張NFT，後續也將會設計一系列與美食與賦能等線上線下的虛實活動，歡迎有興趣的朋友們，一起加入我們。",
      },
      {
        q: "請問每個人最多可以買幾張台灣好覓NFT呢？",
        a: "白名單價格為 0.08 ETH (不包括 Gas fee) 每個錢包地址最多購買 2 張<br>公售期間價格為 0.1 ETH (不包括 Gas fee)每個錢包地址最多購買 10 張",
      },
      {
        q: "購買的NFT 會出現在哪裡呢？",
        a: "我們採用以太坊智能合約進行相關mint鑄造，銷售採用以太幣ETH進行銷售，您mint了NFT後，您的台灣好覓NFT將會自動出現於Opensea上，後續您的NFT即會在上面顯示。",
      },
      {
        q: "推薦使用購買錢包與綁定Opensea帳號",
        a: "我們推薦您使用MetaMask 小狐狸錢包進行錢包的申請，並綁定於Opensea 公海帳號，並且於購買虛擬貨幣入金以後，於我們官方網站進行鑄造屬於您獨一無二的NFT",
      },
      {
        q: "我們的願景是什麼？",
        a: "我們希望將台灣好覓打造成一款以推薦在地美食與結合賦能回饋給我們的持有者，既然是美食為發想，當然希望可以讓大家都享受到美食。所以也會結合一些美食廠商做賦能與活動，並回饋給我們的持有者。並且在我們的路線圖內也有規劃，我們於達成每一千張的銷售都將會捐出1ETH給予台灣的社福團體，讓這些需要幫助的大小朋友們能獲得大家的共同幫忙、讓社會更加美好，後續於達成全部銷售後，將會購買虛擬土地，並成立我們的俱樂部，打造一個線上線下的虛實社群結合，讓大家在元宇宙內開心玩樂，線下享受美食",
      },
    ]);

    const selectedQuestion = ref();
    return {
      selectedQuestion,
      question,
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
  background-image: url("~@/views/section/s6/bg.svg");
  background-size: 100%;
  background-position: bottom;
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

  .question {
    width: 60%;
    .question-item {
      font-family: $font2;
      color: #fff;
      margin: 1.5vw 0;
      .title {
        display: inline-block;
        border: 2px solid #fff;
        font-size: 1.8vw;
        padding: 1vw;
        border-radius: 10px;
        transition: all 0.2s;
        position: relative;
        left: 50%;
        transform: translate(-50%);
        &:hover {
          cursor: pointer;
          transform: translate(-48%);
          background: #fff;
          color: $primaryBlue;
          font-weight: 1000;
        }
      }
      .answer {
        font-size: 1.2vw;
        line-height: 2;
        letter-spacing: 2px;
        padding-left: 1.5vw;
        margin-top: 1vw;
        overflow: hidden;
        transition: all 0.5s;
        text-align: center;
        max-height: 0;
      }
      &.active {
        .answer {
          max-height: 500px;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    padding: 30px 0;
    background-size: 300%;
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
    .question {
      width: 90%;
      .question-item {
        margin: 20px 0;
        .title {
          font-size: 17px;
          padding: 14px;
          line-height: 1.5;
          margin-bottom: 15px;
          &:hover {
            transform: translate(-50%);
          }
        }
        .answer {
          font-size: 14px;
          text-align: left;
        }
        &.active {
          .answer {
            max-height: 500px;
          }
        }
      }
    }
  }
}
</style>