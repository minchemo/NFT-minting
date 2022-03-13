<template>
  <div class="error-page" v-if="error">
    <p>
      You're not able to visit this website, Please check your metamask network
      option (Mainnet only).<br />
    </p>
  </div>
  <div class="container" v-else>
    <div class="main">
      <div class="alert-msg" v-if="isShowAlert" @click="isShowAlert = false">
        {{ alertMsg }}
      </div>
      <div
        class="alert-msg-overlay"
        v-if="isShowAlert"
        @click="isShowAlert = false"
      ></div>
      <div class="header">
        <h1 class="name">Explosion</h1>
      </div>

      <div class="mint">
        <template v-if="connectedWalletAddress">
          <!--Loading-->
          <template v-if="loading"> Loading... </template>
          <template v-else-if="!explosionConfig.isSale">
            <div class="sold-out">Sale not start yet.</div>
          </template>
          <template
            v-else-if="
              parseInt(totalSupply) >= parseInt(explosionConfig.maxSupply)
            "
          >
            <div class="sold-out">
              We sold out.<br /><br />
              But you can buy it on OpenSea now.
            </div>
          </template>
          <!--Public-Sale-->
          <template v-else-if="explosionConfig.isSale">
            <div class="supply">
              {{ totalSupply }} / {{ explosionConfig.maxSupply }}
            </div>
            <p class="public-msg">
              Sale is now live, maximum mint per wallet =>
              {{ explosionConfig.maxMint }}<br /><br />

              First 300 free mint, then 0.01 ETH each.
            </p>
            <div class="selection">
              <p>Select Amount</p>
              <div
                class="item"
                v-for="(amount, i) in parseInt(explosionConfig.maxMint)"
                :key="i"
                v-bind:class="{ selected: publicSaleSelectedAmount == amount }"
                @click="publicSaleSelectedAmount = amount"
              >
                {{ amount }}
              </div>
              <!-- <p>Amount</p> -->
            </div>
            <div class="mint-button" @click="publicSaleMint">MINT</div>

            <div class="minted">You have minted: {{ mintedAmount }}</div>
          </template>
        </template>
        <template v-else>
          <div class="init-warning">Please connect to Metamask wallet</div>
        </template>
      </div>

      <div class="subtitle">
        Generative art with 4 types shape and colorful explosion particle.
        <br /><br />
        After sold out, <br />we will airdrop to a random holder 0.1 ETH
        everyday for 50 days. <br /><br />
        The Contract was optimized (ERC721A) , this will save your gas.
        <br /><br />
        Keep explosion!
        <br /><br />
        <div class="warning">
          <b>💥Explosion NFT after-sale income distribute💥</b> : <br /><br />
          19 % : holders airdrop for 50 days.<br />
          31 % :
          <a
            href="https://twitter.com/Ukraine/status/1497594592438497282"
            target="_blank"
            >@Ukraine</a
          >
          Cryptocurrency donations.<br />
          40 % : Dev and Artists. <br />
          10 % : Community. <br /><br />

          People should be keep explosion, but war should not be.
        </div>
      </div>
    </div>
    <div class="bg">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="clouds"></div>
    </div>
    <div class="connect-wallet" @click="requestAccount()">
      <div v-if="connectedWalletAddress">
        {{ connectedWalletAddress.substring(-5, 7) }}...{{
          connectedWalletAddress.slice(37)
        }}
      </div>
      <div v-else>Connect Wallect</div>
    </div>

    <div class="tip">↓ scroll down to see sample arts ↓</div>
    <div class="links">
      <a
        target="_blank"
        href="https://etherscan.io/token/0xc444beea405fe2340051b5d98b4c6174db8b37d1"
        >Etherscan</a
      >
      <a target="_blank" href="https://opensea.io/collection/explosion-nft/"
        >Opensea</a
      >
      <a target="_blank" href="https://twitter.com/explosionnft_io">Twitter</a>
      <a target="_blank" href="https://discord.com/invite/Zp69q89sJE"
        >Discord</a
      >
    </div>
  </div>
  <div class="gallery">
    <img
      v-for="i in 8"
      :key="i"
      :src="require(`@/assets/images/${i - 1}.jpg`)"
      alt=""
      srcset=""
    />
  </div>
