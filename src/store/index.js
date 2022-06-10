import { createStore } from "vuex"

export default createStore({
    state: {
        loading: false,
        init: false,
        ethereum: null,
        web3: null,
        networkId: 1,
        contract: null,
        connectedAddress: "",
        nftConfig: {
            price: 0,
            maxMint: 6,
            maxSupply: 4000,
        },
        totalSupply: 0,
        balance: 0,
        minted: 0,
        freeMint: 0,
        toast: {
            show: false,
            msg: "",
        },
    },
    mutations: {
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
            state.minted = n
        },
        setFreeMintSlots(state, n) {
            state.freeMint = n
        },
        setToast(state, n) {
            state.toast = n
        },
    },
    actions: {
        setStateData({ commit }, payload) {
            commit(payload.name, payload.data)
        },
    },
    modules: {},
})