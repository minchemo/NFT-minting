<template>
    <div
        class="relative md:fixed bottom-0 left-0 flex flex-col items-center justify-center font-['joystix'] w-full z-[11] py-8 gap-2 md:gap-2 2xl:gap-8">
        <div class="text-xl md:text-2xl 2xl:text-5xl text-yellow-300">My potteds</div>
        <router-link to="/" class="link-btn text-white">Back to Homepage</router-link>
    </div>
    <div
        class="relative w-full overflow-x-hidden md:h-screen flex flex-col items-center justify-center z-10 font-['joystix'] text-white text-sm py-40 md:py-0 px-8 md:px-0">
        <!-- intro -->
        <div class="flex flex-col items-center justify-center" v-if="!ready && store.state.connectedAddress == ''">
            <img class="w-32 mb-8 " data-aos="fade" data-aos-duration="1000" src="@/assets/preview/10.svg" alt=""
                srcset="">
            <div data-aos="fade">
                please read the following notes Before reveal.
            </div>
            <div class="my-8 bg-black/50 p-4" data-aos="fade" data-aos-delay="400">
                you should prepare：<br /><br />
                1. Use desktop browser (recommended)<br />
                2. hold at least 1 unreveal potted-potted<br />
                3. connect wallet<br />
                4. play some music and chill!
            </div>
            <div class="p-4 cursor-pointer bg-orange-500/90 transition-all" data-aos="fade" data-aos-delay="800"
                @click="nextStep()" v-if="store.state.nftConfig.phase == 4">
                LET's GO
            </div>
            <div class="p-4 cursor-pointer bg-orange-500/90 transition-all" data-aos="fade" data-aos-delay="800" v-else>
                NOT IN REVEAL PHASE
            </div>
            <div v-if="processing[1] > 0">
                {{ processing[0] }} / {{ processing[1] }}
            </div>
        </div>
        <!-- loading -->
        <div v-else-if="loading" class="text-center">
            <p class="mb-4">Fetching potted-potted...</p>
            {{processing[0]}} / {{processing[1]}}
        </div>
        <!-- mypotteds -->
        <div v-else>
            <Splide :options="{ autoWidth:true,rewind: false, arrows: false, drag: false, gap: 20, type: 'fade' }"
                ref="pottedSplide">
                <SplideSlide class="slide w-full">
                    <div @click="reload()"
                        class="border w-32 mx-auto text-center py-2 mb-4 cursor-pointer hover:bg-black/50"
                        v-if="!loading">reload</div>
                    <!-- all potteds -->
                    <div
                        class="flex w-full flex-col md:flex-row justify-center items-center md:items-start bg-black/30 ">
                        <!-- unreveal -->
                        <div class="py-4 px-6 relative">
                            <p class="text-center my-4 underline">Unreveal ({{unrevealPotteds.length}})</p>
                            <div class="text-center text-xs my-4" v-if="unrevealPotteds.length == 0">No unreveal
                                potteds.</div>
                            <p class="text-center my-4 text-xs text-yellow-300" v-else>Select a potted to reveal</p>
                            <template v-if="unrevealPotteds.length > 0">
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-full">
                                    <div class="w-24 relative cursor-pointer hover:-translate-y-[2%] transition-all"
                                        v-for="unreveal in unrevealPotteds"
                                        v-bind:class="{'': unrevealPotteds.length==0}"
                                        @click="selectUnrevealPotted(unreveal.id)">
                                        <a class="absolute right-0 top-0 z-1" target="_blank"
                                            :href="`https://opensea.io/assets/ethereum/0x81b491ea8c26afffe00dd27517dcd838bf5097be/${unreveal.id}`"><img
                                                class="w-6 hover:opacity-50" src="@/assets/icon/opensea.svg" alt=""
                                                srcset=""></a>
                                        <img class="w-full rounded" :src="unreveal.data.image" alt="" srcset="">
                                        <p class="text-center">#{{unreveal.id}}</p>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="text-xs relative">No potteds.</div>
                            </template>
                        </div>
                        <!-- reveal -->
                        <div class="py-4 px-6 relative">
                            <p class="text-center my-4 underline">revealed ({{revealPotteds.length}})</p>
                            <div class="text-center text-xs my-4" v-if="revealPotteds.length == 0">No revealed potteds.
                            </div>
                            <p class="text-center my-4 text-xs text-yellow-300" v-else>Bought on secondary / revealed
                                tokens</p>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <template v-if="revealPotteds.length > 0">
                                    <div class="w-24 relative cursor-pointer hover:-translate-y-[2%] transition-all"
                                        v-for="reveal in revealPotteds" @click="selectedRevealedImg(reveal.id)">
                                        <a class="absolute right-0 top-0 z-1" target="_blank"
                                            :href="`https://opensea.io/assets/ethereum/0x81b491ea8c26afffe00dd27517dcd838bf5097be/${reveal.id}`"><img
                                                class="w-6 hover:opacity-50" src="@/assets/icon/opensea.svg" alt=""
                                                srcset=""></a>
                                        <img class="w-full rounded" :src="reveal.data.image" alt="" srcset="">
                                        <p class="text-center">#{{reveal.id}}</p>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide class="slide w-full flex flex-col items-center justify-center select-none py-8">
                    <div class="border px-4 py-2 mb-8 cursor-pointer hover:bg-black/50" @click="backToHome()"
                        v-if="previewFetching == 8">Back to potteds</div>
                    <div v-if="previewFetching < 8">
                        Loading preview data...
                    </div>
                    <div class="flex flex-col items-center justify-center" v-else>
                        <div class="text-center mb-4 text-lg text-orange-300 underline">#{{selectedId}} POTTED-POTTED
                        </div>
                        <div class="flex items-center gap-4 shadow-2xl">
                            <div>
                                <img class=" w-36 md:w-40 2xl:w-52" :src="selectedUnrevealImg()" alt="" srcset="">
                            </div>
                            <div class="text-5xl">></div>
                            <div ref="previewBox" class="w-36 md:w-40 2xl:w-52"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center gap-4 mt-4">
                            <div>
                                {{currentRevealNum}} / 8
                            </div>
                            <div class="flex justify-between items-center gap-8">
                                <div class="cursor-pointer underline" @click="showPrev()" v-if="currentRevealNum != 1">
                                    prev</div>
                                <div class="cursor-pointer text-black bg-white/90 py-2 px-4 hover:bg-white"
                                    @click="showNext()"
                                    v-bind:class="{'invisible': !showNextButton || currentRevealNum == 8}">
                                    next</div>
                            </div>
                        </div>
                        <div class="bg-orange-600 text-white px-8 py-4 mt-4 md:mt-4 2xl:mt-8 cursor-pointer hover:bg-orange-700 text-sm md:text-sm 2xl:text-xl"
                            @click="confirmReveal()">
                            {{ !revealing ? 'reveal confirm !': 'revealing...'}}
                        </div>
                        <div class="leading-normal	 my-8 md:my-4 2xl:my-8 text-xs bg-black/50 p-4" data-aos="fade"
                            data-aos-delay="400">
                            Note：<br /><br />
                            1. You will able to see 8 changes of potted, which are generated on-chain from token
                            gene.<br />
                            2. Click <span class="underline">prev</span> or <span class="underline">next</span> to view
                            all
                            changes then click <span class="underline">reveal confirm</span> to reveal!<br />
                            3. Confirm Reveal will cost some gas fee (50,000 to 70,000 gas = 0.001 eth (in 20 gas
                            fee))<br />
                        </div>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    </div>
    <div class="bg-reveal fixed top-0 left-0 w-full h-full z-0 pointer-none">
    </div>
    <div class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center flex-col backdrop-blur-sm transition-all duration-500"
        v-bind:class="{'translate-y-[0]' : selectedRevealedId != null, '-translate-y-[200%]' : selectedRevealedId == null}">
        <div class="h-1/2">
            <canvas class="h-full" id="revealedCanvas" width="1280" height="1920"></canvas>
        </div>
        <div class="flex items-center gap-4 justify-center">
            <div class="font-['joystix'] text-xs text-white border mt-8 px-4 py-2 cursor-pointer bg-black hover:bg-black/50"
                @click="selectedRevealedId = null">close</div>
            <div class="font-['joystix'] text-xs text-white border mt-8 px-4 py-2 cursor-pointer bg-black  hover:bg-black/50"
                @click="screenShot()">download (1280 x 1920)</div>
        </div>
    </div>
