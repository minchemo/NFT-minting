<template>
  <Nav />
  <router-view></router-view>
</template>

<script>
import Nav from "@/components/nav.vue";
export default {
  components: {
    Nav,
  },
  setup() {},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700;900&display=swap');
</style>
