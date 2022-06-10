<template>
  <div
    class="w-screen h-screen flex flex-col pb-40 bg-black items-center justify-center font-['Cabin_Sketch']"
  >
    <Connect v-if="store.state.connectedAddress == ''" />
    <Sale class="z-10" />
    <div
      class="z-10 text-xl text-white uppercase mt-10 text-center leading-relaxed"
    >
      no one was defined in this world<br />undefined ghosts, too
    </div>
    <img
      class="w-1/2 md:w-1/5 absolute right-0 bottom-0"
      src="@/assets/150.png"
      alt=""
      srcset=""
    />
    <img
      class="w-1/3 md:w-1/5 absolute left-0 top-0 scale-x-[-1]"
      src="@/assets/138.png"
      alt=""
      srcset=""
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import store from "@/store"
import Connect from "./mint/connect.vue"

import useEthereum from "@/utils/useEthereum"
import Sale from "./mint/sale.vue"
const { init } = useEthereum()

onMounted(() => {
  init()
})
</script>
