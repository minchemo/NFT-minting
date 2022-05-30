<template>
  <div class="section" id="s1">
    <div class="main">
      <div class="loading" v-bind:class="{ hide: !loading }">
        <p>loading</p>
      </div>
      <div class="info">
        <h2>
          <span class="t">The cat</span><br />
          in real<br />
          but now<br />
          <span class="t">on chain .</span>
        </h2>
        <p>Real cat picture with different handpainted properties.</p>
      </div>
      <div class="masonry">
        <img
          class="m-item"
          v-lazy="{
            src: require(`@/assets/images/cat/${i}.jpg`),
            loading: require(`@/assets/images/loading.svg`),
            lifecycle: lazyOptions.lifecycle,
          }"
          alt=""
          srcset=""
          v-for="i in catImagesLength"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { requestAccount } from "@/utils/useEthereum"
import { ref, reactive, defineComponent, onMounted } from "vue"
import Masonry from "masonry-layout"

export default defineComponent({
  name: "s1",
  setup() {
    const catImagesLength = ref(17)
    const imagesLoaded = ref(0)
    const store = useStore()
    const loading = ref(true)

    const lazyOptions = reactive({
      lifecycle: {
        loaded: (el) => {
          imagesLoaded.value++

          if (imagesLoaded.value == catImagesLength.value) {
            new Masonry(".masonry", {
              itemSelector: ".m-item",
              gutter: 10,
              originTop: false,
            })
          }
        },
      },
    })

    onMounted(() => {
      setTimeout(() => {
        loading.value = false
      }, 4000)
    })

    return {
      catImagesLength,
      lazyOptions,
      store,
      loading,
      requestAccount,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";

.section {
  position: relative;
  width: 100%;
  height: 100vh;
  font-family: $font2;

  .main {
    position: absolute;
    width: 95%;
    height: 85vh;
    background: $primaryYellow;
    right: 0;
    bottom: 0;
    border-radius: 10vw 0 0 0;
    padding: 8vw 10vw;
    font-weight: 300;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .loading {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 10vw 0 0 0;
      z-index: 50;
      backdrop-filter: blur(30px);
      transition: all 0.5s;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      p {
        font-size: 5vw;
        font-weight: 1000;
        text-transform: uppercase;
        color: #fff;
        letter-spacing: 5px;
      }

      &.hide {
        opacity: 0;
        backdrop-filter: blur(0px);
      }
    }

    .social {
      position: absolute;
      right: 0;
      top: 0;
      padding: 20px;
      display: flex;

      .link {
        width: 3vw;
        margin-left: 1vw;
        padding: 0.5vw;
        transition: all 0.3s;
        border: 4px solid transparent;
        cursor: pointer;

        img {
          width: 100%;
        }

        &:hover {
          border: 4px solid #fff;
          border-radius: 10px;
        }
      }
    }
    .info {
      h2 {
        font-size: 4vw;
        font-weight: 200;
        color: $primaryGreen;
        text-transform: uppercase;
        line-height: 1.5;
        .t {
          font-weight: 1000;
        }
      }

      p {
        margin-top: 2vw;
        font-size: 1.5vw;
        line-height: 1.5;
        font-weight: 200;
        color: $primaryGreen;
      }
    }
    .masonry {
      position: relative;
      width: 50%;
      .m-item {
        width: 15%;
        border-radius: 5px;
        margin-bottom: 10px;
        transition: all 0.3s;
        &:hover {
          transform: translateY(-5px);
          z-index: 1;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    position: relative;
    width: 100%;
    height: auto;
    min-height: auto;
    font-family: $font2;

    .main {
      position: relative;
      width: 95%;
      height: auto;
      background: $primaryYellow;
      right: 0;
      top: 10vh;
      bottom: unset;
      border-radius: 10vw 0 0 0;
      padding: 8vw 10vw;
      font-weight: 300;
      flex-direction: column;

      .loading {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        border-radius: 10vw 0 0 0;
        z-index: 50;
        backdrop-filter: blur(30px);
        transition: all 0.5s;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 5vw;
          font-weight: 1000;
          text-transform: uppercase;
          color: #fff;
          letter-spacing: 5px;
        }

        &.hide {
          opacity: 0;
          backdrop-filter: blur(0px);
        }
      }

      .social {
        position: absolute;
        right: 0;
        top: 0;
        padding: 5px;
        display: flex;

        .link {
          width: 40px;
          margin-left: 6px;
          padding: 2px;
          transition: all 0.3s;
          border: 4px solid transparent;
          cursor: pointer;

          img {
            width: 100%;
          }

          &:hover {
            border: 4px solid #fff;
            border-radius: 10px;
          }
        }
      }
      .info {
        h2 {
          font-size: 40px;
          font-weight: 200;
          color: $primaryGreen;
          text-transform: uppercase;
          line-height: 1.5;
          .t {
            font-weight: 1000;
          }
        }

        p {
          margin-top: 2vw;
          font-size: 18px;
          line-height: 1.5;
          font-weight: 200;
          color: $primaryGreen;
        }
      }
      .masonry {
        position: relative;
        width: 100%;
        margin-top: 5vh;
        .m-item {
          width: 18%;
          border-radius: 5px;
          margin-bottom: 10px;
          transition: all 0.3s;
          &:hover {
            transform: translateY(-5px);
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>
