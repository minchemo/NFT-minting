import { createStore } from "vuex"

export default createStore({
    state: {
        firebaseInstance: null,
        web3: null,
        networkId: 1,
        contract: null,
        connectedAddress: "",
        mintedAmount: 0,
        buyed: 0,
        totalSupply: 0,
        mintOpen: false,
    },
    mutations: {
        initFirebase(state, n) {
            state.firebaseInstance = n
        },
        setLoading(state, n) {
            state.loading = n
        },
        setInit(state, n) {
            state.init = n
        },
        setEthereum(state, n) {
            state.ethereum = n
        },
        setWeb3(state, n) {
            state.web3 = n
        },
        setContract(state, n) {
            state.contract = n
        },
        setNftConfig(state, n) {
            state.nftConfig = n
        },
        setMintOpen(state, n) {
            state.mintOpen = n
        },
        setTotalSupply(state, n) {
            state.totalSupply = n
        },
        setConnectedAddress(state, n) {
            state.connectedAddress = n
        },
        setBalance(state, n) {
            state.balance = n
        },
        setBuyed(state, n) {
            state.buyed = n
        },
        setToast(state, n) {
            state.toast = n
        },
    },
    actions: {
        initFirebase({ commit }, payload) {
            commit("initFirebase", payload)
        },
        setConnectedAddress({ commit }, payload) {
            commit("setConnectedAddress", payload)
        },
        setStateData({ commit }, payload) {
            commit(payload.name, payload.data)
        },
    },
    modules: {},
})