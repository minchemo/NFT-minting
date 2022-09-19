<template>
    <div class="overflow-y-scroll w-screen h-screen bg-gray-200 relative font-['joystix']">
        <!-- nav -->
        <div
            class="fixed bg-gray-200 shadow-md py-8 px-12 top-0 left-0 w-full text-white flex flex-col gap-4 md:flex-row items-center justify-between z-[10]">
            <router-link to="/" class="btn btn-sm font-normal">Back to home</router-link>
            <div class="text-center">
                <div class="text-3xl font-['MK'] text-yellow-600">Tamagogi</div>
                <div class="text-sm text-black">dashboard (alpha)</div>
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
        <div class="flex flex-col items-center mx-auto pt-52 md:pt-40 px-20">
            <!-- Pets -->
            <div class="text-md my-4 flex items-center gap-4">
                <div>your pets ({{myPets.length}})</div>
                <div class="text-xs btn btn-xs font-normal" @click="refresh()">refresh</div>
            </div>
            <div class="cus-scrollbar flex overflow-x-auto gap-3 max-w-full p-2" v-if="!loading">
                <div v-if="myPets.length == 0" class="text-sm">
                    you dont have pets.<br /><br />
                    <a href="https://opensea.io/collection/tamagogi-pets" class="btn btn-sm font-normal">Buy on
                        opensea</a>
                </div>
                <div v-else v-for="pet , i in myPets" class="flex">
                    <div class="border-2 rounded-md p-4 cursor-pointer shadow-md hover:bg-white transition-all"
                        @click="selectedPetsIdx = i" v-bind:class="{'border-black': selectedPetsIdx == i}">
                        <!-- id -->
                        <div class="text-sm text-center mt-1">#{{pet.id}}</div>
                        <!-- imgae -->
                        <div class="w-28 h-28 bg-gray-300 flex items-center justify-center rounded-md overflow-hidden">
                            <img v-if="pet.image" :src="pet.image" alt="" srcset="">
                            <svg v-else class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                        <!-- birth -->
                        <div class="text-xs text-center underline my-1">{{pet.birthdate}}</div>
                        <!-- name -->
                        <div v-if="pet.name != ''" class="truncate text-sm text-center">{{pet.name}}</div>
                    </div>
                </div>
            </div>
            <svg v-else class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                </circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            <!-- Current Pets -->
            <div class="flex basis-full flex-col items-center justify-center mt-16 pb-20" v-if="myPets.length > 0">
                <div class="flex flex-col justify-center items-center" v-if="selectedPetsIdx != null"
                    :key="myPets[selectedPetsIdx]">
                    <div class="mb-4 text-md">{{myPets[selectedPetsIdx].name == '' ?
                    'NONAME':myPets[selectedPetsIdx].name}} / #{{myPets[selectedPetsIdx].id}}</div>
                    <div ref="petBoxRef"
                        class="pet relative w-full md:w-[300px] 2xl:w-[400px] aspect-square bg-[#a8d697] overflow-hidden flex flex-col items-center justify-end border-4 md:border-b-0 border-black">
                        <div class="w-[50%]">
                            <img id="pet-image" ref="petRef" class="cursor-pointer" @click="animatePet()" src="" alt=""
                                srcset="" />
                        </div>
                        <div class="absolute left-2 md:left-5 top-2 md:top-3 flex flex-col gap-2">
                            <img v-if="selectedProps[1]" class="w-6 md:w-[1.5vw] border border-black"
                                src="@/assets/props/toy.svg" alt="" srcset="">
                            <img v-if="selectedProps[0]" class="w-6 md:w-[1.5vw] border border-black"
                                src="@/assets/props/food.svg" alt="" srcset="">
                            <img v-if="selectedProps[2]" class="w-6 md:w-[1.5vw] border border-black"
                                src="@/assets/props/shield.svg" alt="" srcset="">
                        </div>
                        <div class="absolute right-2 md:right-5 top-2 md:top-3 text-xs md:text-lg text-right">
                            <div>{{ blockTime.month }}/{{ blockTime.day }} {{ blockTime.year }}</div>
                            <div>{{ blockTime.hour }}<span class="flick">:</span>{{ blockTime.minutes }}</div>
                        </div>
                    </div>
                    <div class="pet-ground h-[.2vw] top-[100%] w-[80vw] bg-black hidden md:block"></div>
                    <div class="flex flex-col items-center gap-4 mt-4">
                        <div class="flex flex-col items-center gap-4 border-black p-4">
                            <div class="w-full flex flex-col md:flex-row justify-around gap-2 md:gap-8">
                                <div class="btn btn-xs md:btn-md font-normal bg-gray-400 border-0"
                                    @click="_feed(myPets[selectedPetsIdx].id)">
                                    feed
                                </div>
                                <div class="btn btn-xs md:btn-md font-normal bg-gray-400 border-0"
                                    @click="_hit(myPets[selectedPetsIdx].id)">
                                    hit
                                </div>
                                <div class="btn btn-xs md:btn-md font-normal bg-gray-400 border-0"
                                    @click="_play(myPets[selectedPetsIdx].id)">
                                    play
                                </div>
                                <div class="btn btn-xs md:btn-md font-normal bg-gray-400 border-0"
                                    @click="_reroll(myPets[selectedPetsIdx].id)"
                                    v-if="!myPets[selectedPetsIdx].rerolled">
                                    reroll
                                </div>
                                <div class="btn btn-xs md:btn-md font-normal bg-green-500 border-0" @click="download()">
                                    take a pic
                                </div>
                            </div>
                            <div class="flex flex-col md:flex-row items-center text-sm gap-4 mt-2">
                                <div>Hunger: {{myPets[selectedPetsIdx].stats.hunger}}</div>
                                <div>Bored: {{myPets[selectedPetsIdx].stats.bored}}</div>
                                <div>unhappiness: {{myPets[selectedPetsIdx].stats.unhappiness}}</div>
                            </div>
                            <div class="text-center text-xs text-gray-500 -mt-4 mb-2">(The lower values, higher
                                happiness)</div>
                            <div class="flex items-center gap-4">
                                <input type="text" :value="inputName == '' ? myPets[selectedPetsIdx].name : inputName"
                                    placeholder="Type a new name" @input="event => inputName = event.target.value"
                                    class="input w-full max-w-xs font-['arial']" />
                                <div v-if="inputName.length > 1 && inputName.length < 18"
                                    class="cursor-pointer text-sm btn btn-sm font-normal "
                                    @click="_changeName(myPets[selectedPetsIdx].id)">
                                    Change Name
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedInteract != null" class="text-red-500 text-sm mt-4">
                        Pending {{selectedInteract}} ...
                    </div>
                </div>
                <div v-else class="text-md md:text-xl text-center"> Select a pet on top</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.cus-scrollbar {
    scrollbar-width: auto;
    scrollbar-color: #363636 #ffffff;
}

