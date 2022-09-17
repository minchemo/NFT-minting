<template>
    <div class="w-screen h-screen bg-gray-200 relative font-['joystix']">
        <!-- nav -->
        <div class="absolute py-8 px-12 top-0 left-0 w-full text-white flex flex-col gap-4 md:flex-row items-center justify-between">
            <router-link to="/" class="btn btn-sm font-normal">Back to home</router-link>
            <div class="text-center">
                <div class="text-3xl font-['MK'] text-yellow-600">Tamagogi</div>
                <div class="text-sm text-black">dashboard</div>
            </div>
            <div class="btn btn-sm font-normal" v-if="store.state.connectedAddress == ''" @click="requestAccount()">
                connect wallet</div>
            <div class="text-black text-sm" v-else>
                {{ store.state.connectedAddress.substring(0,
                5)
                }}...{{ store.state.connectedAddress.substr(store.state.connectedAddress.length - 4) }}
            </div>
        </div>
        <!-- container -->

        <!-- not release -->
        <div class="container h-screen flex flex-col items-center justify-center mx-auto">
            <img class="w-28 rounded-xl" src="@/assets/props/unreveal.gif"
                alt="" srcset="">
            <div class="text-sm text-center mt-8">
                It's almost ready, being prepared for the final launch, twitter will have a announcement.
            </div>
        </div>
    </div>
</template>

<script setup>
import useEthereum from "@/utils/useEthereum"
import store from "@/store"
import { onMounted } from "vue";
const { init, requestAccount, getTokensOfOwner } = useEthereum()

// const props = ref([]);
// const pets = ref([]);

const getMyTokens = async () => {
    const tokens = await getTokensOfOwner(store.state.connectedAddress);
    console.log(tokens);
}

onMounted(() => {
    if (store.state.web3 == null) {
        init()
    }
    setTimeout(() => {
        getMyTokens();
    }, 1000);

    window.addEventListener('scroll', function () { scrollPos.value = this.scrollY })
})

</script>