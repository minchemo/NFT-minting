<template>
  <div id="router-view" class="transition-all duration-1000 relative bg-[#aad999]">
    <router-view></router-view>
  </div>
  <div class="alert-bottom alert shadow-lg fixed z-[100] bottom-40 font-['joystix'] w-1/2" data-aos="zoom-in"
    v-if="store.state.showAlert">
    <div>{{ store.state.alertMsg}}</div>
    <div class="flex-none">
      <button class="btn btn-sm btn-ghost text-red-500"
        @click="store.dispatch('setStateData', { name: 'showAlert', data: false })">Close</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .alert-bottom {
    width: 600px;
    left: 50%;
    margin-left: -300px;
  }
  
  @media screen and (max-width: 768px) {
    .alert-bottom {
      width: 90%;
      margin-left: -45%;
    }
  }
  </style>

<script setup>

import store from "@/store"

</script>