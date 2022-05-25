<template>
  <div class="section" id="s5">
    <div class="title">
      <h1 class="styled-title" data-aos="fade">
        {{ $t("s5.title_1") }}
      </h1>
    </div>
    <div class="news" data-aos="fade" data-aos-delay="400">
      <div class="item" v-for="(item, i) in news" :key="i">
        <a target="_blank" :href="news[i].url">
          <p class="id">
            <span>{{ i + 1 }}</span>
          </p>
          <div class="content">
            <p class="title">{{ news[i].title }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted, ref } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "s5",
  setup() {
    const store = useStore();
    const news = ref([
      {
        title: "經濟日報 台灣好覓NFT融合台灣美食與動物特色 攜手社福團體聯名做公益",
        url: "https://money.udn.com/money/story/5635/6333240",
      },
      {
        title: "TalkNews 說新聞 台灣好覓NFT融合台灣美食與動物特色 攜手社福團體 聯名做公益",
        url: "https://reurl.cc/e3G2bj",
      },
      {
        title: "民生好報 台灣好覓NFT融合台灣美食與動物特色 攜手社福團體 聯名做公益",
        url: "https://reurl.cc/j1QEjZ",
      },
      {
        title: "台灣電報 台灣好覓NFT融合台灣美食與動物特色 攜手社福團體 聯名做公益",
        url: "https://reurl.cc/p19N0b",
      },
      {
        title: "新民生報 台灣好覓NFT融合台灣美食與動物特色 攜手社福團體 聯名做公益",
        url: "https://reurl.cc/DyK226",
      }
    ]);

    return {
      news,
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

  .news {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    font-family: $font2;
    .item {
      border-bottom: 2px solid #fff;
      margin-top: 1vw;
      padding: 1vw 2vw;
      transition: all 0.2s;
      a {
        color: #fff;
        text-decoration: none;
        display: flex;
        align-items: center;
        .id {
          position: relative;
          font-size: 2vw;
          margin-right: 3vw;
          z-index: 1;
          color: #fff;
          span {
            position: relative;
            z-index: 1;
          }
          &:after {
            content: "";
            width: 2.5vw;
            height: 2.5vw;
            position: absolute;
            background-color: $primaryOrange;
            border-radius: 100%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
        .content {
          .title {
            font-size: 1.5vw;
            font-weight: bold;
            margin-bottom: 1vw;
            line-height: 1.5;
            overflow: hidden;
            max-width: 100%;
          }
          .date {
            font-size: 1vw;
          }
        }
      }
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px 10px 0 0;
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

    .news {
      width: 90%;
      .item {
        border-bottom: 1px solid #fff;
        margin-top: 10px;
        padding: 15px 20px;
        transition: all 0.2s;
        a {
          .id {
            font-size: 20px;
            margin-right: 24px;
            &:after {
              width: 30px;
              height: 30px;
            }
          }
          .content {
            width: 100%;
            .title {
              font-size: 16px;
              margin-bottom: 12px;
              width: 100%;
            }
            .date {
              font-family: $font2;
              font-size: 12px;
            }
          }
        }
        &:hover {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px 10px 0 0;
        }
      }
    }
  }
}
</style>