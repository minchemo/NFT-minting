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
    <p class="cp">© 台灣好覓 2022</p>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";
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
    font-size: 2vw;
    font-family: $font2;
  }
  .social {
    margin-top: 3vw;
    font-size: 0.7vw;
    font-family: $font2;
    font-weight: 100;
    line-height: 2;
    a {
      color: #fff;
    }
  }
  .cp {
    margin-top: 2vw;
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