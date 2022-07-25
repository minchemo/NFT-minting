<template>
    <div class="w-screen h-screen bg-[#bbb] flex items-center justify-center">
        <div class="flex w-full h-1/2 gap-8 items-start justify-between container bg-black drop-shadow-xl">
            <div class="relative h-full aspect-square text-center aspect-square overflow-hidden">
                <video class="h-full mx-auto" loop="true" autoplay="true" muted>
                    <source src="@/views/screens/s1/glitch.mp4">
                </video>
            </div>
            <div class="text-white py-12 px-8 text-sm" id="typewriter">

            </div>
        </div>
    </div>
</template>

<style lang="scss">
video {
    clip-path: inset(1px 1px);
}
</style>

<script setup>
import Typewriter from 'typewriter-effect/dist/core';
import { onMounted } from 'vue';

onMounted(() => {

    var typewriter = new Typewriter('#typewriter', {
        loop: false,
        delay: 50,
    });

    typewriter
        .typeString('<span class="text-red-500">[ Emergency ]</span><br/><br/>')
        .pauseFor(1000)
        .typeString('<span class="text-yellow-200">Helper: </span>Dr. Raven, part of next-generation baby glitched.<br/><br/>')
        .pauseFor(1000)
        .typeString('<span class="text-yellow-500">Dr. Raven: </span>Maybe there is a genetic conflict.<br/><br/>')
        .pauseFor(1000)
        .typeString('<span class="text-yellow-500">Dr. Raven: </span>I will find out the cause of the failure within a month<br/><br/>')
        .pauseFor(1000)
        .typeString('<span>To be continued...</span><br/><br/>')
        .start();
})
</script>