<template>
  <div
    id="router-view"
    class="transition-all duration-1000 relative"
    v-bind:class="{
      'bg-jidori': router.currentRoute.value.path == '/',
      'w-screen': router.currentRoute.value.path == '/',
      'h-screen': router.currentRoute.value.path == '/',
      'bg-sky-100': router.currentRoute.value.path == '/plan',
      'bg-white': router.currentRoute.value.path == '/gallery',
      'bg-orange-100': router.currentRoute.value.path == '/mint',
    }"
  >
    <Nav />
    <router-view class="container"></router-view>
  </div>
  <Toast />
</template>

<style lang="scss" scoped>
.bg-jidori {
  background-image: url("@/assets/bg.jpg");
  background-size: cover;
}

@media screen and (max-width: 500px) {
  .bg-jidori {
    background-image: url("@/assets/bg_m.jpg");
  }
}
</style>

<script setup>
import router from "@/router"
import store from "@/store"
import Nav from "@/components/nav.vue"
import Toast from "@/components/toast.vue"
import AOS from "aos"
import { onMounted } from "vue"

setTimeout(() => {
  store.dispatch("setStateData", { name: "setLoading", data: false })
}, 3000)

onMounted(() => {
  AOS.init()
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700;900&family=Open+Sans:wght@300;500;700&display=swap");
</style>
