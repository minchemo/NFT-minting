<template>
  <div class="section" id="buy">
    <h1 class="title">錢包登記</h1>
    <div class="info">請先連接錢包完成白名單登記，並將於 2022/6/28 00:00 開始白名單申購</div>
    <div class="connect" @click="register"> {{ store.state.register ? '請稍後...' : '登記錢包' }}</div>
  </div>
</template>

<script>
import useEthereum from "@/utils/useEthereum";
import { getCurrentInstance, defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Buy",
  setup() {
    const store = useStore();
    const { init } = useEthereum();

    const register = () => {
      if (store.state.register) {
        return
      }

      store.dispatch("setStateData", {
        name: "setRegister",
        data: true,
      })
      init(true)
    }

    return {
      store,
      init,
      register
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
  color: #fff;
  padding: 5vw 5vw;
  text-align: center;
  font-family: $font1;
  padding-top: 5%;

  .title {
    font-size: 32px;
  }

  .info {
    margin: 20px 0;
  }

  .connect {
    display: inline-block;
    background-color: #fff;
    color: $primaryLightBlue;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
  }

}

@media screen and (max-width: 767px) {
  .section {
    padding-top: 120px;

  }
}
</style>
