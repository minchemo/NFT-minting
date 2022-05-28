<template>
  <div
    @click="hide()"
    class="flex-wrap hover:cursor-pointer hover:opacity-40 z-50 transition-all rounded-full duration-500 flex items-center gap-4 w-auto h-30 fixed left-1/2 -translate-x-1/2 bottom-40 bg-white text-black shadow-lg px-4 py-4 rounded-xl flex"
    v-bind:class="{
      '-translate-y-[100%]': store.state.toast.show,
      'translate-y-[500%]': !store.state.toast.show,
    }"
  >
    <div
      class="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-700 text-white"
    >
      <font-awesome-icon :icon="['fa', 'exclamation']" />
    </div>
    <p class="font-['nunito'] font-regular">{{ store.state.toast.msg }}</p>
  </div>
</template>

<script setup>
import store from "@/store"
const hide = () => {
  store.dispatch("setStateData", {
    name: "setToast",
    data: {
      show: false,
      msg: store.state.toast.msg,
    },
  })
}
</script>
