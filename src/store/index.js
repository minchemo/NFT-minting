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
        contractPet: null,
        connectedAddress: "",
        nftConfig: {
            maxPotted: 9999,
            publicPrice: 0,
            publicMaxMint: 1,
            claimHash: null,
            presaleHash: null,
            phase: 2,
        },
        totalSupply: 0,
        petBalance: 0,
        claimed: false,
        minted: false,
        publicMinted: 0,
        showAlert: false,
        alertMsg: ''
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
        setContractPet(state, n) {
            state.contractPet = n
        },
        setNftConfig(state, n) {
            for (const key in n) {
                if (Object.hasOwnProperty.call(n, key)) {
                    const element = n[key]
                    if (/^-?\d+$/.test(element)) {
                        n[key] = parseInt(element)
                    } else {
                        n[key] = element
                    }
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
        showAlert(state, n) {
            state.showAlert = n
        },
        alertMsg(state, n) {
            state.alertMsg = n
        },
        setClaimed(state, n) {
            state.claimed = n
        },
        setMinted(state, n) {
            state.minted = n
        },
        setPublicMinted(state, n) {
            state.publicMinted = n
        },
        setPetBalance(state, n) {
            state.petBalance = n
        },
    },
    actions: {
        setStateData({ commit }, payload) {
            commit(payload.name, payload.data)
        },
    },
    modules: {},
})