</template>

<script>
import Web3 from 'web3';
import contractConfig from '@/utils/contract';
import { onMounted, ref } from "vue";
import "@/assets/scripts/canvas.js";

export default {
  name: 'App',
  setup() {
    const targetNetworkId = ref(1);
    const connectedWalletAddress = ref();

    const mintedAmount = ref(0);
    const totalSupply = ref(0);
    const explosionConfig = ref({
      isSale: false,
      maxMint: 5,
      salePrice: 10000000000000000,
      maxSupply: 3000
    });
    const publicSaleSelectedAmount = ref(1);
    const contract = ref();

    const exceedMaxAmount = ref(false);

    const takingPicture = ref(false);
    const web3 = ref();

    const loading = ref(true);
    const error = ref(false);

    const isShowAlert = ref(false);
    const alertMsg = ref('');

    const interval = ref();

    const requestAccount = () => {
      if (connectedWalletAddress.value) {
        return;
      }
      const { ethereum } = window;

      ethereum.request({ method: 'eth_requestAccounts' }).then((account) => {
        connectedWalletAddress.value = account[0];
        getSupply();
        getMintedAmount();
      }).catch(e => {
        const errorCode = e.code;

        if (errorCode == 4001) {
          showAlert('User rejected the request, Please connect again.');
        } else if (errorCode == -32002) {
          showAlert('Request already pending, please check on your Metamask.');
        }

      });
    }

    const getConfig = () => {
      contract.value.methods
        .explosionConfig().call().then((config) => {
          explosionConfig.value = config;

          if (loading.value) {
            setTimeout(() => {

              loading.value = false;
            }, 1000);
          }
        });
    };

    const getSupply = () => {
      contract.value.methods
        .totalSupply().call().then((supply) => {
          totalSupply.value = supply;
        });
    }

    const getMintedAmount = () => {
      contract.value.methods
        .addressMinted(connectedWalletAddress.value).call().then((amount) => {
          mintedAmount.value = amount;

          if (explosionConfig.value.isSale) {
            if (amount >= explosionConfig.value.maxMint) {
              exceedMaxAmount.value = true;
            } else {
              exceedMaxAmount.value = false;
            }
          }
        });
    }

    const publicSaleMint = () => {
      if (exceedMaxAmount.value) {
        showAlert("Can't mint more.")
        return
      }

      const { ethereum } = window;

      let value = 0;
      if (totalSupply.value > 300) {
        value = web3.value.utils.toHex(explosionConfig.value.salePrice * publicSaleSelectedAmount.value);
      }

      const transactionParams = {
        to: contractConfig.contract_address,
        from: connectedWalletAddress.value,
        gasLimit: web3.value.utils.toHex(300000),
        value: value,
        data: contract.value.methods.mint(publicSaleSelectedAmount.value).encodeABI()
      };
      return ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams]
      })
    }

    const showAlert = (msg) => {
      alertMsg.value = msg;
      isShowAlert.value = true;
    }

    onMounted(() => {
      const { ethereum } = window;

      if (!ethereum) {
        showAlert('No wallet plugin is available! Please change your browser or install wallet plugin.');
        return;
      }

      web3.value = new Web3(ethereum);
      contract.value = new web3.value.eth.Contract(contractConfig.ABI, contractConfig.contract_address)
      getConfig();

      ethereum.on('chainChanged', function (id) {
        web3.value.eth.getChainId().then((id) => {

          if (id != targetNetworkId.value) {
            error.value = true;
            clearInterval(interval.value);
          } else {
            window.location.reload();
          }
        })
      })

      web3.value.eth.getChainId().then((id) => {
        if (id != targetNetworkId.value) {
          showAlert('Please Change to mainnet.')
          return
        }
        ethereum.on('accountsChanged', function (accounts) {
          connectedWalletAddress.value = accounts[0]
        })
        requestAccount();
        interval.value = setInterval(() => {
          getConfig();

          if (connectedWalletAddress.value) {
            getSupply();
            getMintedAmount();
          }
        }, 1000);

      })
    })

    return {
      isShowAlert, alertMsg, error, loading, connectedWalletAddress,
      publicSaleSelectedAmount, mintedAmount,
      contract, totalSupply, explosionConfig, takingPicture,
      requestAccount, getConfig, getSupply,
      publicSaleMint
    }
  },
}
</script>

