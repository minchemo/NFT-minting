<template>
  <S1 />
  <S2 />
  <S3 />
  <S4 />
</template>

<script>
import { defineComponent } from "vue";
import S1 from "@/views/section/s1.vue";
import S2 from "@/views/section/s2.vue";
import S3 from "@/views/section/s3.vue";
import S4 from "@/views/section/s4.vue";
import { useMeta } from "vue-meta";

export default defineComponent({
  name: "Home",
  components: {
    S1,
    S2,
    S3,
    S4
  },
  setup() {
    useMeta({
      title: "",
      htmlAttrs: { lang: "en", amp: false },
    });
  },
});
</script>

<style lang="scss">
</style>
