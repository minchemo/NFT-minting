<template>
  <div class="container mx-auto h-full flex flex-col pb-40">
    <PageTitle title="gallery ギャラリー" subtitle="Jidori artworks" />

    <div class="flex px-8 mb-8 items-center justify-between">
      <div class="w-full flex gap-8">
        <div class="w-1/6">
          <div
            class="font-['Nunito'] h-12 bg-cyan-700 rounded-xl flex items-center justify-center uppercase text-white font-black gap-4 hover:bg-cyan-900 hover:cursor-pointer"
          >
            <font-awesome-icon :icon="['fa', 'layer-group']" />
            <p>my jidori</p>
          </div>
        </div>
        <div class="w-1/6">
          <div
            @click="isGirl = !isGirl"
            v-bind:class="{
              'bg-white': isGirl,
              'text-black': isGirl,
              'border-2': isGirl,
              'bg-black': !isGirl,
              'text-white': !isGirl,
            }"
            class="font-['Nunito'] h-12 rounded-xl flex items-center justify-center uppercase font-black gap-4 hover:cursor-pointer hover:scale-105 transition-all"
          >
            <font-awesome-icon :icon="['fa', 'arrow-right-arrow-left']" />
            <p>{{ isGirl ? "Girls" : "Boys" }}</p>
          </div>
        </div>
      </div>
      <div
        class="text-thin font-['Open_sans'] text-5xl text-gray-300 whitespace-nowrap"
      >
        3950
      </div>
    </div>

    <div
      class="scrollbar container mx-auto grid grid-cols-7 gap-6 h-full overflow-y-scroll px-8 pb-8"
      ref="galleryList"
      :key="isGirl"
    >
      <template v-for="i in items">
        <div>
          <div
            class="lazy w-full aspect-square bg-cover rounded-2xl shadow-ji hover:border-gray-700 transition-all border-4 border-white bg-gray-100"
            :data-bg="`https://jidori-nft.com/tokens/${i - 1}.jpg`"
          ></div>
          <p
            class="font-['Nunito'] uppercase text-sm text-gray-500 tracking-widest text-center pt-2 font-black"
          >
            Jidori
          </p>
          <p
            class="font-['Nunito'] uppercase text-sm text-gray-500 tracking-widest text-center font-thin"
          >
            # {{ i - 1 }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue"
import PageTitle from "@/components/pagetitle.vue"
import LazyLoad from "vanilla-lazyload"
const items = ref(49)
const isGirl = ref(true)
const maxSupply = 3950
const galleryList = ref(null)
let galleryLazyload

watch(isGirl, (isGirl, prevIsGirl) => {
  items.value = 49
  setTimeout(() => {
    listenScroll()
    galleryLazyload.update()
  }, 100)
})

const listenScroll = () => {
  galleryList.value.addEventListener("scroll", function (event) {
    const element = event.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setTimeout(() => {
        if (items.value + 49 >= 3950) {
          items.value = 3950
        } else {
          items.value += 49
        }
      }, 10)
      setTimeout(() => {
        galleryLazyload.update()
      }, 200)
    }
  })
}

onMounted(() => {
  galleryLazyload = new LazyLoad({
    elements_selector: ".lazy",
    class_loading: "lazy-loading",
    class_loaded: "lazy-loaded",
  })
  listenScroll()
})
</script>

<style lang="scss" scoped>
.lazy-loaded {
  animation: zoomIn 0.4s;

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
}
</style>
