<template>
  <div class="w-full bottom-12 px-24 absolute">
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
      "
    >
      <div class="flex items-end">
        <div class="text-5xl font-black mr-2">jidori</div>
        <div class="text-sm pb-1 font-thin">手描きの自撮りNFT</div>
      </div>
      <div class="flex flex-col items-end">
        <div class="text-xs font-thin text-center flex gap-1">
          <a
            class="
              py-2
              px-2
              rounded-md
              hover:bg-cyan-800
              transition
              tracking-wider
            "
            href="#"
          >
            <font-awesome-icon :icon="['fab', 'discord']" />
          </a>
          <a
            class="
              py-2
              px-4
              rounded-md
              hover:bg-cyan-800
              transition
              tracking-wider
            "
            href="#"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" />
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
            "
            v-bind:class="{
              'bg-cyan-800': router.currentRoute.value.path == route.path,
            }"
            :to="route.path"
            >{{ route.name }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  setup() {
    return {
      router,
    };
  },
};
</script>