<style lang="scss">
body {
  background: #000;
}
canvas {
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>

<style lang="scss" scoped>
@import url("./assets/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");

$secondaryColor: #fff;
$primaryColor: #e5d9c3;
$hoverColor: #fff;
$family1: "Righteous", cursive;
$family2: "Righteous", cursive;

.error-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $family2;
  text-align: center;
  line-height: 1.5;
}

.container {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 2.5vw;
  font-family: $family1;
  color: $secondaryColor;

  .links {
    position: absolute;
    z-index: 1;
    left: 2.5vw;
    top: 2.5vw;
    display: flex;
    flex-direction: column;
    a {
      margin-bottom: 1vw;
      color: #fff;
      font-size: 1vw;
    }
  }

  .tip {
    position: absolute;
    bottom: 2vw;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1vw;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    opacity: 1;
  }

  .main {
    position: absolute;
    width: 25vw;
    height: 80vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 10;

    .header {
      .name {
        font-size: 2vw;
        letter-spacing: 10px;
        animation: spacing 5s;

        @keyframes spacing {
          from {
            letter-spacing: -25px;
          }
          to {
            letter-spacing: 10px;
          }
        }
      }
    }

    .alert-msg {
      font-family: "Noto Sans TC";
      font-weight: bolder;
      line-height: 1.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      background: rgba($color: #fff, $alpha: 0.2);
      width: 50%;
      height: auto;
      padding: 20px 20px;
      backdrop-filter: blur(3px);
      opacity: 1;
      animation: fadeIn 0.35s;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
        background: rgba($color: #fff, $alpha: 0.1);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
    .alert-msg-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9;
      background: rgba($color: #000000, $alpha: 0.4);
    }
    .mint {
      font-family: $family2;
      text-align: center;
      .init-warning {
        text-align: left;
      }
      .public-msg {
        margin-top: 0.8vw;
      }
      .supply {
        font-family: "Noto Sans TC";
        font-weight: bolder;
        font-size: 1vw;
      }
      .selection {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .item {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          background-color: transparent;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
          color: #fff;
          &.selected {
            background-color: #fff;
            color: #000;
          }
          &:hover {
            background-color: #fff;
            color: #000;
            cursor: pointer;
          }
        }
      }
      .mint-button {
        font-family: $family1;
        background-color: transparent;
        display: inline-block;
        font-size: 1.5vw;
        padding: 0.5vw 1.3vw;
        border-radius: 1000px;
        margin-top: 1vw;
        transition: all 0.3s;
        border: 1px solid #fff;
        &:hover {
          cursor: pointer;
          color: #000;
          background-color: $hoverColor;
        }
      }
      .minted {
        margin-top: 20px;
        font-size: 18px;
      }
    }
    .subtitle {
      margin-top: 1vw;
      font-size: 0.8vw;
      line-height: 1.2;
      font-family: $family2;
      white-space: nowrap;
      .warning {
        position: relative;
        padding: 15px;
        background: #fff;
        color: #000;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: transparent;
          border: 1px solid #fff;
          z-index: -1;
          right: -1.5%;
          top: 5%;
          transition: all 0.3s;
        }
      }
    }
  }

  .info {
    position: relative;
    width: 45vw;
    height: 45vw;
    padding: 5vw 2.5vw;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    .about {
      .item {
        margin-bottom: 1vw;
        h2 {
          position: relative;
          font-size: 1.2vw;
          background-color: $primaryColor;
          display: inline-block;
          padding: 0.4vw 1vw;
          border-radius: 1000px;
          margin-bottom: 0.5vw;
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: $hoverColor;
            z-index: -1;
            right: -2.5%;
            top: 9%;
            border-radius: 1000px;
            transition: all 0.3s;
          }
        }
        p {
          padding-left: 0.5vw;
          line-height: 1.2;
          font-size: 1vw;
          text-align: justify;
          font-family: $family2;
        }
        .team {
          display: flex;
          align-items: center;
          margin-top: 1vw;
          .member {
            margin-right: 1vw;
            img {
              border-radius: 1vw;
              width: 10vw;
            }
            p {
              font-size: 1vw;
              font-family: $family2;
            }
          }
        }
      }
    }
  }

  .connect-wallet {
    right: 2vw;
    top: 2vw;
    position: absolute;
    background-color: #fff;
    color: #000;
    padding: 1vw 2vw;
    font-size: 1vw;
    transition: all 0.2s;
    font-family: $family2;
    border: 1px solid transparent;
    z-index: 1;
    &:hover {
      cursor: pointer;
      color: #fff;
      background-color: transparent;
      border: 1px solid #fff;
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: transparent;
      border: 1px solid #fff;
      z-index: -1;
      right: -3.5%;
      top: 12%;
      transition: all 0.3s;
    }
  }
}

.gallery {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  img {
    width: 100%;
  }
}

@media screen and (max-width: 767px) {
  .container {
    padding: 50px;
    height: 140vh;
    flex-direction: column;
    padding-top: 70px;

    .links {
      position: absolute;
      z-index: 1;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      a {
        margin-bottom: 1vw;
        color: #fff;
        font-size: 18px;
      }
    }

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      z-index: -1;
      opacity: 0.4;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    .main {
      width: 90vw;
      height: auto;
      padding: 30px;
      border-radius: 30px;
      flex-direction: column;
      &::after {
        right: -1.5%;
        top: 1%;
        border-radius: 30px;
      }
      &:hover {
        &::after {
          right: -2.5%;
          top: 2%;
        }
      }

      .header {
        .name {
          font-size: 24px;
          letter-spacing: 5px;
          animation: spacing 3s;

          @keyframes spacing {
            from {
              letter-spacing: -25px;
            }
            to {
              letter-spacing: 5px;
            }
          }
        }
      }
      .mint {
        font-family: $family2;
        text-align: center;
        margin: 40px 0px;
        .supply {
          font-size: 24px;
        }
        .mint-button {
          font-size: 30px;
          padding: 12px 20px;
          margin-top: 32px;
        }
      }
      .subtitle {
        margin-top: 0;
        font-size: 18px;
        white-space: pre-wrap;
        .warning {
          padding: 15px;
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent;
            border: 1px solid #fff;
            z-index: -1;
            right: -2.5%;
            top: 2%;
            transition: all 0.3s;
          }
        }
      }
    }
    .info {
      position: relative;
      width: 90vw;
      height: auto;
      padding: 0;
      margin-top: 50px;
      .about {
        .item {
          margin-bottom: 24px;
          h2 {
            font-size: 24px;
            padding: 12px 24px;
            margin-bottom: 12px;
            &::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 100%;
              background: $hoverColor;
              z-index: -1;
              right: -2.5%;
              top: 9%;
              border-radius: 1000px;
              transition: all 0.3s;
            }
          }
          p {
            padding-left: 10px;
            padding-right: 10px;
            font-size: 18px;
          }
          .team {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            .member {
              margin-right: 0;
              img {
                border-radius: 20px;
                width: 40vw;
              }
              p {
                margin-top: 12px;
                width: auto;
                font-size: 20px;
              }
            }
          }
        }
      }
    }

    .connect-wallet {
      right: 30px;
      top: 30px;
      padding: 12px 24px;
      font-size: 18px;
    }
  }
  .gallery {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    img {
      width: 100%;
    }
  }
}
</style>
