<template>
  <div class="footer">
    <h2>台灣好覓</h2>
    <div class="social">
      官方網站：<a target="_blank" href="https://twgoodthing.io"
        >twgoodthing.io</a
      ><br />
      Facebook：<a
        target="_blank"
        href="https://www.facebook.com/twgoodthing.io"
        >www.facebook.com/twgoodthing.io</a
      ><br />
      LINE@：<a target="_blank" href="https://lin.ee/WSmEQbP">lin.ee/WSmEQbP</a
      ><br />
      Discord社群：<a target="_blank" href="https://discord.gg/vGEHGB2zaA"
        >discord.gg/vGEHGB2zaA</a
      ><br />
    </div>
    <p class="cp">Copyright © 2022 台灣好覓. All rights reserved.</p>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
.footer {
  border-top: 20px solid rgba(255, 255, 255, 0.14);
  background-color: $primaryLightBlue;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  padding: 5vw 0;
  // background-image: url("~@/views/layout/footer-bg.svg");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;;
  h2 {
    font-size: 3vw;
    font-weight: 1000;
    font-family: $font2;
  }
  .social {
    margin-top: 3vw;
    font-size: 1.25vw;
    font-family: $font2;
    font-weight: 100;
    line-height: 2;
    a {
      color: #fff;
    }
  }
  .cp {
    font-size: 1.2vw;
    margin-top: 5vw;
  }
}

@media screen and (max-width: 767px) {
  .footer {
    border-top: 1px solid $primaryYellow;
    background-color: $primaryLightBlue;
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    flex-direction: column;
    h2 {
      font-size: 32px;
      font-family: $font2;
    }
    .social {
      margin-top: 30px;
      font-size: 14px;
      font-family: $font2;
      font-weight: 100;
      line-height: 2;
      a {
        color: #fff;
      }
    }
    .cp {
      font-size: 14px;
      margin-top: 30px;
    }
  }
}
</style>