<template>
  <div
    class="flex items-center jusitify-center gap-2 font-['Nunito'] mr-auto lg:mr-0 ml-auto"
  >
    <div class="text-sm">Can I claim?</div>
    <input
      type="text"
      class="rounded-lg p-2 font-black text-right w-20"
      placeholder="ID"
      ref="checkId"
    />
    <div
      @click="isClaimable()"
      class="text-sm uppercase font-black cursor-pointer hover:text-gray-300"
    >
      Check
    </div>
  </div>
  <div class="flex items-center justify-center mt-4 gap-2 flex-wrap">
    <div
      class="text-center w-full lg:w-auto font-['Nunito'] uppercase font-black text-black rounded-xl"
      v-if="!loading && !claimedChecking"
    >
      You can claim
      <span class="font-black text-red-600">{{ canClaimCount }} x boys</span>
    </div>
    <div
      v-if="!loading && !claimedChecking && canClaimCount > 0"
      @click="checkAll()"
      class="hover:cursor-pointer hover:opacity-75 flex gap-2 text-xs items-center whitespace-nowrap uppercase py-1 px-3 bg-orange-700 text-white rounded-full font-black"
    >
      <font-awesome-icon :icon="['fa', 'check']" />
      <p>all</p>
    </div>
    <div
      v-if="!loading && !claimedChecking"
      @click="refresh()"
      v-bind:class="{
        'bg-orange-700': !refreshLocked,
        'bg-gray-500': refreshLocked,
      }"
      class="hover:cursor-pointer hover:opacity-75 flex gap-2 text-xs items-center whitespace-nowrap uppercase py-1 px-3 text-white rounded-full font-black"
    >
      <font-awesome-icon :icon="['fa', 'repeat']" />
      <p>Refresh</p>
    </div>
    <div
      class="w-full text-xs lg:text-sm text-left lg:text-center text-gray-600"
      v-if="!loading && !claimedChecking && canClaimCount == 0"
    >
      You can buy Girl on
      <a
        target="_blank"
        class="underline"
        href="https://opensea.io/collection/jidori"
        >Opensea</a
      >
      to claim Boy.
    </div>
    <div
      class="w-full text-xs lg:text-sm text-left lg:text-center text-gray-600"
      v-if="!loading && !claimedChecking && canClaimCount > 0"
    >
      For saving your gas fee, we recommend to claim all at once.<br />
      Please refresh if you have any Jidori token transaction.
    </div>
  </div>
  <div
    class="py-4 text-center font-['Nunito'] font-black"
    v-if="loading && store.state.connectedAddress != ''"
  >
    Finding your Jidori Girls, Please wait...
  </div>
  <div
    class="py-4 text-center font-['Nunito'] font-black"
    v-else-if="!loading && claimedChecking"
  >
    Found {{ ownList.length }} Jidori Girls, checking...
  </div>
  <div class="font-['Nunito'] flex items-start gap-8" v-else>
    <div class="gap-2 rounded-xl flex w-full text-md text-black flex-wrap">
      <template v-for="item in ownList">
        <div
          @click="addToClaim(item)"
          class="relative flex items-center gap-2 px-2 lg:px-4 py-2 rounded-md hover:cursor-pointer hover:-translate-y-1 transition-all"
          v-bind:class="{
            'text-white': claimList.includes(item.id) && !item.claimed,
            'bg-orange-700': claimList.includes(item.id) && !item.claimed,
            'opacity-10': item.claimed,
          }"
        >
          <img
            class="w-8 h-8 object-cover rounded-full xl:w-12 xl:h-12"
            :src="`https://jidori-nft.com/tokens/${item.id}.jpg`"
            alt=""
            srcset=""
          />
          <p class="font-['Open_Sans'] font-black xl:text-xl">#{{ item.id }}</p>
        </div>
      </template>
    </div>
  </div>
  <div
    v-if="!loading && !claimedChecking && canClaimCount > 0"
    @click="claim()"
    class="w-auto mt-4 mx-auto uppercase flex items-center gap-4 transition-all text-md font-black text-white p-4 rounded-xl hover:-translate-y-1 hover:cursor-pointer"
    v-bind:class="{
      'bg-orange-700': claimList.length > 0,
      'bg-gray-300': claimList.length == 0,
    }"
  >
    <font-awesome-icon :icon="['fa', 'arrow-right']" />
    <p>claim now ({{ claimList.length }})</p>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import useEthereum from "@/utils/useEthereum"
