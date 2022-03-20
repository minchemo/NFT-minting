<template>
  <div class="section" id="s3">
    <div class="main">
      <div class="horizontal-container">
        <div class="scroll-wrapper" ref="scroll">
          <div class="scroll-content">
            <img
              class="scroll-item"
              src="@/assets/images/1.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/6.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/7.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/8.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/13.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/01.jpg"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/1.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/6.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/7.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/8.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/13.png"
              alt=""
              srcset=""
            />
            <img
              class="scroll-item"
              src="@/assets/images/01.jpg"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="filter"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted, ref } from "vue";
import useEthereum from "@/utils/useEthereum";
import BScroll from '@better-scroll/core'

export default defineComponent({
  name: "s3",
  setup() {
    const store = useStore();
    const scroll = ref(null);

    onMounted(() => {
      new BScroll(scroll.value, {
        scrollX: true,
        probeType: 3
      })
    })

    return {
      scroll,
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/global.scss";
@import "~@/assets/variable.scss";

.section {
  position: relative;
  width: 100%;
  min-height: 50vh;
  background-color: #32325d;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  font-family: $font2;

  .main {
    width: 100%;

    .horizontal-container {
      .scroll-wrapper {
        position: relative;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        .scroll-content {
          display: inline-block;
        }
        .scroll-item {
          width: 15vw;
          display: inline-block;
        }
      }
    }
  }

  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: 0;
    top: 0;
    background: rgba($color: #000, $alpha: 0.2);
    backdrop-filter: blur(2px);
    transform: scale(1);
    animation: blurIn 5s;

    @keyframes blurIn {
      from {
        backdrop-filter: blur(10px);
        transform: scale(1);
      }
      to {
        backdrop-filter: blur(2px);
        transform: scale(1);
      }
    }
  }
}
</style>