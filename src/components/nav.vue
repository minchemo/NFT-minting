<template>
  <div
    class="container mx-auto w-full bottom-0 lg:pb-8 fixed inset-x-0 z-10 backdrop-blur-lg"
  >
    <div
      class="bg-cyan-700 py-2 lg:py-4 lg:px-10 px-4 rounded-none lg:rounded-xl uppercase font-['Nunito'] flex flex-col lg:flex-row text-white items-center justify-center lg:justify-between drop-shadow-lg relative"
    >
      <div class="flex items-end">
        <div class="text-2xl lg:text-5xl font-black mr-2">jidori</div>
        <div class="text-sm pb-1 font-thin">手描きの自撮りNFT</div>
      </div>
      <div
        class="font-thin text-center flex gap-1 flex-wrap lg:flex-nowrap py-1 lg:py-0"
      >
        <a
          class="py-2 px-2 rounded-md hover:text-black transition tracking-wider lg:mr-2 text-xs"
          :href="link.link"
          v-for="(link, i) in socialLinks"
          :key="i"
          target="_blank"
          v-if="!$isMobile()"
        >
          <font-awesome-icon :icon="link.icon" />
        </a>
        <router-link
          v-for="(route, i) in router.options.routes"
          :key="i"
          class="py-1 lg:py-2 px-4 rounded-md hover:bg-cyan-800 transition tracking-wider text-xs"
          v-bind:class="{
            'bg-cyan-900': router.currentRoute.value.path == route.path,
          }"
          :to="route.path"
          >{{ route.name }}</router-link
        >
      </div>
      <div
        class="font-thin text-center flex gap-1 flex-wrap lg:flex-nowrap"
        v-if="$isMobile()"
      >
        <a
          class="py-1 lg:py-2 px-2 rounded-md hover:text-black transition tracking-wider text-xs"
          :href="link.link"
          v-for="(link, i) in socialLinks"
          :key="i"
          target="_blank"
        >
          <font-awesome-icon :icon="link.icon" />
        </a>
      </div>

      <img
        class="absolute right-0 top-0 -translate-y-[100%] w-24 lg:w-40 drop-shadow-lg"
        :src="boyImg"
        alt=""
        srcset=""
      />
      <img
        class="absolute right-12 lg:right-16 top-0 -translate-y-[100%] w-20 lg:w-36 drop-shadow-lg"
        :src="girlImg"
        alt=""
        srcset=""
      />
    </div>
  </div>
</template>

<script setup>
import router from "@/router"
import { ref } from "vue"
const socialLinks = ref([
  {
    link: "https://opensea.io/collection/jidori",
    icon: ["fa", "water"],
  },
  {
    link: "https://discord.gg/yFsaAFCJr2",
    icon: ["fab", "discord"],
  },
  {
    link: "https://twitter.com/Jidorinft",
    icon: ["fab", "twitter"],
  },
])
const boyImg = new URL("../assets/boys/4.png", import.meta.url).href
const girlImg = new URL("../assets/girls/1.png", import.meta.url).href
</script>