</template>

<style lang="scss">
.bg-reveal {
  background-image: url('@/assets/bg.jpg');
  background-size: cover;
  background-position: bottom center;
  filter: brightness(.5);
}
</style>

<script setup>
import AOS from "aos"
import { ref, onMounted, reactive } from "vue"
import useEthereum from "@/utils/useEthereum"
import store from "@/store"
import { Base64 } from 'js-base64';

const {
    init,
    asyncRequestAccount,
    getTokenURI,
    getPottedGene,
    previewPotted,
    reroll,
    setReveal,
    getTokensOfOwner } = useEthereum()

const ready = ref(false);

const selectedId = ref(null);
const selectedRevealedId = ref(null);
const ownTokensId = ref([]);
const unrevealPotteds = reactive([]);
const revealPotteds = reactive([]);
const revealPreview = reactive([]);

const loading = ref(false);
const revealing = ref(false);
const previewFetching = ref(0);
const currentRevealNum = ref(1);
const processing = reactive([0, 0]);
const showNextButton = ref(false)

const nextStep = async () => {
    let account = await asyncRequestAccount();

    if (account && account.length > 0) {
        loading.value = true;
        ready.value = true;
        ownTokensId.value = await getTokensOfOwner(account[0]);
        processing[1] = ownTokensId.value.length;

        if (ownTokensId.value.length == 0) {
            store.dispatch("setStateData", { name: "showAlert", data: true })
            store.dispatch("setStateData", { name: "alertMsg", data: 'You dont have any tokens' })
        }

        for (let i = 0; i < ownTokensId.value.length; i++) {
            const tokenId = ownTokensId.value[i];

            processJson(tokenId);
        }

        store.dispatch("setStateData", {
            name: "setConnectedAddress",
            data: account[0],
        })
    }
}

