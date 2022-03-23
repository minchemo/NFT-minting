<template>
  <div id="nav" v-bind:class="{ active: scrollTop > 0 }">
    <div class="logo fadejs">
      <img src="@/assets/logo.jpeg" alt="" srcset="" />
    </div>

    <div class="title fadejs">The cat on chain</div>

    <div class="open-menu">
      <div>mint</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, defineComponent, onMounted } from "vue";
// import useEthereum from "@/utils/useEthereum";

export default defineComponent({
  name: "header",
  setup() {
    const store = useStore();
    const scrollTop = ref(0);

    onMounted(() => {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      document.body.style.overflowY = "hidden";
      document.addEventListener(
        "scroll",
        function (e) {
          scrollTop.value = window.scrollY;
        },
        true
      );

      setTimeout(() => {
        document.body.style.overflowY = "auto";
      }, 4000);
    });

    return {
      scrollTop,
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
  z-index: 50;
  .logo {
    position: absolute;
    top: 5vh;
    left: 15vw;
    width: 10vh;
    height: 10vh;
    border-radius: 100%;
    border: 1px solid#eee;
    overflow: hidden;
    animation: in 4.5s;
    transition: all 0.5s;

    img {
      width: 100%;
    }

    @keyframes in {
      0% {
        transform: translateX(100vw) rotate(0deg);
      }
      80% {
        transform: translateX(-10px) rotate(-2890deg);
      }
      100% {
        transform: translateX(0) rotate(-2880deg);
      }
    }
  }
  .title {
    position: absolute;
    top: 7vh;
    left: 22vw;
    font-family: $font1;
    font-size: 3vw;
    color: #fff;
    animation: titlein 4.5s;
    transition: all 0.5s;

    @keyframes titlein {
      0% {
        transform: translateX(100vw);
      }
      80% {
        transform: translateX(-10px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
  .open-menu {
    position: absolute;
    right: 0;
    top: 7vh;
    width: 10vw;
    height: 8vh;
    background: #fff;
    border-radius: 30px 0 0 0;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-family: $font2;
    font-size: 1.5vw;
    padding-left: 10px;
    font-weight: 1000;
    letter-spacing: 5px;
    &:hover {
      background-color: $primaryGreen;
      color: #fff;
      cursor: pointer;
    }
    animation: btnin 2s;
    transition: all 0.5s;

    @keyframes btnin {
      0% {
        transform: translateX(20vw);
      }
      100% {
        transform: translateX(0);
      }
    }
  }

  &.active {
    .logo {
      top: 0.5vw;
      left: 0.5vw;
      width: 4vw;
      height: 4vw;
      border-radius: 5px;
    }
    .title {
      top: -5vh;
    }
    .open-menu {
      right: 0;
      top: 0;
      border-radius: 0 0 0 30px;
      filter: drop-shadow(-5px -10px 10px rgba(0, 0, 0, 0.2));
    }
  }
}
</style>