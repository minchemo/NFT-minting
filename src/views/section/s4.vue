<template>
  <div class="section">
    <div class="item">
      <div class="title">NFT 的價格是多少？</div>
      <div class="content">NFT 價格為 0.0 ETH（不包括 Gas fee）</div>
    </div>
    <div class="item">
      <div class="title">NFT 的價格是多少？</div>
      <div class="content">NFT 價格為 0.0 ETH（不包括 Gas fee）</div>
    </div>
    <div class="item">
      <div class="title">NFT 的價格是多少？</div>
      <div class="content">NFT 價格為 0.0 ETH（不包括 Gas fee）</div>
    </div>
    <div class="item">
      <div class="title">NFT 的價格是多少？</div>
      <div class="content">NFT 價格為 0.0 ETH（不包括 Gas fee）</div>
    </div>
    <div class="item">
      <div class="title">NFT 的價格是多少？</div>
      <div class="content">NFT 價格為 0.0 ETH（不包括 Gas fee）</div>
    </div>
    <div class="item">
      <div class="title">NFT 的價格是多少？</div>
      <div class="content">NFT 價格為 0.0 ETH（不包括 Gas fee）</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "s4",
  setup() {
    const store = useStore();

    return {
      store,
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
  flex-direction: column;
  background-color: rgba($color: $primaryBlue, $alpha: 0.85);
  padding: 5vw 0;
  background-image: url("~@/views/section/s4/bg.svg");
  background-size: 150%;
  // background-attachment: fixed;
  background-position: center;
  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: #fff;
    margin: 3vw 0;
    .title {
      font-weight: bold;
      font-size: 3vw;
      letter-spacing: 2px;
    }
    .content {
      margin-top: 1.5vw;
      font-weight: 300;
      font-size: 2vw;
      letter-spacing: 0;
    }
  }
}
</style>