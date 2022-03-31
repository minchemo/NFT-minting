<template>
  <div
    id="nav"
    data-aos="fade-down"
    data-aos-delay="1000"
    v-bind:class="{ active: scrollPos > 0 }"
  >
    <div class="logo">
      <router-link to="/" class="link">
        <img src="@/assets/logo.svg" alt="" srcset=""
      /></router-link>
    </div>
    <div class="right" v-bind:class="{ open: menuOpened }">
      <div class="links">
        <router-link to="/#s3" class="link">{{
          $t("header.work")
        }}</router-link>
        <router-link to="/#s4" class="link">{{
          $t("header.donation")
        }}</router-link>
        <router-link to="/#s7" class="link">{{
          $t("header.roadmap")
        }}</router-link>
        <router-link to="/#s6" class="link">{{
          $t("header.question")
        }}</router-link>
        <router-link to="/raffle" class="link">{{
          $t("header.raffle")
        }}</router-link>
        <router-link to="/buy" class="link">{{ $t("header.buy") }}</router-link>
      </div>
      <!-- <div class="connect-wallet">
        {{ $t("header.connect_wallet") }}
      </div> -->
      <div class="close" v-if="isMobile"></div>
    </div>
    <div class="openMenu" v-if="isMobile" @click="menuOpened = !menuOpened">
      <img src="@/assets/menu.svg" alt="" srcset="" />
    </div>
  </div>
  <div
    class="backdrop"
    v-if="isMobile && menuOpened"
    v-bind:class="{ active: menuOpened }"
    @click="menuOpened = !menuOpened"
  ></div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted, ref } from "vue";
import useEthereum from "@/utils/useEthereum";
import { isMobile } from "@/utils/mobile";

export default defineComponent({
  name: "header",
  setup() {
    const store = useStore();
    const menuOpened = ref(false);
    const scrollPos = ref(0);

    onMounted(() => {
      window.addEventListener("scroll", (e) => {
        scrollPos.value = window.scrollY;
      });
    });

    return {
      scrollPos,
      store,
      menuOpened,
      isMobile,
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
  padding: 0 7vw;
  box-sizing: border-box;
  transition: all 1s;

  &.active {
    backdrop-filter: blur(15px);
    // background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

    .logo {
      img {
        height: 100%;
      }
    }
  }

  .logo {
    height: 50%;
    img {
      transition: all 1s;
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
        color: #fff;
        text-decoration: none;
        letter-spacing: 2px;
        border-right: 0.5px solid;
        padding-right: 2vw;
        font-weight: bold;

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
      font-size: 16px;
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

@media screen and (max-width: 767px) {
  #nav {
    height: 50px;

    .right {
      position: fixed;
      width: 60vw;
      height: 100vh;
      right: 0;
      top: 0;
      background: #fff;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translateX(100%);
      transition: all 0.5s;

      &.open {
        transform: translateX(0);
        z-index: -1;
      }

      .links {
        margin-right: 0;
        display: flex;
        flex-direction: column;
        .link {
          position: relative;
          margin-right: 2vw;
          font-size: 24px;
          color: $primaryYellow;
          text-decoration: none;
          letter-spacing: 2px;
          border-right: 0;
          padding-right: 2vw;
          font-weight: bold;
          margin: 12px 0;

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
        font-size: 16px;
        background: $primaryYellow;
        color: #fff;
        padding: 12px 30px;
        border-radius: 50px;
        transition: all 0.5s;
        margin-top: 20px;

        &:hover {
          cursor: pointer;
          box-shadow: 0 0 20px rgba($color: #fff, $alpha: 0.5);
        }
      }
    }
    .openMenu {
      width: 30px;
      height: 30px;
      img {
        filter: brightness(0) invert(1);
        width: 30px;
      }
    }
  }
  .backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba($color: #000000, $alpha: 0.5);
    left: 0;
    top: 0;
  }
}
</style>