.cus-scrollbar::-webkit-scrollbar {
    width: 16px;
}

.cus-scrollbar::-webkit-scrollbar-track {
    background: #ffffff;
}

.cus-scrollbar::-webkit-scrollbar-thumb {
    background-color: #363636;
    border-radius: 10px;
    border: 5px solid #ffffff;
}

.pet {

    #pet-image {
        image-rendering: crisp-edges;
        animation-fill-mode: forwards;

        &.jump {
            animation: jump .7s linear;
            transform-origin: bottom center;

            @keyframes jump {
                0% {
                    transform: translateY(0%);
                }

                25% {
                    transform: translateY(-9%);
                }

                50% {
                    transform: translateY(2%);
                }


                75% {
                    transform: translateY(-10%);
                }

                100% {
                    transform: translateY(0%);
                }
            }
        }

        &.disapear {
            animation: disapear .7s ease-in-out;
            transform-origin: bottom right;

            @keyframes disapear {
                0% {
                    transform: translateX(0%);
                }

                25% {
                    transform: translateX(200%);
                }

                50% {
                    transform: translateX(-200%);
                }

                75% {
                    transform: translateX(5%);
                }


                100% {
                    transform: translateX(0%);
                }
            }
        }

        &.shift {
            animation: ahha .7s linear;
            transform-origin: bottom right;

            @keyframes ahha {
                0% {
                    transform: translateX(0%);
                }

                25% {
                    transform: translateX(-5%);
                }

                50% {
                    transform: translateX(0%);
                }

                75% {
                    transform: translateX(5%);
                }


                100% {
                    transform: translateX(0%);
                }
            }
        }

        &.fly {
            animation: fly 3s;
            transform-origin: bottom center;

            @keyframes fly {
                0% {
                    transform: translateY(0%) scaleY(1);
                }

                25% {
                    transform: translateY(30%) scaleY(0.8);
                }

                50% {
                    transform: translateY(-300%) scaleY(0.8);
                }

                75% {
                    transform: translateY(5%);
                }

                100% {
                    transform: translateX(0%) scaleY(1);
                }
            }
        }

        &.fly-rotate {
            animation: fly-rotate 3s;
            transform-origin: bottom center;

            @keyframes fly-rotate {
                0% {
                    transform: translateY(0%);
                }

                25% {
                    transform: translateY(-40%);
                }

                50% {
                    transform: translateY(-40%) rotate(360deg);
                    transform-origin: center;
                }

                75% {
                    transform: translateY(-40%) rotate(360deg);
                    transform-origin: center;
                }

                100% {
                    transform-origin: bottom center;
                    transform: translateX(0%) rotate(360deg);
                }
            }
        }

    }
}

