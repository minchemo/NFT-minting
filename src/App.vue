<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/views/layout/header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

