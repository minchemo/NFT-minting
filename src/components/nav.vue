<template>
  <div
    class="
      container
      mx-auto
      w-full
      bottom-0
      px-8
      pb-8
      fixed
      inset-x-0
      z-10
      backdrop-blur-lg
    "
  >
    <div
      class="
        bg-cyan-700
        py-4
        px-10
        rounded-xl
        uppercase
        font-['Nunito']
        flex
        text-white
        items-center
        justify-between
        drop-shadow-lg
      "
    >
      <div class="flex items-end">
        <div class="text-5xl font-black mr-2">jidori</div>
        <div class="text-sm pb-1 font-thin">手描きの自撮りNFT</div>
      </div>
      <div class="font-thin text-center flex gap-1">
        <a
          class="
            py-2
            px-2
            mr-2
            rounded-md
            hover:text-black
            transition
            tracking-wider
            mr-2
            text-xs
          "
          :href="link.link"
          v-for="(link, i) in socialLinks"
          :key="i"
          target="_blank"
        >
          <font-awesome-icon :icon="link.icon" />
        </a>
        <router-link
          v-for="(route, i) in router.options.routes"
          :key="i"
          class="
            py-2
            px-4
            rounded-md
            hover:bg-cyan-800
            transition
            tracking-wider
            mr-2
            text-xs
          "
          v-bind:class="{
            'bg-cyan-900': router.currentRoute.value.path == route.path,
          }"
          :to="route.path"
          >{{ route.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
const socialLinks = ref([
  {
    link: "https://opensea.io",
    icon: ["fab", "discord"],
  },
  {
    link: "https://opensea.io",
    icon: ["fab", "twitter"],
  },
]);
</script>
