<template>
    <div
        class="container fixed h-20 w-5/6 bg-[#fafafa] bottom-12 drop-shadow-xl flex items-center justify-between px-28 z-[10] left-1/2 -translate-x-1/2">
        <div class="h-1/2 cursor-pointer" @click="goSlide(0)">
            <img class="h-full logo" src="@/assets/logo.gif" alt="">
        </div>
        <div class="link uppercase flex gap-2">
            <a class="px-2 py-1 border-transparent hover:text-gray-400 transition-all border-b"
                :target="link.link != '#' ? '_blank' : ''" @click="goSlide(link.id)"
                v-bind:class="{ 'border-black': store.state.currentSlideIndex == link.id }" :href="link.link"
                v-for="link in links">{{
                        link.name
                }}</a>
        </div>
        <!-- Babys -->
        <!-- <img class="z-[5] w-40 right-[6%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/1.png">
        <img class=" z-[4] w-40 right-[12%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/2.png">
        <img class="z-[3] w-40 right-[18%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/3.png">
        <img class="z-[2] w-40 right-[24%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/5.png">
        <img class="z-[1] w-40 right-[30%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/4.png"> -->
    </div>
</template>

<style lang="scss" scoped>
.logo {
    filter: invert(100%) sepia(6%) saturate(19%) hue-rotate(275deg) brightness(114%) contrast(96%);
}
</style>

<script setup>
import store from "@/store"

import { ref } from 'vue';

const links = ref([
    {
        id: 0,
        name: "intro",
        link: '#'
    },
    {
        id: 1,
        name: "culture",
        link: '#'
    },
    {
        id: 2,
        name: "art",
        link: '#'
    },
    {
        id: 3,
        name: "mint",
        link: '#'
    },
    {
        id: 4,
        name: "OS",
        link: 'https://opensea.io/collection/nextgenbaby'
    },
    {
        id: 4,
        name: "OS(Glitched)",
        link: 'https://opensea.io/collection/glitchbaby'
    }
])

const goSlide = (idx) => {
    // console.log(idx);
    store.state.splide.go(idx)
}
</script>