.flick {
    animation: flick 1s infinite;
    transition: all 0s;

    @keyframes flick {
        from {
            color: #a8d697;
        }

        to {
            color: #000;
        }
    }
}

.pet-ground {
    animation: grow 1s;
    transform-origin: left;
    animation-fill-mode: forwards;
    transform: scaleX(0);

    @keyframes grow {
        from {
            transform: scaleX(.1);
        }

        to {
            transform: scaleX(1);
        }
    }
}
</style>

<script setup>
import useEthereum from "@/utils/useEthereum"
import store from "@/store"
import { Base64 } from 'js-base64';
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import AOS from "aos"
import html2canvas from "html2canvas"
const { init, requestAccount, getTokensOfOwner, getTokenURI, hit, play, feed, reroll, changeName, checkName, TMGGs, getPetUnhappinessAndProp } = useEthereum()

const myProps = reactive([]);
const myPets = reactive([]);
const selectedPetsIdx = ref(null);
const selectedPetsInteract = ref(null);
const selectedInteract = ref(null);
const selectedProps = ref([0, false, false, false]);
const inputName = ref('');
const loading = ref(true);
const petRef = ref(null);
const petBoxRef = ref(null);
const animateList = ['jump', 'disapear', 'shift', 'fly', 'fly-rotate']
const blockTime = reactive({
    month: '',
    day: '',
    year: '',
    hour: '',
    minutes: ''
});

watch(selectedPetsIdx, (newVal, oldVal) => {
    nextTick(() => {
        if (newVal >= 0 && newVal != null) {
            cropImgae(myPets[newVal].image)
            getTmggs(myPets[newVal].id);
            _getPetUnhappinessAndProp(myPets[newVal].id)


            store.dispatch("setStateData", { name: "showAlert", data: true })
            store.dispatch("setStateData", { name: "alertMsg", data: 'Click pet show animate!!' })
        }

    })
})

const getMyTokens = async () => {
    const tokens = await getTokensOfOwner(store.state.connectedAddress);

    for (let index = 0; index < tokens.length; index++) {
        const id = tokens[index];

        processTokens(id);
    }

    loading.value = false;
}

const processTokens = async (id) => {
    if (id <= store.state.nftConfig.propMaxSupply) {
        myProps.push({
            id: id,
            imgae: ''
        });
    } else {
        myPets.push({
            id: id,
            imgae: ''
        });
    }

    const metadata = await getTokenURI(id);
    processJson(id, metadata);
}

