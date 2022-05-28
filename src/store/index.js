import { createStore } from "vuex"

export default createStore({
    state: {
        loading: false,
        init: false,
        ethereum: null,
        web3: null,
        networkId: 4,
        contract: null,
        connectedAddress: "",
        nftConfig: {
            stage: 2,
            publicSaleMaxMint: 3,
            publicSalePrice: 25000000000000000,
            maxSupply: 3950,
        },
        totalSupply: 0,
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
    },
    actions: {
        setStateData({ commit }, payload) {
            commit(payload.name, payload.data)
        },
    },
    modules: {},
})