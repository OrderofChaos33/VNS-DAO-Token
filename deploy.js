
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const tokenName = "Vanguard Society";
    const tokenSymbol = "VNS";
    const initialMint = hre.ethers.utils.parseEther("3000000"); // 3,000,000 tokens
    const minDelay = 86400; // 1 day in seconds
    const ownerAddress = "0x7678a845011f33066e31b9226a794d0404a5b390";

    const DAOToken = await hre.ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.deploy(tokenName, tokenSymbol, initialMint);
    await daoToken.deployed();
    console.log("DAO Token deployed to:", daoToken.address);

    const Timelock = await hre.ethers.getContractFactory("Timelock");
    const timelock = await Timelock.deploy(minDelay, [ownerAddress], [ownerAddress]);
    await timelock.deployed();
    console.log("Timelock deployed to:", timelock.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
