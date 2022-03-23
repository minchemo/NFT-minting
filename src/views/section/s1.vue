<template>
  <div class="section" id="s1">
    <div class="main">
      <div class="info">
        <h2>
          <span class="t">The cat</span><br />
          in real<br />
          but now<br />
          <span class="t">on chain .</span>
        </h2>
        <p>
          Real picture with different handpainted properties <br />and will be
          sold at a random price.
        </p>
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
import { useStore } from "vuex";
import { ref, reactive, defineComponent, onMounted } from "vue";
import Masonry from "masonry-layout";

export default defineComponent({
  name: "s1",
  setup() {
    const catImagesLength = ref(17);
    const imagesLoaded = ref(0);
    const store = useStore();

    const lazyOptions = reactive({
      lifecycle: {
        loaded: (el) => {
          imagesLoaded.value++

          if (imagesLoaded.value == catImagesLength.value) {

            new Masonry('.masonry', {
              itemSelector: '.m-item',
              gutter: 10,
              originTop: false
            });
          }
        }
      }
    })

    onMounted(() => {
    });

    return {
      catImagesLength,
      lazyOptions,
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
</style>