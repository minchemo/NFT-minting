import Web3 from "web3";
import contractConfig from "@/utils/contract";
import { ref } from "vue";
import store from "@/store";

export default function () {
    const requestAccount = () => {
        if (store.state.connectedAddress != '') {
            return;
        }
        const { ethereum } = window;

        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((account) => {

                store.dispatch('setConnectedAddress', account[0]);

                // getSupply();
                // getMintedAmount();
            })
            .catch((e) => {
                const errorCode = e.code;

                if (errorCode == 4001) {
                    // showAlert("User rejected the request, Please connect again.");
                } else if (errorCode == -32002) {
                    // showAlert(
                    //     "Request already pending, please check on your Metamask."
                    // );
                }
            });
    };

    // const getConfig = () => {
    //     contract.value.methods
    //         .nftConfig()
    //         .call()
    //         .then((config) => {
    //             nftConfig.value = config;

    //             console.log(config);

    //             if (loading.value) {
    //                 setTimeout(() => {
    //                     loading.value = false;
    //                 }, 1000);
    //             }
    //         });
    // };

    // const getSupply = () => {
    //     contract.value.methods
    //         .totalSupply()
    //         .call()
    //         .then((supply) => {
    //             nftConfig.value.totalSupply = supply;
    //         });
    // };

    // const getMintedAmount = () => {
    //     contract.value.methods
    //         .addressMinted(connectedAddress.value)
    //         .call()
    //         .then((amount) => {
    //             mintedAmount.value = amount;

    //             if (nftConfig.value.isSale) {
    //                 if (amount >= nftConfig.value.maxMint) {
    //                     exceedMaxAmount.value = true;
    //                 } else {
    //                     exceedMaxAmount.value = false;
    //                 }
    //             }
    //         });
    // };

    // const publicSaleMint = () => {
    //     if (exceedMaxAmount.value) {
    //         showAlert("Can't mint more.");
    //         return;
    //     }

    //     const { ethereum } = window;

    //     let value = 0;
    //     if (nftConfig.value.totalSupply > 300) {
    //         value = web3.value.utils.toHex(
    //             nftConfig.value.salePrice * publicSaleSelectedAmount.value
    //         );
    //     }

    //     const transactionParams = {
    //         to: contractConfig.contract_address,
    //         from: connectedAddress.value,
    //         gasLimit: web3.value.utils.toHex(300000),
    //         value: value,
    //         data: contract.value.methods
    //             .mint(publicSaleSelectedAmount.value)
    //             .encodeABI(),
    //     };
    //     return ethereum.request({
    //         method: "eth_sendTransaction",
    //         params: [transactionParams],
    //     });
    // };

    // const showAlert = (msg) => {
    //     alertMsg.value = msg;
    //     isShowAlert.value = true;
    // };

    // const init = () => {

    //     const { ethereum } = window;

    //     if (!ethereum) {
    //         showAlert(
    //             "No wallet plugin is available! Please change your browser or install wallet plugin."
    //         );
    //         return;
    //     }

    //     web3.value = new Web3(ethereum);
    //     contract.value = new web3.value.eth.Contract(
    //         contractConfig.ABI,
    //         contractConfig.contract_address
    //     );
    //     getConfig();

    //     ethereum.on("chainChanged", function (id) {
    //         web3.value.eth.getChainId().then((id) => {
    //             if (id != networkId.value) {
    //                 error.value = true;
    //                 clearInterval(interval.value);
    //             } else {
    //                 window.location.reload();
    //             }
    //         });
    //     });

    //     web3.value.eth.getChainId().then((id) => {
    //         if (id != networkId.value) {
    //             showAlert("Please Change to mainnet.");
    //             return;
    //         }
    //         ethereum.on("accountsChanged", function (accounts) {
    //             connectedAddress.value = accounts[0];
    //         });
    //         requestAccount();
    //         interval.value = setInterval(() => {
    //             getConfig();

    //             if (connectedAddress.value) {
    //                 getSupply();
    //                 getMintedAmount();
    //             }
    //         }, 1000);
    //     });
    // }

    return {
        requestAccount
    };
}