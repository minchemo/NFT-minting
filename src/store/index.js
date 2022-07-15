import { createStore } from "vuex"

export default createStore({
    state: {
        minting: false,
        loading: false,
        init: false,
        ethereum: null,
        web3: null,
        networkId: 5,
        contract: null,
        connectedAddress: "",
        nftConfig: {
            pause: false,
            price: 0,
            maxMint: 5,
            maxSupply: 10000,
        },
        totalSupply: 0,
        balance: 0,
        minted: 0,
    },
    mutations: {
        setLoading(state, n) {
            state.loading = n
        },
        setMinting(state, n) {
            state.minting = n
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
            for (const key in n) {
                if (Object.hasOwnProperty.call(n, key)) {
                    const element = n[key]
                    n[key] = parseInt(element)
                }
            }
            state.nftConfig = n
        },
        setTotalSupply(state, n) {
            state.totalSupply = parseInt(n)
        },
        setConnectedAddress(state, n) {
            state.connectedAddress = n
        },
        setBalance(state, n) {
            state.balance = parseInt(n)
        },
        setBuyed(state, n) {
            state.minted = parseInt(n)
        },
    },
    actions: {
        setStateData({ commit }, payload) {
            commit(payload.name, payload.data)
        },
    },
    modules: {},
})