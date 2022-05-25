<template>
  <div class="w-screen h-screen transition-all duration-1000" v-bind:class="{
    'bg-sky-100': router.currentRoute.value.path == '/timeline',
    'bg-amber-100': router.currentRoute.value.path == '/gallery',
    'bg-orange-100': router.currentRoute.value.path == '/mint',
  }">
    <Nav />
    <router-view class="container mx-auto"></router-view>
  </div>
</template>


<script>
import router from "@/router";
import Nav from "@/components/nav.vue";
export default {
  components: {
    Nav,
  },
  setup() {

    return {

      router,
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700;900&family=Open+Sans:wght@300;500;700&display=swap');
</style>
