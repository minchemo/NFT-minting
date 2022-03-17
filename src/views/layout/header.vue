<template>
  <div id="nav"  data-aos="fade-down" data-aos-delay="1000">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" srcset="" />
    </div>
    <div class="right">
      <div class="links">
        <router-link to="/#s1" class="link">{{ $t("header.home") }}</router-link>
        <router-link to="/#s2" class="link">{{ $t("header.about") }}</router-link>
        <router-link to="/#s3" class="link">{{ $t("header.work") }}</router-link>
        <router-link to="/buy" class="link">{{ $t("header.buy") }}</router-link>
      </div>
      <div class="connect-wallet">{{ $t("header.connect_wallet") }}</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";
import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "header",
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
#nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;

  height: $navHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  padding: 0 7vw;
  box-sizing: border-box;
  backdrop-filter: blur(15px);

  .logo {
    height: 80%;
    img {
      height: 100%;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .links {
      margin-right: 1vw;
      .link {
        position: relative;
        margin-right: 2vw;
        font-size: 24px;
        color: $primaryYellow;
        text-decoration: none;
        letter-spacing: 2px;
        border-right: 0.5px solid;
        padding-right: 2vw;

        &:after {
          content: "";
          background: $primaryYellow;
          position: absolute;
          bottom: -20%;
          left: 0;
          width: 0;
          height: 2px;
          z-index: -1;
          transition: all 0.3s;
        }

        &:last-child {
          border-right: 0;
        }

        &:hover {
          &::after {
            width: calc(80% - 1vw);
          }
        }
      }
    }
    .connect-wallet {
      font-size:16px;
      background: $primaryYellow;
      color: #fff;
      padding: 12px 30px;
      border-radius: 50px;
      transition: all 0.5s;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 20px rgba($color: #fff, $alpha: 0.5);
      }
    }
  }
}
</style>