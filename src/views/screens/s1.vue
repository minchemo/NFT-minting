<template>
    <div class="w-screen h-screen bg-[#bbb] flex items-center justify-center">
        <div class="flex w-full h-1/2 gap-8 items-start justify-between container bg-[#001357] drop-shadow-xl">
            <div class="relative h-full aspect-square text-center aspect-square overflow-hidden">
                <video class="h-full mx-auto" loop="true" autoplay="true" muted>
                    <source src="@/views/screens/s1/heart.mp4">
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
        delay: 0,
    });

    typewriter
        .typeString('<span class="text-red-500">[ Emergency ]</span><br/><br/>')
        .pauseFor(1000)
        .typeString('<span class="text-green-500">( heart-beat )</span><br/><br/>')
        .changeDelay(50)
        .pauseFor(1000)
        .typeString('<span class="text-yellow-200">Helper: </span>Dr. Raven, the heart of the next-generation baby has begun to beat.<br/>')
        .typeString('<span class="text-yellow-200">Helper: </span>What to do next?<br/><br/>')
        .pauseFor(1000)
        .typeString('<span class="text-yellow-500">Dr. Raven: </span>This is a great beginning, we need more fresh blood.<br/><br/>')
        .pauseFor(1000)
        .typeString('One month later...<br/><br/>')
        .pauseFor(1000)
        .typeString('<span class="text-yellow-500">Dr. Raven: </span>It seems that part of the heart is mutating.<br/>')
        .pauseFor(1000)
        .typeString('<span class="text-yellow-500">Dr. Raven: </span>...<br/>')
        .pauseFor(1000)
        .typeString('<span class="text-yellow-500">Dr. Raven: </span>This should just be normal, right ?<br/><br/>')
        .changeDelay(1)
        .pauseFor(1000)
        .typeString('<span class="text-green-500">( heart-beat )</span><br/>')
        .pauseFor(1000)
        .typeString('<span class="text-green-500">( heart-beat )</span><br/>')
        .pauseFor(500)
        .typeString('<span class="text-green-500">( heart-beat )</span><br/>')
        .pauseFor(200)
        .typeString('<span class="text-green-500">( heart-beat )</span><br/><br/>')
        .changeDelay(150)
        .pauseFor(1000)
        .typeString('<span class="text-red-500">[ Signal Lost ]</span>')
        .start();
})
</script>