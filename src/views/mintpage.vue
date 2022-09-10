<template>
    <div
        class="fixed w-[90%] h-[90%] z-[100] overflow-y-auto backdrop-blur-xl bg-[rgba(255,255,255,0.85)] left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] rounded-xl font-['Blocktopia'] p-6 md:p-10 md:pb-16">

        <div class="mx-auto flex items-center justify-center text-black">
            <img class="w-12 md:w-12 2xl:w-12 logo" src="@/assets/logo.gif" alt="" srcset="">
            <div class="text-2xl">MINT PAGE</div>
        </div>

        <div class="text-center text-sm md:text-md 2xl:text-lg w-full text-gray-600 my-4">
            The token uri was overrided for our token logic and all metadatas was generated onchain, you can read our
            verified code on <a target="_blank" href="https://etherscan.io/address/0xd590aaf48eae15c9ba0e893692e0d639869272ba" class="underline">Etherscan</a>.
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 md:grid-cols-8 lg:grid-cols-10 2xl:grid-cols-10 gap-y-4">
            <div v-for="img in images" class="text-center text-black">
                <img class="w-full hover:scale-[105%] transition-all" :src="img.img" alt="" srcset="">
                <p class="text-sm lg:text-md my-2">{{img.name}}</p>
                <p class="text-md bg-[#ffde36] inline px-2 py-1 rounded-full">{{ ((img.chance / 51) * 100).toFixed(2) }}
                    %</p>
            </div>
        </div>

        <div
            class="md:basis-1/3 flex flex-col md:flex-row md:items-end justify-between 2xl:justify-center items-center mt-8 2xl:mt-16 px-0 md:px-6 gap-4 2xl:gap-8 w-full md:w-auto">
            <div class="border-[#603a18] border-8 px-4 py-4">
                <div v-for="item in info"
                    class="flex items-center justify-between text-md md:text-md 2xl:text-2xl text-[#603a18] w-full md:w-[320px] 2xl:w-[600px]">
                    <div class="basis-1/2 text-left underline">{{item.title}}</div>
                    <div class="basis-full text-right">{{item.content}}</div>
                </div>
            </div>
            <Sale/>
        </div>


    </div>
</template>

<script setup>
import Sale from './mint/sale.vue';

const images = [
    {
        img: new URL('../assets/tokens/grass.gif', import.meta.url).href,
        chance: 1,
        name: 'River area'
    },
    {
        img: new URL('../assets/tokens/ground.gif', import.meta.url).href,
        chance: 1,
        name: 'Ground area'
    },
    {
        img: new URL('../assets/tokens/snow.gif', import.meta.url).href,
        chance: 1,
        name: 'Snow area'
    },
    {
        img: new URL('../assets/tokens/c_character.gif', import.meta.url).href,
        chance: 2,
        name: 'Character'
    },
    {
        img: new URL('../assets/tokens/c_bags.png', import.meta.url).href,
        chance: 3,
        name: 'Mystery bag'
    },
    {
        img: new URL('../assets/tokens/c_pet.png', import.meta.url).href,
        chance: 3,
        name: 'Pet'
    },
    {
        img: new URL('../assets/tokens/c_grass.png', import.meta.url).href,
        chance: 4,
        name: 'Grass brick'
    },
    {
        img: new URL('../assets/tokens/c_ground.png', import.meta.url).href,
        chance: 4,
        name: 'Sand brick'
    },
    {
        img: new URL('../assets/tokens/c_rock.png', import.meta.url).href,
        chance: 4,
        name: 'Rock brick'
    },
    {
        img: new URL('../assets/tokens/c_coin.gif', import.meta.url).href,
        chance: 7,
        name: 'Coin'
    },
    {
        img: new URL('../assets/tokens/c_food.png', import.meta.url).href,
        chance: 7,
        name: 'Food'
    },
    {
        img: new URL('../assets/tokens/c_tool.png', import.meta.url).href,
        chance: 7,
        name: 'Tool'
    },
    {
        img: new URL('../assets/tokens/c_weapon.png', import.meta.url).href,
        chance: 7,
        name: 'Weapon'
    },
]

const info = [
    {
        title: 'Token name :',
        content: 'Not a land (NAL)'
    },
    {
        title: 'Blockchain :',
        content: 'ETH - ERC721A'
    },
    {
        title: 'Max Supply :',
        content: '3333'
    },
    {
        title: 'Free mint :',
        content: '333 (max 1)'
    },
    {
        title: 'Public mint :',
        content: '0.012 ETH (max 2)'
    },
    {
        title: 'Max mint :',
        content: '2 (Free + Public)'
    },
    {
        title: 'Team reserve :',
        content: '10'
    },
    {
        title: 'Reveal Time :',
        content: 'Instantly (onchain)'
    },
]
</script>