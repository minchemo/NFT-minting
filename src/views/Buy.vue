<template>
  <div class="section" id="buy">
    <div class="box" data-aos="fade">
      <div class="desc">
        <h1>{{ $t("buy.title") }}</h1>
        <p v-html="$t('buy.desc')"></p>
      </div>
      <div class="mint">
        <div class="mint-info">1 / 10000</div>
        <div class="mint-amount">
          <span class="de btn">－</span>
          <span class="current">0</span>
          <span class="in btn">＋</span>
        </div>
        <div class="mint-button">購買</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  getCurrentInstance,
  nextTick,
  defineComponent,
  onMounted,
  watch,
  inject,
} from "vue";

import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "Buy",
  components: {},
  setup() {
    const globals = getCurrentInstance().appContext.config.globalProperties;
    const store = useStore();
    const route = useRoute();
    // const { } = useEthereum();

    const smoothScroll = inject("smoothScroll");

    return {
      store,
      // init,
      // connectedAddress,
      // requestAccount,
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
    padding: 5vw 10vw;
    border-radius: 50px;
    backdrop-filter: blur(3px);
    .mint {
      margin-left: 10vw;
      width: 35%;
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
        font-size: 2vw;
        background-color: $primaryYellow;
        padding: 1vw 2.5vw;
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
      h1 {
        font-size: 2.5vw;
        font-weight: 900;
        margin-bottom: 3vw;
      }
      p {
        font-size: 1vw;
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
      padding: 30px;
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