const processJson = (id, metadata) => {
    let base64 = metadata.split(',');
    let decoded = Base64.decode(base64[1]);

    const DATA = JSON.parse(decoded);

    if (id <= store.state.nftConfig.propMaxSupply) {
        let propData = {
            id: id,
            type: 'prop',
            usage: DATA.attributes[1].value,
        }

        let idx = myProps.findIndex(prop => prop.id == id);
        if (idx >= 0) {
            myProps[idx] = propData;
        }
    } else {
        const name = DATA.name.split(' / ')
        let petData = {
            id: id,
            type: 'pet',
            name: name.length > 1 ? name[0] : '',
            image: DATA.image,
            birthdate: DATA.attributes[10].value,
            stats: {
                hunger: DATA.attributes[0].value,
                bored: DATA.attributes[1].value,
                unhappiness: DATA.attributes[5].value,
            },
            traits: {
                reaction: DATA.attributes[6].value,
                ear: DATA.attributes[7].value,
                head: DATA.attributes[8].value,
                body: DATA.attributes[9].value,
            },
            rerolled: DATA.attributes[4].value == 'yes' ? true : false,
            master: DATA.attributes[3].value == 'yes' ? true : false,
        }

        let idx = myPets.findIndex(pet => pet.id == id);
        if (idx >= 0) {
            myPets[idx] = petData;
        }
    }


}

const getTmggs = async (id) => {
    // const interact = await TMGGs[id]
    // console.log(interact);
}

const refresh = () => {
    if (!loading.value) {
        selectedPetsIdx.value = null;
        selectedPetsInteract.value = null;
        myProps.length = 0;
        myPets.length = 0;
        loading.value = true;
        setTimeout(() => {

            getMyTokens();
        }, 500);
    }
}

const cropImgae = (image) => {
    let img = new Image(),
        $canvas = document.createElement('canvas'),
        canvas = $canvas,
        context;

    let removeBlanks = function (imgWidth, imgHeight) {
        var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
            data = imageData.data,
            getRBG = function (x, y) {
                var offset = imgWidth * y + x;
                return {
                    red: data[offset * 4],
                    green: data[offset * 4 + 1],
                    blue: data[offset * 4 + 2],
                    opacity: data[offset * 4 + 3]
                };
            },
            isBg = function (rgb) {
                return rgb.red >= 150 && rgb.green >= 210 && rgb.blue >= 145;
            },
            scanY = function (fromTop) {
                var offset = fromTop ? 1 : -1;
                for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

                    for (var x = 0; x < imgWidth; x++) {
                        var rgb = getRBG(x, y);
                        if (!isBg(rgb)) {
                            return y;
                        }
                    }
                }
                return null;
            },
            scanX = function (fromLeft) {
                var offset = fromLeft ? 1 : -1;
                for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

                    for (var y = 0; y < imgHeight; y++) {
                        var rgb = getRBG(x, y);
                        if (!isBg(rgb)) {
                            return x;
                        }
                    }
                }
                return null;
            };

        let cropTop = scanY(true),
            cropBottom = scanY(false),
            cropLeft = scanX(true),
            cropRight = scanX(false),
            cropWidth = cropRight - cropLeft,
            cropHeight = cropBottom - cropTop;

        let $croppedCanvas = document.createElement('canvas');

        $croppedCanvas.setAttribute('width', cropWidth);
        $croppedCanvas.setAttribute('height', cropHeight);

        $croppedCanvas.getContext("2d").drawImage(canvas,
            cropLeft, cropTop, cropWidth, cropHeight,
            0, 0, cropWidth, cropHeight);

        const finalImgBase64 = $croppedCanvas.toDataURL();

        document.getElementById('pet-image').src = finalImgBase64;
    };

    img.crossOrigin = "anonymous";
    img.onload = function () {
        $canvas.setAttribute('width', this.width);
        $canvas.setAttribute('height', this.height);

        context = canvas.getContext("2d");
        if (context) {
            context.drawImage(this, 0, 0);
            removeBlanks(this.width, this.height);
        } else {
            alert('Get a real browser!');
        }
    };
    img.src = image;
}

const animatePet = () => {
    const randomElement = animateList[Math.floor(Math.random() * animateList.length)];

    petRef.value.classList.remove(...animateList);
    petRef.value.classList.add(randomElement);
}

