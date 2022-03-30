<template>
  <S1 />
  <S2 />
  <S3 />
  <S4 />
  <S5 />
  <S6 />
  <S7 />
</template>

<script>
import {
  defineComponent,
} from "vue";
import S1 from "@/views/section/s1.vue";
import S2 from "@/views/section/s2.vue";
import S3 from "@/views/section/s3.vue";
import S4 from "@/views/section/s4.vue";
import S5 from "@/views/section/s5.vue";
import S6 from "@/views/section/s6.vue";
import S7 from "@/views/section/s7.vue";

export default defineComponent({
  name: "Home",
  components: {
    S1,
    S2,
    S3,
    S4,
    S5,
    S6,
    S7
  },
  setup() {
  },
});
</script>

<style lang="scss">
</style>
