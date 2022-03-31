<template>
  <div class="section" id="buy">
    <div class="box" data-aos="fade">
      <div class="desc">
        <h1>{{ $t("buy.title") }}</h1>
        <p v-html="$t('buy.desc')"></p>
      </div>
      <div class="mint">
        <!-- amount -->
        <template v-if="store.state.connectedAddress != ''">
          <div class="mint-info">
            {{ store.state.totalSupply }} /
            {{ store.state.nftConfig.maxSupply }}
          </div>
          <div class="mint-amount">
            <span class="de btn" @click="buyAmount--">－</span>
            <span class="current">{{ buyAmount }}</span>
            <span class="in btn" @click="buyAmount++">＋</span>
          </div>
        </template>
        <!-- sale condition -->
        <div class="sale-info">
          <template v-if="store.state.nftConfig.paused">
            尚未開始販售
          </template>
          <template v-else-if="store.state.nftConfig.isPreSale">
            目前為白名單販售期間
          </template>
          <template v-else-if="store.state.nftConfig.isPublicSale">
            目前為公開販售期間
          </template>
        </div>
        <!-- buy section -->
        <!-- <div class="mint-button" @click="processBuy()">
          <template v-if="store.state.connectedAddress != ''">
            <p>購買</p>
          </template>
          <template v-else>
            <p>連接錢包</p>
          </template>
        </div> -->
        <div class="mint-button">
          <p>尚未開始販售</p>
        </div>
        <!-- connect wallet -->
        <!-- <div class="connect-wallet" >
          <template v-if="store.state.connectedAddress != ''">
            <p>
              {{ store.state.connectedAddress.substring(0, 6) }}.....{{
                store.state.connectedAddress.substr(-5)
              }}
            </p>
          </template>
          <template v-else>
            <p>請先連接錢包</p>
          </template>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import useEthereum from "@/utils/useEthereum";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Buy",
  setup() {
    const store = useStore();
    const { init, canPresaleIdx, publicSaleMint, preSaleMint } = useEthereum();

    const buyAmount = ref(0);

    const processBuy = () => {
      if (!store.state.init) {
        init();
        return;
      }

      if (store.state.nftConfig.paused) {
        alert("尚未開始販售");
      } else {
        const check = canBuy();
        if (saleStage() == "presale") {
          if (check["can"]) {
            preSaleMint(buyAmount.value);
          } else {
            alert(check["msg"]);
          }
        } else if (saleStage() == "publicsale") {
          if (check["can"]) {
            publicSaleMint(buyAmount.value);
          } else {
            alert(check["msg"]);
          }
        }
      }
    };

    const canBuy = () => {
      let canBuyInfo = {
        can: true,
        msg: "",
      };

      const MAX_AMOUNT_PER_WALLET =
        canPresaleIdx() >= 0
          ? store.state.nftConfig.preSaleMaxMint +
            store.state.nftConfig.publicSaleMaxMint
          : store.state.nftConfig.preSaleMaxMint;

      const MAX_SUPPLY = store.state.nftConfig.maxSupply;
      const TOTAL_SUPPLY = store.state.totalSupply;

      if (store.state.nftConfig.paused) {
        canBuyInfo.can = false;
        canBuyInfo.msg = "販售尚未開始";
      } else if (saleStage() == "presale" || saleStage() == "publicsale") {
        if (saleStage() == "presale" && canPresaleIdx() == -1) {
          canBuyInfo.can = false;
          canBuyInfo.msg = "不在白名單";
        } else if (
          store.state.addressMinted + buyAmount.value >
          MAX_AMOUNT_PER_WALLET
        ) {
          canBuyInfo.can = false;
          canBuyInfo.msg = "超出可購買數量";
        } else if (TOTAL_SUPPLY + buyAmount.value > MAX_SUPPLY) {
          canBuyInfo.can = false;
          canBuyInfo.msg = "超出最大供應量";
        }
      }

      return canBuyInfo;
    };

    const saleStage = () => {
      if (
        store.state.nftConfig.isPreSale &&
        !store.state.nftConfig.isPublicSale
      ) {
        return "presale";
      } else if (
        !store.state.nftConfig.isPreSale &&
        store.state.nftConfig.isPublicSale
      ) {
        return "publicsale";
      }
    };

    return {
      store,
      processBuy,
      buyAmount,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.section {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: #fff;
  padding: 5vw 5vw;

  font-family: $font1;

  .box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5vw 10vw;
    border-radius: 50px;
    backdrop-filter: blur(3px);
    .mint {
      width: 30%;
      text-align: center;
      .mint-info {
        font-family: $font2;
        font-size: 3vw;
      }

      .mint-amount {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 5vw 0;
        .btn {
          display: inline-flex;
          width: 3vw;
          height: 3vw;
          background: $primaryYellow;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 100%;
          font-size: 1.5vw;

          &:hover {
            background-color: $primaryOrange;
          }
        }
        .current {
          font-size: 2vw;
        }
      }
      .mint-button {
        font-size: 1.5vw;
        background-color: $primaryYellow;
        padding: 1vw 2.5vw;
        border-radius: 100px;
        text-align: center;

        &:hover {
          cursor: pointer;
          background-color: $primaryOrange;
        }
      }
      .connect-wallet {
        margin-top: 20px;
        font-size: 1.5vw;
      }
    }
    .desc {
      width: 65%;
      text-align: left;
      border: 1px solid #fff;
      padding: 20px 30px;
      border-radius: 30px;
      h1 {
        font-size: 2.5vw;
        font-weight: 900;
        margin-bottom: 3vw;
      }
      p {
        font-size: 1.2vw;
        line-height: 2;
        font-weight: 300;
        letter-spacing: 1.5px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    padding-top: 120px;
    .box {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      padding: 10px;
      border-radius: 50px;
      backdrop-filter: blur(3px);

      .mint {
        margin-left: 0;
        width: 80%;
        text-align: center;
        .mint-info {
          font-family: $font2;
          font-size: 24px;
        }

        .mint-amount {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 30px 0;
          .btn {
            display: inline-flex;
            width: 40px;
            height: 40px;
            background: $primaryYellow;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 100%;
            font-size: 30px;

            &:hover {
              background-color: $primaryOrange;
            }
          }
          .current {
            font-size: 20px;
          }
        }
        .mint-button {
          font-size: 24px;
          background-color: $primaryYellow;
          padding: 20px 20px;
          border-radius: 100px;
          text-align: center;

          &:hover {
            cursor: pointer;
            background-color: $primaryOrange;
          }
        }
      }
      .desc {
        text-align: left;
        margin-top: 50px;
        width: 100%;
        padding: 10px 20px;
        h1 {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 20px;
        }
        p {
          font-size: 14px;
          line-height: 2;
          font-weight: 300;
          letter-spacing: 1.5px;
        }
      }
    }
  }
}
</style>
