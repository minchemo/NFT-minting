import { createStore } from 'vuex'

export default createStore({
  state: {
    web3: null,
    networkId: 1,
    contract: null,
    connectedAddress: '',
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
    setConnectedAddress(state, n) {
      state.connectedAddress = n;
    }
  },
  actions: {
    setConnectedAddress({ commit }, payload) {
      console.log(payload);
      commit('setConnectedAddress', payload)
    }
  },
  modules: {
  }
})
