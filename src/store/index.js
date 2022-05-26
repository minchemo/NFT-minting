import { createStore } from "vuex"

export default createStore({
    state: {
        loading: true,
        init: false,
        ethereum: null,
        web3: null,
        networkId: 4,
        contract: null,
        connectedAddress: "",
        nftConfig: {
            paused: false,
            isPublicSale: false,
            isPreSale: false,
            preSaleMaxMint: 2,
            publicSaleMaxMint: 10,
            publicSalePrice: 0,
            preSalePrice: 0,
            maxSupply: 10625,
            devMintAmount: 625,
        },
        totalSupply: 0,
        addressMinted: 0,
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
        setAddressMinted(state, n) {
            state.addressMinted = n
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