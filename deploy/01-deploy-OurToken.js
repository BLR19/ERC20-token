const { network } = require("hardhat")
const { developmentChains, INITIAL_SUPPLY } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const ourtoken = await deploy("OurToken", {
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    console.log(`OurToken deployed at ${ourtoken.address} !`);

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(ourtoken.address, [])
    }
    log("___________________________________")
}

module.exports.tags = ["all", "ourtoken"]
