import Web3 from "web3"
import contractConfig from "@/utils/contract"

import store from "@/store"

export default function() {
    const requestAccount = () => {
        store.state.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((account) => {
                store.dispatch("setStateData", {
                    name: "setConnectedAddress",
                    data: account[0],
                })
                getBalance()
            })
            .catch((e) => {
                const errorCode = e.code

                if (errorCode == 4001) {
                    alert("User rejected the request, Please connect again.")
                } else if (errorCode == -32002) {
                    alert("Request already pending, please check on your Metamask.")
                }
            })
    }

    const getConfig = () => {
        store.state.contract.methods
            .jidoriConfig()
            .call()
            .then((config) => {
                store.dispatch("setStateData", { name: "setNftConfig", data: config })
            })
    }

    const getTotalSupply = () => {
        store.state.contract.methods
            .totalSupply()
            .call()
            .then((amount) => {
                store.dispatch("setStateData", { name: "setTotalSupply", data: amount })
            })
    }

    const getBuyed = () => {
        if (store.state.connectedAddress != "") {
            store.state.contract.methods
                .buyed(store.state.connectedAddress)
                .call()
                .then((amount) => {
                    store.dispatch("setStateData", { name: "setBuyed", data: amount })
                })
        }
    }

    const sentClaim = (ids) => {
        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: 0,
            data: store.state.contract.methods.claimBoy(ids).encodeABI(),
        }
        return store.state.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParams],
        })
    }

    const buy = (amount) => {
        let value = store.state.web3.utils.toHex(
            store.state.nftConfig.publicSalePrice * amount
        )

        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: value,
            data: store.state.contract.methods.mint(amount).encodeABI(),
        }
        return store.state.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParams],
        })
    }

    const getBalance = () => {
        store.state.contract.methods
            .balanceOf(store.state.connectedAddress)
            .call()
            .then((balance) => {
                store.dispatch("setStateData", { name: "setBalance", data: balance })
            })
    }

    const init = () => {
        const { ethereum } = window
        if (!ethereum) {
            alert(
                "No wallet plugin is available! Please change your browser or install wallet plugin."
            )
            return
        }

        let web3 = new Web3(ethereum)
        let contract = new web3.eth.Contract(
            contractConfig.ABI,
            contractConfig.contract_address
        )

        store.dispatch("setStateData", { name: "setEthereum", data: ethereum })
        store.dispatch("setStateData", { name: "setWeb3", data: web3 })
        store.dispatch("setStateData", { name: "setContract", data: contract })

        getConfig()

        ethereum.on("chainChanged", function(id) {
            store.state.web3.eth.getChainId().then((id) => {
                if (id != store.state.networkId) {
                    alert("Please Change to mainnet.")
                } else {
                    window.location.reload()
                }
            })
        })

        ethereum.on("accountsChanged", function(accounts) {
            store.dispatch("setStateData", {
                name: "setConnectedAddress",
                data: accounts[0],
            })
        })

        store.state.web3.eth.getChainId().then((id) => {
            if (id != store.state.networkId) {
                alert("Please Change to mainnet.")
                return
            }
            ethereum.on("accountsChanged", function(accounts) {
                store.dispatch("setStateData", {
                    name: "setConnectedAddress",
                    data: accounts[0],
                })
            })

            requestAccount()

            setInterval(() => {
                getConfig()
                getTotalSupply()

                if (store.state.connectedAddress != "") {
                    getBalance()
                }
            }, 1000)
        })

        store.dispatch("setStateData", { name: "setInit", data: true })
    }

    return {
        init,
        requestAccount,
        buy,
        sentClaim,
        getBuyed,
    }
}