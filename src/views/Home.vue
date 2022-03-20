<template>
  <S1 />
  <S2 />
  <S3 />
  <S4 />
</template>

<script>
import {
  defineComponent,
} from "vue";
import S1 from "@/views/section/s1.vue";
import S2 from "@/views/section/s2.vue";
import S3 from "@/views/section/s3.vue";
import S4 from "@/views/section/s4.vue";

export default defineComponent({
  name: "Home",
  components: {
    S1,
    S2,
    S3,
    S4
  },
  setup() {
  },
});
</script>

<style lang="scss">
</style>
