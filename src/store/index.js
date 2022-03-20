import { createStore } from "vuex"

export default createStore({
    state: {
        firebaseInstance: null,
        web3: null,
        networkId: 1,
        contract: null,
        connectedAddress: "",
        nftConfig: {
            isSale: false,
            maxMint: 5,
            salePrice: 10000000000000000,
            totalSupply: 0,
            maxSupply: 3000,
        },
        mintedAmount: 0,
        buyingAmount: 0,
    },
    mutations: {
        initFirebase(state, n) {
            state.firebaseInstance = n
        },
        setConnectedAddress(state, n) {
            state.connectedAddress = n
        },
    },
    actions: {
        initFirebase({ commit }, payload) {
            commit("initFirebase", payload)
        },
        setConnectedAddress({ commit }, payload) {
            commit("setConnectedAddress", payload)
        },
    },
    modules: {},
})