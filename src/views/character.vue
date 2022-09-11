<template>
    <div
        class="fixed w-[90%] h-[90%] z-[100] overflow-y-auto backdrop-blur-xl bg-[rgba(255,255,255,0.85)] left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] rounded-xl font-['Blocktopia'] p-6 md:p-10 md:pb-16">

        <div class="mx-auto flex items-center justify-center text-black">
            <img class="w-12 md:w-12 2xl:w-12 logo" src="@/assets/logo.gif" alt="" srcset="">
            <div class="text-2xl">Character TOKEN</div>
        </div>

        <div class="text-center text-sm md:text-md 2xl:text-lg w-full text-gray-600 my-4">
            The character traits shown like these,<br />
            Characters will be able to display or use in the game which with different skills and stats or more hidden ability.<br/>
            All of characters in your wallet can be seleted to play, but only 1 character choose to login.
        </div>

        <div>
            <img class="max-h-32 mx-auto" src="@/assets/character.png" alt="" srcset="">
        </div>

        <div
            class="md:basis-1/3 flex flex-col md:flex-row md:items-end justify-between 2xl:justify-center items-center mt-8 2xl:mt-16 px-0 md:px-6 gap-4 2xl:gap-8 w-full md:w-auto">
            <div class="border-[#603a18] border-8 px-4 py-4">
                <div v-for="item in info"
                    class="flex items-center justify-between text-md md:text-md 2xl:text-2xl text-[#603a18] w-full md:w-[320px] 2xl:w-[600px]">
                    <div class="basis-1/2 text-left underline whitespace-nowrap">{{item.title}}</div>
                    <div class="basis-full text-right">{{item.content}}</div>
                </div>
            </div>
            <Sale />
        </div>


    </div>
</template>

<script setup>
import Sale from './mint/sale.vue';

const info = [
    {
        title: 'Token name :',
        content: 'Not a land (Character) (NAL-C)'
    },
    {
        title: 'Blockchain :',
        content: 'ETH - ERC721A'
    },
    {
        title: 'Max Supply :',
        content: '8888 + 1111 (Genesis claim reserved)'
    },
    {
        title: 'Price :',
        content: '0.003'
    },
    {
        title: 'Max mint :',
        content: '20'
    },
    {
        title: 'Team reserve :',
        content: '100'
    },
    {
        title: 'Reveal Time :',
        content: 'To be announce'
    },
]
</script>