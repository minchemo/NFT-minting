import Web3 from "web3"
import contractConfig from "@/utils/contract"
import { ref } from "vue"
import store from "@/store"
import detectEthereumProvider from "@metamask/detect-provider"

export default function() {
    const requestAccount = async() => {
        if (store.state.connectedAddress != "") {
            return
        }

        const ethereum = await detectEthereumProvider()

        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((account) => {
                store.dispatch("setConnectedAddress", account[0])

                getSupply()
                checkMintOpen()
                getBuyed()
            })
            .catch((e) => {
                const errorCode = e.code
            })
    }

    const getSupply = () => {
        store.state.contract.methods
            .totalSupply()
            .call()
            .then((amount) => {
                store.dispatch("setStateData", { name: "setTotalSupply", data: amount })
            })
    }

    const checkMintOpen = () => {
        store.state.contract.methods
            .openCatWay()
            .call()
            .then((status) => {
                store.dispatch("setStateData", { name: "setMintOpen", data: status })
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

    const mint = (amount) => {
        if (store.state.mintOpen) {
            if (store.state.buyed >= 5) {
                alert("You mint too lot")
                return
            }
            const transactionParams = {
                to: contractConfig.contract_address,
                from: store.state.connectedAddress,
                value: 0,
                data: store.state.contract.methods.cattttttttt(amount).encodeABI(),
            }
            return store.state.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParams],
            })
        }
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
                getSupply()
                checkMintOpen()
                if (store.state.connectedAddress != "") {
                    getBuyed()
                }
            }, 1000)
        })

        store.dispatch("setStateData", { name: "setInit", data: true })
    }

    return {
        mint,
        requestAccount,
        init,
    }
}