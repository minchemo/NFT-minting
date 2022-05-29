/**
 * Moralis
 */
const Moralis = require("moralis/node")

const serverUrl = "https://myc7cmei4pwc.usemoralis.com:2053/server"
const appId = "cjFbq92qPtksnfyWGn07VecO45AeRI9rMAV5Ygvy"
const masterKey = "YzeYr56XOXKtIMl0rgu7QQB1vQ62wduKg8uIqEgH"

/**
 * Express
 */
const express = require("express")
const app = express()
const port = 9876
const cors = require("cors")

/**
 * web3
 */

const web3 = require("web3")

const initRouter = async() => {
    app.use(cors())
    app.get("/getGirls", async(req, res) => {
        const query = req.query

        const data = await getRes(query)

        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(data))
    })

    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}

const getRes = async(query) => {
    return new Promise(async(resolve, rejected) => {
        let json = {
            success: true,
            data: [],
            msg: "",
        }

        if (query.address) {
            const validAddr = web3.utils.isAddress(query.address)

            if (!validAddr) {
                json["success"] = false
                json["msg"] = "invalid address"

                resolve(json)
            } else {
                const nfts = await getNFTs(query.address)
                json["data"] = nfts.result.length > 0 ? minifyData(nfts.result) : []
                resolve(json)
            }
        } else {
            json["success"] = false
            json["msg"] = "no address"
            resolve(json)
        }
    })
}

const getNFTs = async(address) => {
    await Moralis.start({ serverUrl, appId, masterKey })

    const options = {
        chain: "eth",
        address: address,
        token_address: "0x0f7f90a5274ec882597be323f43347bf73e09bce",
    }
    const nfts = await Moralis.Web3API.account.getNFTsForContract(options)
    return nfts
}

const minifyData = (data) => {
    let list = []
    data.forEach((element) => {
        list.push(parseInt(element.token_id))
    })
    list.sort()
    return list
}

initRouter()
