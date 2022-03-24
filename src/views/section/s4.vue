<template>
  <div class="section" id="s4">
    <div class="main">
      <h1>Team</h1>
      <div class="team">
        <div class="team-item">
          <img src="@/assets/images/team/jmo.png" alt="" srcset="" />
          <h2 class="t1">JMO</h2>
          <p class="t2">Founder</p>
          <p class="t3">
            In 2020, Developed the Animal Crossing collector APP, with more than
            8,000 reviews and 4.8 stars, 200,000 downloads, 800 monthly average
            users in HongKong, Macao, Taiwan, China.
          </p>
        </div>
        <div class="team-item">
          <img src="@/assets/images/team/elli.jpg" alt="" srcset="" />
          <h2 class="t1">elli</h2>
          <p class="t2">Artist</p>
          <p class="t3">Cat owners and non-professional drawing.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";

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

    h1 {
      font-size: 3vw;
      font-weight: 1000;
      text-transform: uppercase;
    }
    .team {
      display: flex;
      width: 100%;
      .team-item {
        width: 15vw;
        text-align: center;
        margin-right: 5vw;
        img {
          width: 100%;
          border-radius: 100%;
          border: 0.5vw solid $primaryGreen;
        }
        .t1 {
          font-size: 2vw;
          font-weight: 1000;
          margin: 1vw 0;
        }
        .t2 {
          font-size: 1.5vw;
          line-height: 1.5;
          font-weight: bold;
        }
        .t3 {
          font-size: 1vw;
          line-height: 1.5;
          text-align: justify;
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

      h1 {
        font-size: 40px;
        font-weight: 1000;
        text-transform: uppercase;
      }
      .team {
        display: flex;
        justify-content:center;
        flex-wrap: wrap;
        width: 100%;
        .team-item {
          width: 70%;
          text-align: center;
          margin-right: 0;
          margin-bottom: 5vh;
          img {
            width: 100%;
            border-radius: 100%;
            border: 0.5vw solid $primaryGreen;
          }
          .t1 {
            text-transform: uppercase;
            font-size: 28px;
            font-weight: 1000;
            margin: 1vw 0;
            line-height: 1.5;
          }
          .t2 {
            font-size: 28px;
            line-height: 1.5;
            font-weight: bold;
          }
          .t3 {
            font-size: 18px;
            line-height: 1.5;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>