const processJson = async (id) => {
    const metadata = await getTokenURI(id);
    let base64 = metadata.split(',');
    let decoded = Base64.decode(base64[1]);
    const DATA = JSON.parse(decoded);
    const name = DATA.name;

    if (name.includes('Unreveal')) {
        unrevealPotteds.push({
            id: id,
            data: DATA
        })
    } else {
        revealPotteds.push({
            id: id,
            data: DATA
        })
    }

    processing[0]++;

    if (processing[0] == processing[1]) {
        setTimeout(() => {

            loading.value = false;
        }, 500);
        unrevealPotteds.sort((a, b) => a.id - b.id)
        revealPotteds.sort((a, b) => a.id - b.id)
    };
}

const selectedUnrevealImg = () => {
    const selectedData = unrevealPotteds.find(item => item.id == selectedId.value);
    return selectedData != null ? selectedData.data.image : null;
}


const selectedRevealedImg = (id) => {
    selectedRevealedId.value = id;
    const selectedData = revealPotteds.find(item => item.id == selectedRevealedId.value);

    if (selectedData) {
        let base64 = selectedData.data.image.split(',');
        let decoded = Base64.decode(base64[1]);

        const ctxt = document.getElementById("revealedCanvas").getContext("2d");

        drawInlineSVG(ctxt, decoded, function () { });
    }

    return selectedData != null ? selectedData.data.image : null;
}

