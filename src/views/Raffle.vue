<template>
  <div class="section" id="raffle">
    <div class="main">
      <h1>{{ $t("raffle.title") }}</h1>
      <p v-html="$t('raffle.desc')"></p>
      <input
        autocomplete
        class="email-input"
        type="text"
        v-model="inputEmail"
        :placeholder="$t('raffle.input_placeholder')"
      />
      <div class="error-msg" v-if="returnMsg != ''">{{ returnMsg }}</div>
      <div class="send-verify" @click="startVerify()" v-if="!loading">
        {{ $t("raffle.send") }}
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useMeta } from "vue-meta";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  getCurrentInstance,
  nextTick,
  defineComponent,
  onMounted,
  watch,
  inject,
  ref,
} from "vue";

import useEthereum from "@/utils/useEthereum";
import useEmail from "@/utils/email";

export default defineComponent({
  name: "raffle",
  components: {},
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const inputEmail = ref("");
    const returnMsg = ref("");
    const loading = ref(false);
    const { send, verify } = useEmail();

    const validateEmail = (email) => {
      /* eslint-disable no-useless-escape */
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    const startVerify = async () => {
      if (!validateEmail(inputEmail.value)) {
        returnMsg.value = "Email 格式錯誤";

        setTimeout(() => {
          returnMsg.value = "";
        }, 1000);
        return;
      }

      loading.value = true;

      returnMsg.value = "請稍候，信件發送中";
      let res = await send(inputEmail.value);

      if (res.code == 10) {
        returnMsg.value = "信件已發送，請前往收件夾驗證";
        setTimeout(() => {
          returnMsg.value = "";
        }, 3000);
      } else if (res.code == 1) {
        returnMsg.value = "此信箱已經驗證過";
        setTimeout(() => {
          returnMsg.value = "";
        }, 3000);
      }

      loading.value = false;
    };

    const processUrl = async () => {
      let url = window.location.href;
      let continueUrl = new URL(url);
      let method = continueUrl.searchParams.get("method");

      if (method == "verify") {
        let parms = new URL(continueUrl);
        const email = parms.searchParams.get("email");
        const token = parms.searchParams.get("token");

        if (email && token) {
          inputEmail.value = email;
          returnMsg.value = "信箱驗證中，請稍候";
          loading.value = true;

          let res = await verify(email, token);

          loading.value = false;

          if (res.code == 1) {
            returnMsg.value = "信箱已驗證，請先加入 Discord 群組，抽獎結果將於 Discord 公告，亦發送至中獎信箱以完成後續錢包地址登記。";
          } else if (res.code == 2) {
            returnMsg.value = "信箱不存在";
          } else if (res.code == 3) {
            returnMsg.value = "驗證失敗，請重新申請一次";
          } else if (res.code == 0) {
            returnMsg.value = "驗證失敗，請重新申請一次";
          } 

        }
      }
    };

    onMounted(() => {
      processUrl();
    });

    return {
      store,
      returnMsg,
      inputEmail,
      startVerify,
      loading,
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url("~@/views/section/raffle/bg.svg");
  background-size: cover;
  color: #fff;
  font-family: $font1;
  .main {
    text-align: center;
    h1 {
      font-size: 48px;
      font-weight: 600;
      text-transform: uppercase;
      margin: 30px 0;
    }
    p {
      font-size: 18px;
      line-height: 1.5;
      text-align: left;
      font-weight: 300;
    }
    .email-input {
      margin-top: 1vw;
      background: rgba($color: #fff, $alpha: 0.5);
      padding: 1vw;
      font-size: 20px;
      width: 100%;
      font-weight: 300;
      letter-spacing: 1.5px;
    }
    .error-msg {
      line-height: 1.5;
      margin-top: 1vw;
      color: $primaryYellow;
    }
    .send-verify {
      display: inline-block;
      padding: 1vw;
      margin-top: 1vw;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 5px;
      background: rgba($color: $primaryBlue, $alpha: 1);
      transition: all 0.5s;

      &:hover {
        cursor: pointer;
        border-radius: 20px;
        background: rgba($color: $primaryBlue, $alpha: 0.7);
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .section {
    .main {
      text-align: center;
      padding: 0 30px;
      h1 {
        font-size: 24px;
        font-weight: 600;
        text-transform: uppercase;
        margin: 20px 0;
      }
      p {
        font-size: 14px;
        line-height: 2;
        text-align: left;
        font-weight: 300;
      }
      .email-input {
        margin-top: 30px;
        padding: 10px;
      }
      .error-msg {
        margin: 10px 0;
      }
      .send-verify {
        padding: 10px;
        margin-top: 30px;

        &:hover {
          cursor: pointer;
          border-radius: 0;
          background: rgba($color: $primaryBlue, $alpha: 0.7);
        }
      }
    }
  }
}
</style>