const _feed = async (id) => {
    if (selectedInteract.value != null) {
        store.dispatch("setStateData", { name: "showAlert", data: true })
        store.dispatch("setStateData", { name: "alertMsg", data: 'There is a pending function.' })
        return
    }
    selectedInteract.value = 'feed';
    await feed(id, onSuccessIneract, onErrIneract);
}
const _hit = async (id) => {
    if (selectedInteract.value != null) {
        store.dispatch("setStateData", { name: "showAlert", data: true })
        store.dispatch("setStateData", { name: "alertMsg", data: 'There is a pending function.' })
        return
    }
    selectedInteract.value = 'hit';
    await hit(id, onSuccessIneract, onErrIneract);
}
const _play = async (id) => {
    if (selectedInteract.value != null) {
        store.dispatch("setStateData", { name: "showAlert", data: true })
        store.dispatch("setStateData", { name: "alertMsg", data: 'There is a pending function.' })
        return
    }
    selectedInteract.value = 'play';
    await play(id, onSuccessIneract, onErrIneract);
}
const _reroll = async (id) => {
    if (selectedInteract.value != null) {
        store.dispatch("setStateData", { name: "showAlert", data: true })
        store.dispatch("setStateData", { name: "alertMsg", data: 'There is a pending function.' })
        return
    }
    selectedInteract.value = 'reroll';
    await reroll(id, onSuccessIneract, onErrIneract);
}
const _changeName = async (id) => {
    const invalidName = await checkName(inputName.value);

    if (!invalidName) {
        if (selectedInteract.value != null) {
            store.dispatch("setStateData", { name: "showAlert", data: true })
            store.dispatch("setStateData", { name: "alertMsg", data: 'There is a pending function.' })
            return
        }
        selectedInteract.value = 'changeName';
        await changeName(id, inputName.value, onSuccessIneract, onErrIneract);
    } else {
        store.dispatch("setStateData", { name: "showAlert", data: true })
        store.dispatch("setStateData", { name: "alertMsg", data: 'This name was exist.' })
    }
}
const _getPetUnhappinessAndProp = async (id) => {
    const ownProps = await getPetUnhappinessAndProp(id);
    selectedProps.value = ownProps;
}

const onSuccessIneract = () => {
    store.dispatch("setStateData", { name: "showAlert", data: true })
    let alertMsg = '';
    switch (selectedInteract.value) {
        case 'feed':
            alertMsg = 'Feed successfully.'
            break;
        case 'hit':
            alertMsg = 'You just hit a pet...'
            break;
        case 'play':
            alertMsg = 'Best of friend, Master'
            break;
        case 'reroll':
            alertMsg = 'Reroll successfully.'
            break;
        case 'changeName':
            alertMsg = 'Name changed successfully.'
            break;
    }
    store.dispatch("setStateData", { name: "alertMsg", data: alertMsg })
    selectedInteract.value = null;
    inputName.value = ''

    reloadPet(myPets[selectedPetsIdx.value].id);
}

const onErrIneract = () => {
    selectedInteract.value = null;
    store.dispatch("setStateData", { name: "showAlert", data: true })
    store.dispatch("setStateData", { name: "alertMsg", data: 'Unable to execute function.' })
}

const reloadPet = async (id) => {
    selectedPetsIdx.value = id;
    const metadata = await getTokenURI(id);
    processJson(id, metadata);
    setTimeout(() => {
        cropImgae(myPets[selectedPetsIdx.value].image)
    }, 50);
    setTimeout(() => {
        animatePet()
    }, 100);
}


const getBlockTime = async () => {
    const blockNumber = await store.state.web3.eth.getBlockNumber();
    const blockData = await store.state.web3.eth.getBlock(blockNumber);

    let date = new Date(blockData.timestamp * 1000);

    blockTime.month = date.getUTCMonth() + 1;
    blockTime.day = date.getUTCDate();
    blockTime.year = date.getUTCFullYear();
    blockTime.hour = date.getUTCHours();
    blockTime.minutes = date.getUTCMinutes();
}

const download = () => {
    html2canvas(petBoxRef.value).then(canvas => {
        var link = document.createElement('a');
        link.download = `#${myPets[selectedPetsIdx.value].id}.png`;
        link.href = canvas.toDataURL()
        link.click();
    });
}


onMounted(() => {
    AOS.init()
    if (store.state.web3 == null) {
        init()
    }
    setTimeout(() => {
        getMyTokens();
    }, 1000);

    setInterval(() => {
        getBlockTime()
    }, 1000);

    window.addEventListener('scroll', function () { scrollPos.value = this.scrollY })
})

</script>