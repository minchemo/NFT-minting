import Web3 from "web3"
import contractConfig from "@/utils/contract"
import contractPetConfig from "@/utils/contract_pet"
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
                    store.dispatch("setStateData", { name: "showAlert", data: true })
                    store.dispatch("setStateData", {
                        name: "alertMsg",
                        data: "User rejected the request, Please connect again.",
                    })
                } else if (errorCode == -32002) {
                    store.dispatch("setStateData", { name: "showAlert", data: true })
                    store.dispatch("setStateData", {
                        name: "alertMsg",
                        data: "Request already pending, please check on your Metamask.",
                    })
                }
            })
    }

    async function asyncRequestAccount() {
        const account = await store.state.ethereum.request({
            method: "eth_requestAccounts",
        })
        return account
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

    const allowlistMint = (proof) => {
        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: 0,
        }

        if (store.state.nftConfig.phase == 1) {
            return store.state.contract.methods
                .claimPotted(proof)
                .send(transactionParams)
                .on("transactionHash", function(hash) {
                    store.dispatch("setStateData", { name: "showAlert", data: true })
                    store.dispatch("setStateData", {
                        name: "alertMsg",
                        data: "Transaction pending...",
                    })
                    const interval = setInterval(function() {
                        store.state.web3.eth.getTransactionReceipt(
                            hash,
                            function(err, rec) {
                                if (rec) {
                                    store.dispatch("setStateData", {
                                        name: "showAlert",
                                        data: false,
                                    })
                                    store.dispatch("setStateData", {
                                        name: "setMinting",
                                        data: false,
                                    })
                                    clearInterval(interval)
                                }
                            }
                        )
                    }, 1000)
                })
                .on("error", function(err) {
                    store.dispatch("setStateData", { name: "setMinting", data: false })
                    clearInterval(interval)
                })
        } else if (store.state.nftConfig.phase == 2) {
            return store.state.contract.methods
                .getPotted(proof)
                .send(transactionParams)
                .on("transactionHash", function(hash) {
                    store.dispatch("setStateData", { name: "showAlert", data: true })
                    store.dispatch("setStateData", {
                        name: "alertMsg",
                        data: "Transaction pending...",
                    })
                    const interval = setInterval(function() {
                        store.state.web3.eth.getTransactionReceipt(
                            hash,
                            function(err, rec) {
                                if (rec) {
                                    store.dispatch("setStateData", {
                                        name: "showAlert",
                                        data: false,
                                    })
                                    store.dispatch("setStateData", {
                                        name: "setMinting",
                                        data: false,
                                    })
                                    clearInterval(interval)
                                }
                            }
                        )
                    }, 1000)
                })
                .on("error", function(err) {
                    store.dispatch("setStateData", { name: "setMinting", data: false })
                    clearInterval(interval)
                })
        }
    }

    const publicMint = (quantity) => {
        let value = store.state.web3.utils.toHex(
            store.state.nftConfig.publicPrice * quantity
        )

        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: value,
        }

        return store.state.contract.methods
            .buyPotted(quantity)
            .send(transactionParams)
            .on("transactionHash", function(hash) {
                const interval = setInterval(function() {
                    store.dispatch("setStateData", { name: "showAlert", data: true })
                    store.dispatch("setStateData", {
                        name: "alertMsg",
                        data: "Transaction pending...",
                    })
                    store.state.web3.eth.getTransactionReceipt(hash, function(err, rec) {
                        if (rec) {
                            store.dispatch("setStateData", {
                                name: "showAlert",
                                data: false,
                            })
                            store.dispatch("setStateData", {
                                name: "setMinting",
                                data: false,
                            })
                            clearInterval(interval)
                        }
                    })
                }, 1000)
            })
            .on("error", function(err) {
                store.dispatch("setStateData", { name: "setMinting", data: false })
                clearInterval(interval)
            })
    }

    const init = async() => {
        const ethereum = await detectEthereumProvider()
        if (!ethereum) {
            store.dispatch("setStateData", { name: "showAlert", data: true })
            store.dispatch("setStateData", {
                name: "alertMsg",
                data: "No wallet plugin is available! Please change your browser or install wallet plugin.",
            })

            return
        }

        let web3 = new Web3(ethereum)
        let contract = new web3.eth.Contract(
            contractConfig.ABI,
            contractConfig.contract_address
        )

        let contractPet = new web3.eth.Contract(
            contractPetConfig.ABI,
            contractPetConfig.contract_address
        )

        store.dispatch("setStateData", { name: "setEthereum", data: ethereum })
        store.dispatch("setStateData", { name: "setWeb3", data: web3 })
        store.dispatch("setStateData", { name: "setContract", data: contract })
        store.dispatch("setStateData", {
            name: "setContractPet",
            data: contractPet,
        })

        getConfig()

        ethereum.on("chainChanged", function(id) {
            store.state.web3.eth.getChainId().then((id) => {
                if (id != store.state.networkId) {
                    store.dispatch("setStateData", { name: "showAlert", data: true })
                    store.dispatch("setStateData", {
                        name: "alertMsg",
                        data: "Please Change to mainnet.",
                    })
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
                store.dispatch("setStateData", { name: "showAlert", data: true })
                store.dispatch("setStateData", {
                    name: "alertMsg",
                    data: "Please Change to mainnet.",
                })
                return
            }
            ethereum.on("accountsChanged", function(accounts) {
                store.dispatch("setStateData", {
                    name: "setConnectedAddress",
                    data: accounts[0],
                })
            })

            // requestAccount()

            setInterval(() => {
                getConfig()
                getTotalSupply();

                if (store.state.connectedAddress != "") {
                    setInterval(() => {
                        getClaimed(store.state.connectedAddress)
                        getMinted(store.state.connectedAddress)
                        getPublicMinted(store.state.connectedAddress)
                        getPetBalance(store.state.connectedAddress)
                    }, 1000)
                }
            }, 1000)
        })

        store.dispatch("setStateData", { name: "setInit", data: true })
    }

    const getClaimed = (address) => {
        store.state.contract.methods
            .claimed(address)
            .call()
            .then((data) => {
                store.dispatch("setStateData", { name: "setClaimed", data: data })
            })
    }
    const getMinted = (address) => {
        store.state.contract.methods
            .presaleMinted(address)
            .call()
            .then((data) => {
                store.dispatch("setStateData", { name: "setMinted", data: data })
            })
    }
    const getPublicMinted = (address) => {
        store.state.contract.methods
            .publicMinted(address)
            .call()
            .then((data) => {
                store.dispatch("setStateData", { name: "setPublicMinted", data: data })
            })
    }
    const getPetBalance = (address) => {
        store.state.contractPet.methods
            .balanceOf(address)
            .call()
            .then((data) => {
                store.dispatch("setStateData", { name: "setPetBalance", data: data })
            })
    }

    /**
     * read
     */
    async function getTokensOfOwner(address) {
        const data = await store.state.contract.methods
            .tokensOfOwner(address)
            .call()
        return data
    }

    async function getPottedGene(tokenId) {
        const data = await store.state.contract.methods.potteds(tokenId).call()
        return data
    }
    async function getTokenURI(tokenId) {
        const data = await store.state.contract.methods.tokenURI(tokenId).call()
        return data
    }
    async function previewPotted(tokenId, revealNum) {
        const data = await store.state.contract.methods
            .previewPotted(tokenId, revealNum)
            .call({ from: store.state.connectedAddress })
        return data
    }
    /**
     * write
     */
    async function setReveal(tokenId, revealNum, onReceipt, onError) {
        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
        }
        return store.state.contract.methods
            .setPottedReveal(tokenId, revealNum)
            .send(transactionParams)
            .on("receipt", (e) => {
                onReceipt(e)
            })
            .on("error", (e) => {
                onError(e)
            })
    }
    async function reroll(tokenId, petId, onReceipt, onError) {
        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
        }
        return store.state.contract.methods
            .rerollPotted(tokenId, petId)
            .send(transactionParams)
            .on("receipt", (e) => {
                onReceipt(e)
            })
            .on("error", (e) => {
                onError(e)
            })
    }

    return {
        init,
        requestAccount,
        asyncRequestAccount,

        getTokenURI,
        getPottedGene,
        previewPotted,
        reroll,
        setReveal,
        getTokensOfOwner,

        allowlistMint,
        publicMint,
    }
}