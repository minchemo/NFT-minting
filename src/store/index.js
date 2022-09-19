import { createStore } from "vuex"

export default createStore({
    state: {
        minting: false,
        loading: false,
        init: false,
        ethereum: null,
        web3: null,
        networkId: 1,
        contract: null,
        connectedAddress: "",
        nftConfig: {
            mintStage: 0,
            petMaxSupply: 1825,
            price: 0,
            propMaxSupply: 2000,
            revealPet: false,
            revealProp: false,
        },
        totalSupply: 0,
        balance: 0,
        minted: 0,
        propMinted: false,
        petMinted: false,
        rootHash: '',
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
        setPropMinted(state, n) {
            state.propMinted = n
        },
        setPetMinted(state, n) {
            state.petMinted = n
        },
        setRootHash(state, n) {
            state.rootHash = n
        },
        showAlert(state, n) {
            state.showAlert = n
        },
        alertMsg(state, n) {
            state.alertMsg = n
        },
    },
    actions: {
        setStateData({ commit }, payload) {
            commit(payload.name, payload.data)
        },
    },
    modules: {},
})