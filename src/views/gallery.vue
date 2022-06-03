<template>
  <div class="fixed top-0 left-0 w-screen h-1 bg-white z-50">
    <div
      class="absolute h-full top-0 left-0 bg-cyan-800 transition-all"
      v-bind:style="{ width: `${progress}%` }"
    ></div>
  </div>
  <div class="container mx-auto h-full flex flex-col pb-40">
    <PageTitle title="gallery ギャラリー" subtitle="Jidori artworks" />

    <div
      class="flex px-8 pb-8 items-center justify-center lg:justify-between flex-wrap lg:flex-nowrap"
    >
      <div class="w-full flex gap-2 lg:gap-8 flex-col lg:flex-row">
        <!-- <div class="w-full lg:w-full lg:w-1/6" >
          <div
            class="font-['Nunito'] h-12 bg-cyan-700 rounded-xl flex items-center justify-center uppercase text-white font-black gap-4 hover:bg-cyan-900 hover:cursor-pointer"
          >
            <font-awesome-icon :icon="['fa', 'layer-group']" />
            <p>my jidori</p>
          </div>
        </div> -->
        <div class="w-full lg:w-1/6">
          <div
            @click="isGirl = !isGirl"
            v-bind:class="{
              'bg-white': isGirl,
              'text-black': isGirl,
              'border-2': isGirl,
              'bg-black': !isGirl,
              'text-white': !isGirl,
            }"
            class="font-['Nunito'] h-12 rounded-xl flex items-center justify-center uppercase font-black hover:cursor-pointer hover:scale-105 transition-all"
          >
            <font-awesome-icon :icon="['fa', 'arrow-right-arrow-left']" />
            <p class="text-lg ml-4 mr-1">{{ isGirl ? "Girl" : "Boy" }}</p>
            <p class="text-sm font-thin">/ {{ !isGirl ? "Girl" : "Boy" }}</p>
          </div>
        </div>
        <div class="w-full lg:w-auto">
          <div
            @click="shuffle(true)"
            class="h-12 rounded-xl flex items-center justify-center uppercase font-black gap-4 hover:cursor-pointer hover:scale-105 transition-all"
          >
            <font-awesome-icon :icon="['fa', 'repeat']" />
          </div>
        </div>
      </div>
      <div
        class="font-black font-['Open_sans'] text-5xl text-gray-300 whitespace-nowrap"
      >
        3950
      </div>
    </div>

    <div
      class="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 px-8 pb-8"
      :key="reloadTs"
      ref="gallery"
    >
      <template v-for="i in ids.slice(0, items)">
        <div>
          <div
            class="lazy w-full aspect-square bg-cover rounded-2xl shadow-ji hover:border-gray-700 transition-all border-4 border-white bg-gray-100"
            :data-bg="`https://jidori-nft.com/${isGirl ? 'girls' : 'boys'}/${
              i - 1
            }.jpg`"
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
import { onMounted, ref, watch } from "vue"
import PageTitle from "@/components/pagetitle.vue"
import LazyLoad from "vanilla-lazyload"
import store from "@/store"
const reloadTs = ref(Date.now())
const ids = ref(Array.from(Array(3950).keys()))
const items = ref(49)
const isGirl = ref(true)
const gallery = ref(null)
const progress = ref(0)

let galleryLazyload

watch(isGirl, (isGirl, prevIsGirl) => {
  if (!isGirl) {
  }

  reset()
})

const shuffle = (force) => {
  let array = ids.value
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  ids.value = array

  if (force) {
    reset()
  }
}

const reset = () => {
  progress.value = 0
  items.value = 49
  reloadTs.value = Date.now()
  window.scrollTo({ top: 0, behavior: "smooth" })
  setTimeout(() => {
    galleryLazyload.update()
  }, 100)
}

const setProgress = () => {
  progress.value = (items.value / 3950) * 100
}

const listenScroll = () => {
  document.getElementsByTagName("body")[0].onscroll = () => {
    if (
      window.innerHeight + window.scrollY + 100 >=
      document.body.offsetHeight
    ) {
      setTimeout(() => {
        if (items.value + 49 >= 3950) {
          items.value = 3950
        } else {
          items.value += 49
        }
        setProgress()
      }, 10)
      setTimeout(() => {
        galleryLazyload.update()
      }, 20)
    }
  }
}

onMounted(() => {
  shuffle()
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
  animation: fade 0.4s;

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
}
</style>
