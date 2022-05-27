<template>
  <div
    class="fixed w-screen h-screen bg-jidori z-50 flex flex-col items-center justify-center transition-all duration-1000 text-white uppercase font-['Nunito']"
    v-bind:class="{ hide: !store.state.loading }">
    <div class="text-5xl font-black drop-shadow-md" data-aos="fade">
      jidori 自撮り
    </div>
    <div class="text-xl font-normal mt-12" data-aos="fade" data-aos-delay="200">
      Your web3 selfie
    </div>
  </div>
  <div id="router-view" class=" transition-all duration-1000 relative" v-bind:class="{
    'bg-sky-100': router.currentRoute.value.path == '/timeline',
    'bg-white': router.currentRoute.value.path == '/gallery',
    'bg-orange-100': router.currentRoute.value.path == '/mint',
  }">
    <Nav />
    <router-view class="container"></router-view>
  </div>
</template>

<style lang="scss" scoped>
.bg-jidori {
  background-image: url("@/assets/bg.jpg");
  background-size: cover;

  &.hide {
    transform: translateY(100%);
  }
}

@media screen and (max-width: 500px) {
  .bg-jidori {
    background-image: url("@/assets/bg_m.jpg");
  }
}
</style>

<script>
import router from "@/router"
import store from "@/store"
import Nav from "@/components/nav.vue"
import AOS from "aos"
import { onMounted } from "vue"
export default {
  components: {
    Nav,
  },
  setup() {
    setTimeout(() => {
      store.dispatch("setStateData", { name: "setLoading", data: false })
    }, 3000)

    onMounted(() => {
      AOS.init()
    })

    return {
      store,
      router,
    }
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700;900&family=Open+Sans:wght@300;500;700&display=swap");
</style>
