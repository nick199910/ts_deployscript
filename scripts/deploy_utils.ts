import hre, { ethers } from "hardhat";
const initAmount = ethers.utils.parseEther("10");

async function main() {
    // 部署multicall
    const Multicall = await ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
