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
      <div class="send-verify" @click="startVerify()">
        {{ $t("raffle.send") }}
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
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
import useFirebase from "@/utils/firebase";

export default defineComponent({
  name: "raffle",
  components: {},
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const inputEmail = ref('');
    const returnMsg = ref('');
    const { isSignIn, verifyEmail, signInEmail } = useFirebase();

    const validateEmail = (email) => {
      /* eslint-disable no-useless-escape */
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    const startVerify = async () => {
      if (!inputEmail.value) {
        returnMsg.value = t("raffle.msg1");
        return
      } else if (!validateEmail(inputEmail.value)) {
        returnMsg.value = t("raffle.msg2");
        setTimeout(() => {
          returnMsg.value = ''
        }, 2000);
        return;
      }

      let emailProviders = await isSignIn(inputEmail.value);

      if (emailProviders.indexOf("emailLink") >= 0) {
        returnMsg.value = t("raffle.msg6")
        setTimeout(() => {
          returnMsg.value = ''
        }, 5000);
      } else {
        returnMsg.value = t("raffle.msg3")
        let res = await verifyEmail(inputEmail.value);

        if (res) {
          returnMsg.value = t("raffle.msg4")
          alert(t("raffle.msg4"));
        } else {
          returnMsg.value = t("raffle.msg5")
          alert(t("raffle.msg5"));
        }
      }
    }

    const processUrl = async () => {
      let url = window.location.href;
      let continueUrl = new URL(url);
      continueUrl = continueUrl.searchParams.get("continueUrl");

      if (continueUrl) {
        let parms = new URL(continueUrl);
        const method = parms.searchParams.get('method');
        const email = parms.searchParams.get('email');

        if (method == 'verify' && email) {
          inputEmail.value = email;
          let res = await signInEmail(email)
          returnMsg.value = res
        }
      }

    }

    onMounted(() => {
      processUrl()
    })

    return {
      store,
      returnMsg,
      inputEmail,
      startVerify,
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
      margin-top: 1vw;
      color: $primaryRed;
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
</style>
