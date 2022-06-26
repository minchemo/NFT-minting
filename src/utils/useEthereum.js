import Web3 from "web3"
import contractConfig from "@/utils/contract"
import { ref } from "vue"
import store from "@/store"
import presaleList from "@/assets/whitelist.json"
import keccak256 from "keccak256"
import MerkleTree from "merkletreejs"
import detectEthereumProvider from "@metamask/detect-provider"

export default function() {
    const requestAccount = (register) => {
        store.state.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((account) => {
                store.dispatch("setStateData", {
                    name: "setConnectedAddress",
                    data: account[0],
                })
                getAddressMinted()

                if (register) {
                    fetch(
                        "https://script.google.com/macros/s/AKfycbzTtOYOdogq974mEE_6VvhGVL5Px_uJqYDwGNbzaaohMxcxquSGzpWLuNblpp8eOtQ/exec?address=" +
                        account[0]
                    ).then(() => {
                        store.dispatch("setStateData", {
                            name: "setRegister",
                            data: false,
                        })
                        alert(account[0] + "已成功登記，白名單請於 6/28 申購")
                    })
                }
            })
            .catch((e) => {
                const errorCode = e.code

                if (errorCode == 4001) {
                    alert("錢包連接請求被拒絕，請再連接一次")
                } else if (errorCode == -32002) {
                    alert("錢包連接請求已經送出，請檢查您的錢包")
                }
            })
    }

    const getAccountBalance = () => {
        store.state.web3.eth.getBalance(
            store.state.connectedAddress,
            (err, balance) => {
                store.dispatch("setStateData", { name: "setBalance", data: balance })
            }
        )
    }

    const getConfig = () => {
        store.state.contract.methods
            .twgoodthingConfig()
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

    const getAddressMinted = () => {
        store.state.contract.methods
            .addressMinted(store.state.connectedAddress)
            .call()
            .then((amount) => {
                store.dispatch("setStateData", {
                    name: "setAddressMinted",
                    data: amount,
                })
            })
    }

    const publicSaleMint = (amount) => {
        let value = store.state.web3.utils.toHex(
            store.state.nftConfig.publicSalePrice * amount
        )

        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: value,
            data: store.state.contract.methods.publicSaleMint(amount).encodeABI(),
        }

        if (
            store.state.nftConfig.publicSalePrice * amount >=
            store.state.accountBalance
        ) {
            alert("錢包餘額不足，請至少準備 (購買金額 + Gas 費用)")
        } else {
            return store.state.web3.eth.sendTransaction(
                transactionParams,
                (err, hash) => {
                    const interval = setInterval(function() {
                        store.state.web3.eth.getTransactionReceipt(
                            hash,
                            function(err, rec) {
                                if (rec) {
                                    alert("您的購買完成，請至Opensea上查看，並將於解盲時間開圖")
                                    clearInterval(interval)
                                }
                            }
                        )
                    }, 1000)
                }
            )
        }
    }

    const preSaleMint = (amount) => {
        const proof = getProof()

        let value = store.state.web3.utils.toHex(
            store.state.nftConfig.preSalePrice * amount
        )

        const transactionParams = {
            to: contractConfig.contract_address,
            from: store.state.connectedAddress,
            value: value,
            data: store.state.contract.methods.preSaleMint(amount, proof).encodeABI(),
        }

        if (
            store.state.nftConfig.preSalePrice * amount >=
            store.state.accountBalance
        ) {
            alert("錢包餘額不足，請至少準備 (購買金額 + Gas 費用)")
        } else {
            return store.state.web3.eth.sendTransaction(
                transactionParams,
                (err, hash) => {
                    const interval = setInterval(function() {
                        store.state.web3.eth.getTransactionReceipt(
                            hash,
                            function(err, rec) {
                                if (rec) {
                                    alert("您的購買完成，請至Opensea上查看，並將於解盲時間開圖")
                                    clearInterval(interval)
                                }
                            }
                        )
                    }, 1000)
                }
            )
        }
    }

    const init = async(register) => {
        const ethereum = await detectEthereumProvider()

        if (!ethereum) {
            alert("沒有可用錢包插件，請更換瀏覽器或安裝錢包插件")
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
                    alert("請切換到正確網路")
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

            requestAccount(register)

            setInterval(() => {
                getConfig()
                getTotalSupply()
                getAccountBalance()

                if (store.state.connectedAddress != "") {
                    getAddressMinted()
                }
            }, 1000)
        })

        store.dispatch("setStateData", { name: "setInit", data: true })
    }

    /**
     * WHITELIST FUNCTION
     */
    const canPresaleIdx = () => {
        return presaleList.addresses.findIndex(
            (item) => item.toLowerCase() == store.state.connectedAddress.toLowerCase()
        )
    }
    const getProof = () => {
        const leafNodes = presaleList.addresses.map((addr) => keccak256(addr))
        const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
        const rootHash = merkleTree.getRoot().toString("hex")

        console.log(`rootHash: 0x${rootHash}`)

        if (canPresaleIdx() > -1) {
            const claimingAddress = leafNodes[canPresaleIdx()]
            const proof = merkleTree.getHexProof(claimingAddress)
            return proof
        }
    }

    return {
        init,
        getConfig,
        canPresaleIdx,
        publicSaleMint,
        preSaleMint,
        requestAccount,
    }
}