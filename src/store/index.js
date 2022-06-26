import { createStore } from "vuex"

export default createStore({
    state: {
        register: false,
        init: false,
        ethereum: null,
        web3: null,
        networkId: 1,
        contract: null,
        connectedAddress: "",
        accountBalance: 0,
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
        setRegister(state, n) {
            state.register = n
        },
        setInit(state, n) {
            state.init = n
        },
        setBalance(state, n) {
            state.accountBalance = parseInt(n)
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