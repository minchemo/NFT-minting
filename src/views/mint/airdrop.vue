<template>
  <div
    class="mx-auto flex flex-col lg:flex-row items-center justify-center h-60 uppercase text-2xl lg:text-4xl font-black font-['nunito'] gap-8 lg:text-left text-center"
  >
    <font-awesome-icon :icon="['fa', 'rocket']" class="flutter" /> Airdrop is
    ready to launch !
  </div>
</template>

<style lang="scss">
.flutter {
  animation: flutter 0.1s infinite alternate-reverse;
  @keyframes flutter {
    from {
      transform: translateX(2px);
    }
    to {
      transform: translate(0, 0px);
    }
  }
}
</style>

<script setup>
import { onMounted, ref } from "vue"

onMounted(() => {})
</script>
