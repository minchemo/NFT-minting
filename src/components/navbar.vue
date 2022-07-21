<template>
    <div data-aos="fade-left" data-aos-delay="200" data-aos-duration="500"
        class="container fixed h-20 w-5/6 bg-[#fafafa] bottom-12 drop-shadow-xl flex items-center justify-between px-28">
        <div class="h-1/2">
            <img class="h-full logo" src="@/assets/logo.gif" alt="">
        </div>
        <div class="link uppercase flex gap-2">
            <a class="px-2 py-1 border-transparent hover:text-blue-800 transition-all" :href="link.link"
                v-for="link in links">{{
                        link.name
                }}</a>
        </div>
        <!-- Babys -->
        <img class="z-[5] w-40 right-[6%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/1.png">
        <img class=" z-[4] w-40 right-[12%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/2.png">
        <img class="z-[3] w-40 right-[18%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/3.png">
        <img class="z-[2] w-40 right-[24%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/5.png">
        <img class="z-[1] w-40 right-[30%] absolute bottom-full -scale-x-100 drop-shadow-xl hover:z-10 hover:scale-125 origin-bottom transition-all"
            src="@/assets/preview/4.png">
    </div>
</template>

<style lang="scss" scoped>
.logo {
    filter: invert(100%) sepia(6%) saturate(19%) hue-rotate(275deg) brightness(114%) contrast(96%);
}
</style>

<script setup>
import { ref } from 'vue';

const links = ref([
    {
        name: "mint",
        link: '#'
    },
    {
        name: "culture",
        link: '#'
    },
    {
        name: "art",
        link: '#'
    },
    {
        name: "Twitter",
        link: '#'
    },
    {
        name: "opensea",
        link: '#'
    }
])
</script>