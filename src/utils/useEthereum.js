import Web3 from "web3"
import contractConfig from "@/utils/contract"
import detectEthereumProvider from "@metamask/detect-provider"
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
            .nangoHentaiConfig()
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
                .minted(store.state.connectedAddress)
                .call()
                .then((amount) => {
                    store.dispatch("setStateData", { name: "setBuyed", data: amount })
                })
        }
    }

    const buy = (amount) => {
        let value = store.state.web3.utils.toHex(
            store.state.nftConfig.price * amount
        )

        if (store.state.freeSlots > 0) {
            value = 0
        }

        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: value,
            data: store.state.contract.methods.mint(amount).encodeABI(),
        }
        return store.state.web3.eth.sendTransaction(
            transactionParams,
            (err, hash) => {
                const interval = setInterval(function() {
                    store.state.web3.eth.getTransactionReceipt(hash, function(err, rec) {
                        if (rec) {
                            store.dispatch("setStateData", {
                                name: "setMinting",
                                data: false,
                            })
                            getBuyed()
                            getFreeSlots()
                            clearInterval(interval)
                        }
                    })
                }, 1000)

                if (err) {
                    store.dispatch("setStateData", { name: "setMinting", data: false })
                    clearInterval(interval)
                }
            }
        )
    }

    const getBalance = () => {
        store.state.contract.methods
            .balanceOf(store.state.connectedAddress)
            .call()
            .then((balance) => {
                store.dispatch("setStateData", { name: "setBalance", data: balance })
            })
    }

    const getFreeSlots = () => {
        store.state.contract.methods
            .freeSlots()
            .call()
            .then((slots) => {
                store.dispatch("setStateData", { name: "setFreeSlots", data: slots })
            })
    }

    const init = async() => {
        const ethereum = await detectEthereumProvider()
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
        getFreeSlots()

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
                getFreeSlots()
                getTotalSupply()

                if (store.state.connectedAddress != "") {
                    getBalance()
                }
            }, 500)
        })

        store.dispatch("setStateData", { name: "setInit", data: true })
    }

    return {
        init,
        requestAccount,
        buy,
        getBuyed,
        getFreeSlots,
    }
}