import Web3 from "web3"
import store from "@/store"
import girlContract from "@/utils/contract_girl"

const { sentClaim } = useEthereum()

const girlBalance = ref(0)
const ownList = reactive([])
const claimList = ref([])
const loading = ref(true)
const claimedChecking = ref(false)
const claimedChecked = ref(0)
const canClaimCount = ref(0)

const refreshLocked = ref(false)

const checkId = ref()

const boyBalance = computed(() => store.state.balance)

watch(girlBalance, (oldBalance, newBalance) => {
  loading.value = true
  getMyGirls()
})

watch(boyBalance, (oldBalance, newBalance) => {
  checkIsClaimed()
})

const refresh = () => {
  if (!refreshLocked.value) {
    refreshLocked.value = true

    loading.value = true
    getMyGirls()
    setTimeout(() => {
      refreshLocked.value = false
    }, 10000)
  } else {
    store.dispatch("setStateData", {
      name: "setToast",
      data: {
        show: true,
        msg: `Refresh too fast`,
      },
    })
  }
}

const addToClaim = (item) => {
  if (item.claimed) {
    store.dispatch("setStateData", {
      name: "setToast",
      data: {
        show: true,
        msg: `Token #${item.id} already claimed. ( Possible you claimed or you purchased the token which others claimed. )`,
      },
    })
    return
  }
  let idx = claimList.value.findIndex((e) => e == item.id)
  if (idx >= 0) {
    claimList.value.splice(idx, 1)
  } else {
    claimList.value.push(item.id)
  }
}

const checkAll = () => {
  let list = []
  ownList.forEach((element) => {
    if (!element["claimed"]) {
      list.push(element.id)
    }
  })

  if (claimList.value.length == list.length) {
    claimList.value = []
  } else {
    claimList.value = list
  }
}

const getGirlBalance = () => {
  if (store.state.walletAddress == "") {
    return
  }
  const { ethereum } = window
  let web3 = new Web3(ethereum)
  let contract = new web3.eth.Contract(
    girlContract.ABI,
    girlContract.contract_address
  )

  contract.methods
    .balanceOf(store.state.connectedAddress)
    .call()
    .then((data) => {
      girlBalance.value = data
      if (data == 0) {
        loading.value = false
      }
    })
}

const getMyGirls = () => {
  ownList.splice(0)

  fetch(
    `https://api.jidori-nft.com/getGirls?address=${store.state.connectedAddress}`
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      let data = json["data"]

      data.sort(function (a, b) {
        return a - b
      })

      data.forEach((element) => {
        ownList.push({
          id: element,
          claimed: false,
        })
      })

      loading.value = false

      if (data.length > 0) {
        checkIsClaimed()
      } else if (data.length == 0) {
        claimedChecking.value = false
      }
    })
}

async function checkIsClaimed() {
  canClaimCount.value = 0
  claimedChecked.value = 0
  claimedChecking.value = true
  for (const [i, token] of ownList.entries()) {
    store.state.contract.methods
      .claimed(token.id)
      .call()
      .then((isClaimed) => {
        claimedChecked.value++
        ownList[i]["claimed"] = isClaimed

        if (!isClaimed) {
          canClaimCount.value++
        }

        if (claimedChecked.value == ownList.length) {
          setTimeout(() => {
            claimedChecking.value = false
          }, 1000)
        }
      })
  }
}

const claim = () => {
  if (claimList.value.length == 0) {
    store.dispatch("setStateData", {
      name: "setToast",
      data: {
        show: true,
        msg: `Please select at least 1 Jidori Girls to claim boy.`,
      },
    })
  } else {
    const ids = claimList.value.join(",")
    sentClaim(claimList.value)
  }
}

const isClaimable = () => {
  let id = checkId.value.value

  if (id > 3950 || id < 0 || isNaN(id)) {
    store.dispatch("setStateData", {
      name: "setToast",
      data: {
        show: true,
        msg: `Not valid ID`,
      },
    })
    return
  }
  store.state.contract.methods
    .claimed(id)
    .call()
    .then((isClaimed) => {
      store.dispatch("setStateData", {
        name: "setToast",
        data: {
          show: true,
          msg: `#${id} ${!isClaimed ? "claimable ✔" : "already claimed ❌"}`,
        },
      })
    })
}

onMounted(() => {
  setInterval(() => {
    getGirlBalance()
  }, 1000)
})
</script>
