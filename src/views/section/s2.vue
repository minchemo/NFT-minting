<template>
  <div class="section" id="s2">
    <div class="main">
      <div class="item">
        <h1>Why Cat</h1>
        <p>
          This is my cat, but it's just a starting point. Like humans, cats may
          socialize and meet new friends, and that's what we're going to do
          next.
        </p>
      </div>
      <div class="item">
        <h1>To do</h1>
        <p>
          We will develop a social app and list on AppStore and PlayStore, users
          will not only our holders but also users come from all over the world,
          but holders own more benefits.
        </p>
      </div>
      <div class="break"></div>
      <div class="item w100">
        <h1 class="special">random pricing mint</h1>
        <p>
          Assuming that the require payment is 0.02 eth before minting, it does
          not mean that it is your purchase price. You will receive a refund
          immediately after minting. If you receive 0.015 eth, then your
          purchase price is 0.005 eth. The price will be different for everyone.
        </p>
      </div>
      <div class="break"></div>
      <div class="item">
        <h1>all app users</h1>
        <p>
          1. Enter online matchmaking and meet different people<br />
          2. Join Holder's events<br />
          3. Learn more about NFT project information here<br />
          4. To be determined
        </p>
      </div>
      <div class="item">
        <h1>holders</h1>
        <p>
          1. Enter online matchmaking and meet different people<br />
          2. Hold a physical event or party, invite all users to participate,
          and chat about NFTs together?<br />
          3. Share your projects, products, and careers. You can also empower
          TCOC yourself. If you want, we are glad to cooperate with you.<br />
          4. To be determined...
        </p>
      </div>
      <div class="break"></div>
      <div class="item">
        <h1>Project sales fund</h1>
        <p>
          <b>10%</b> for stray cats or cat-related donations<br />
          <b>60%</b> Follow-up project development and project team<br />
          <b>30%</b> community funding
        </p>
      </div>
      <div class="item">
        <h1>Monthly secondary market royalty</h1>
        <p>
          <b>40%</b> Project Maintenance and Operations<br />
          <b>30%</b> TCOC Holder cooperation<br />
          <b>10%</b> for stray cats or cat-related donations<br />
          <b>20%</b> community funding
        </p>
      </div>
      <div class="break"></div>
      <div class="item">
        <img src="@/assets/images/roadmap_zh.svg" alt="" srcset="" />
      </div>
      <div class="item">
        <img src="@/assets/images/roadmap_en.svg" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "s2",
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
  font-family: $font2;
  .main {
    margin-left: auto;
    position: relative;
    width: 95%;
    height: 100%;
    background: $primaryYellow;
    right: 0;
    bottom: 0;
    padding: 8vw 10vw;
    color: $primaryGreen;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      width: 45%;
      h1 {
        font-size: 3vw;
        font-weight: 1000;
        text-transform: uppercase;
        &.special {
          text-decoration: underline;
        }
      }
      img {
        width: 100%;
      }

      p {
        font-size: 1vw;
        line-height: 1.5;
      }

      &.w100 {
        width: 100%;
      }
    }

    .break {
      margin: 2vw 0;
      width: 100%;
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    position: relative;
    width: 100%;
    height: auto;
    font-family: $font2;
    .main {
      .item {
        width: 100%;
        h1 {
          font-size: 40px;
          font-weight: 1000;
          text-transform: uppercase;
          line-height: 1.5;
          margin: 2vh 0;
        }

        p {
          font-size: 18px;
          line-height: 2;
        }

        &.w100 {
          width: 100%;
        }
      }

      .break {
        margin: 2vw 0;
        width: 100%;
      }
    }
  }
}
</style>