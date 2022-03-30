<template>
  <div class="section" id="s4">
    <div class="flex">
      <div class="container">
        <h1 class="styled-title" data-aos="fade">
          {{ $t("s4.title_1") }}
        </h1>
        <p data-aos="fade" data-aos-delay="400" v-html="$t('s4.desc_1')"></p>
        <div class="donation">
          <div class="title">參與協會列表</div>
          <a target="_blank" href="https://www.facebook.com/Shine80945"
            >光線溫暖協會</a
          >
          <a target="_blank" href="https://firefly.com.tw/"
            >社團法人高雄市螢火蟲兒少福利服務關懷協會</a
          >
          <a target="_blank" href="https://kswu.org.tw/">高雄市社福慈善總會</a>
        </div>
      </div>
      <div class="container">
        <h1 class="styled-title" data-aos="fade">
          {{ $t("s4.title_2") }}
        </h1>
        <p data-aos="fade" data-aos-delay="400" v-html="$t('s4.desc_2')"></p>
        <img
          data-aos="fade"
          data-aos-delay="800"
          src="@/assets/images/gold.jpg"
          alt=""
          srcset=""
        />
      </div>
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
  .flex {
    width: 80%;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    font-family: "Noto serif tc";
    color: #fff;
    letter-spacing: 5px;

    .container {
      h1 {
        font-size: 3vw;
        margin-bottom: 2.5vw;
      }
      p {
        font-size: 1vw;
        line-height: 1.5;
      }
      img {
        margin-top: 2vw;
        width: 50%;
        border-radius: 5px;
      }

      .donation {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 1.5vw 2vw;
        color: #fff;
        margin-top: 1.5vw;
        .title {
          font-size: 1.5vw;
          margin-bottom: 1.5vw;
          font-weight: 1000;
        }
        a {
          font-size: 1.1vw;
          display: block;
          color: #fff;
          margin: 20px 0;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    .flex {
      width: 80%;
      flex-direction: column;
      .container {
        margin-bottom: 50px;
        h1 {
          font-size: 24px;
          margin-bottom: 30px;
          padding: 16px;
        }
        p {
          font-size: 14px;
          line-height: 1.5;
          text-align: justify;
        }
        img {
          margin-top: 30px;
          width: 100%;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>