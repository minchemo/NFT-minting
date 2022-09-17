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
            .config()
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

    const getRoothash = () => {
        store.state.contract.methods
            .rootHash()
            .call()
            .then((hash) => {
                store.dispatch("setStateData", { name: "setRootHash", data: hash })
            })
    }

    const getProp = (amount) => {
        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: 0,
            data: store.state.contract.methods.getProp().encodeABI(),
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

    const merkleHatchEgg = (proof) => {
        let value = store.state.web3.utils.toHex(store.state.nftConfig.price * 1)

        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: value,
            gasLimit: store.state.web3.utils.toHex(300000),
            data: store.state.contract.methods.allowlistHatchEgg(proof).encodeABI(),
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

    const hatchEgg = () => {
        let value = store.state.web3.utils.toHex(store.state.nftConfig.price * 1)

        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: value,
            gasLimit: store.state.web3.utils.toHex(300000),
            data: store.state.contract.methods.hatchEgg().encodeABI(),
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

    const getPetMinted = () => {
        store.state.contract.methods
            .petMinted(store.state.connectedAddress)
            .call()
            .then((status) => {
                store.dispatch("setStateData", { name: "setPetMinted", data: status })
            })
    }

    const getPropMinted = () => {
        store.state.contract.methods
            .propMinted(store.state.connectedAddress)
            .call()
            .then((status) => {
                store.dispatch("setStateData", { name: "setPropMinted", data: status })
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
                getPropMinted()
                getPetMinted()
                getTotalSupply()
                getRoothash()
            }, 1000)
        })

        store.dispatch("setStateData", { name: "setInit", data: true })
    }

    /**
     * PET read
     */
    async function getTokenURI(tokenId) {
        const data = await store.state.contract.methods
            .tokenUri(tokenId)
            .call()
        return data
    }

    async function getTokensOfOwner(address) {
        const data = await store.state.contract.methods
            .tokensOfOwner(address)
            .call()
        return data
    }

    return {
        init,
        requestAccount,
        getProp,
        hatchEgg,
        merkleHatchEgg,
        getTokenURI,
        getTokensOfOwner,
    }
}