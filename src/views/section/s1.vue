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
        <div class="masonry-item">
          <img src="@/assets/images/cat.jpg" alt="" srcset="" />
        </div>
        <div class="masonry-item">
          <img src="@/assets/images/cat.jpg" alt="" srcset="" />
        </div>
        <div class="masonry-item">
          <img src="@/assets/images/cat.jpg" alt="" srcset="" />
        </div>
        <div class="masonry-item">
          <img src="@/assets/images/cat.jpg" alt="" srcset="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "s1",
  setup() {
    const store = useStore();
    onMounted(() => {});

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
    align-items: center;
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
      display: flex;
      flex-flow: column wrap;
      align-content: space-between;
      height: 100%;
      .masonry-item {
        width: 200px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>