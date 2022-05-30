<template>
  <S1 />
  <S3 />
</template>

<script>
import { defineComponent } from "vue"
import S1 from "@/views/section/s1.vue"
import S3 from "@/views/section/s3.vue"

export default defineComponent({
  name: "Home",
  components: {
    S1,
    S3,
  },
  setup() {},
})
</script>

<style lang="scss"></style>