const pottedSplide = ref(null);
const previewBox = ref(null);

const reload = async () => {
    loading.value = true;
    unrevealPotteds.splice(0);
    revealPotteds.splice(0);
    previewFetching.value = 0;
    ownTokensId.value = await getTokensOfOwner(store.state.connectedAddress);

    processing[0] = 0;
    processing[1] = ownTokensId.value.length;

    for (let i = 0; i < ownTokensId.value.length; i++) {
        const tokenId = ownTokensId.value[i];
        processJson(tokenId);
    }
}

const selectUnrevealPotted = async (id) => {
    currentRevealNum.value = 1;
    previewFetching.value = 0;
    revealPreview.splice(0);
    selectedId.value = id;
    pottedSplide.value.splide.go('>')

    for (let i = 1; i <= 8; i++) {
        loadPreviewData(id, i)
    }
}

const loadPreviewData = async (id, i) => {
    const previewSvg = await previewPotted(id, i)
    revealPreview.push({
        revealNum: i,
        svg: previewSvg
    })
    previewFetching.value++;

    if (previewFetching.value == 8) {
        setTimeout(() => {
            showSvg();
        }, 100);
    }
}

const showPrev = async () => {
    if (currentRevealNum.value - 1 >= 1) {
        currentRevealNum.value--;
        showSvg()
    }
}
const showNext = async () => {
    if (currentRevealNum.value + 1 <= 8) {
        currentRevealNum.value++;
        showSvg()
    }
}

const showSvg = () => {
    showNextButton.value = false;

    let revealSvg = revealPreview.find(item => item.revealNum == currentRevealNum.value);

    let svgString = rewrokSvgString(revealSvg.svg);
    previewBox.value.innerHTML = '';
    previewBox.value.insertAdjacentHTML('beforeend', svgString)

    AOS.refresh()

    setTimeout(() => {
        showNextButton.value = true;
    }, 1000);
}

const backToHome = () => {
    selectedId.value = null;
    pottedSplide.value.splide.go('<')
}

const rewrokSvgString = (string) => {
    let newString = string;
    const imgsCount = string.match(/<image*/g);

    for (let i = 0; i < imgsCount.length; i++) {
        if (i <= 2) {
            newString = newString.replace('<image x', `<image data-aos="" x`)
        } else {
            newString = newString.replace('<image x', `<image data-aos="zoom-in" data-aos-duration="500" data-aos-delay="${(i + 1) * 100}" x`)
        }
    }

    return newString;
}

const confirmReveal = async () => {
    if (revealing.value) {
        return
    }

    revealing.value = true;
    await setReveal(selectedId.value, currentRevealNum.value, onSuccessReveal, onErrReveal);
    revealing.value = false;
}

const onSuccessReveal = async () => {
    backToHome();
    reload();
    previewFetching.value = 0;
    store.dispatch("setStateData", { name: "showAlert", data: true })
    store.dispatch("setStateData", { name: "alertMsg", data: 'Reveal Successfully!.' })
}

const onErrReveal = () => {
    selectedInteract.value = null;
    store.dispatch("setStateData", { name: "showAlert", data: true })
    store.dispatch("setStateData", { name: "alertMsg", data: 'Unable to reveal.' })
}

const screenShot = () => {
    var link = document.createElement('a');
    link.download = `#${selectedRevealedId.value} POTTED-POTTED.png`;
    link.href = document.getElementById('revealedCanvas').toDataURL()
    link.click();
}


const drawInlineSVG = (ctx, rawSVG, callback) => {
    var svg = new Blob([rawSVG], { type: "image/svg+xml;charset=utf-8" }),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
        img = new Image();

    img.onload = function () {
        ctx.drawImage(this, 0, 0);
        domURL.revokeObjectURL(url);
        callback(this);
    };

    console.log(url);

    img.src = url;
}

onMounted(() => {
    init();
    AOS.init()
})
</script>