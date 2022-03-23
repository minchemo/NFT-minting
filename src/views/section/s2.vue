<template>
  <div class="section" id="s2">
    <div class="main"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "s2",
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/variable.scss";

.section {
  position: relative;
  width: 100%;
  height: 100vh;
  .main{
    position: absolute;
    width: 95%;
    height: 100%;
    background: #eee;
    right: 0;
    bottom: 0;
  }
}
</style>