<template>
    <div class="flex items-center justify-center mt-4 gap-2 flex-wrap">
        <div class="font-['Nunito'] uppercase font-black text-black rounded-xl">
            You can claim <span class="font-black text-red-600">{{ ownList.length }} x boys</span>
        </div>
        <div @click="checkAll()"
            class="hover:cursor-pointer hover:opacity-75 flex gap-2 text-xs items-center whitespace-nowrap uppercase py-1 px-3 bg-orange-700 text-white rounded-full font-black">
            <font-awesome-icon :icon="['fa', 'check-double']" />
            <p>all</p>
        </div>
        <div class="w-full text-sm text-center text-gray-600">For saving you gas fee, we recommend to cliam all at once.</div>
    </div>
    <div class="font-['Nunito'] flex items-start gap-8">
        <div class="gap-2 rounded-xl flex w-full text-md text-black flex-wrap">
            <template v-for="id in ownList">
                <div @click="addToClaim(id)"
                    class="relative flex items-center gap-2 px-2 py-2 rounded-md hover:cursor-pointer hover:-translate-y-1 transition-all"
                    v-bind:class="{
                        'text-white': claimList.includes(id),
                        'bg-orange-700': claimList.includes(id),
                        'border-transparent': !claimList.includes(id),
                    }">
                    <img class="w-8 h-8 object-cover rounded-full" :src="`https://jidori-nft.com/tokens/${id}.jpg`"
                        alt="" srcset="">
                    <p class="font-['Open_Sans'] font-black">#{{ id }}</p>
                </div>
            </template>
        </div>
    </div>
    <div class="w-auto
    mt-4
    mx-auto
    uppercase
    flex items-center gap-4
        transition-all
        text-md font-black  text-white p-4 rounded-xl 
        hover:-translate-y-1
         hover:cursor-pointer" v-bind:class="{
            'bg-cyan-700': claimList.length > 0,
            'bg-gray-300': claimList.length == 0
        }">
        <font-awesome-icon :icon="['fa', 'arrow-right']" />
        <p>claim now ({{claimList.length}})</p>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const ownList = ref([1234, 44, 231, 125, 67, 434, 22, 123, 12, 55, 33, 11, 66, 77, 30, 59, 23]);
const claimList = ref([]);

const addToClaim = (id) => {
    let idx = claimList.value.findIndex(e => e == id);
    if (idx >= 0) {
        claimList.value.splice(idx, 1)
    } else {
        claimList.value.push(id);
    }
}

const checkAll = () => {
    if (claimList.value.length == ownList.value.length) {
        claimList.value = [];
    } else {
        claimList.value = Array.from(ownList.value)
    }
}

const claimCheck = (id) => {

}
</script>