import hre, { ethers } from "hardhat";
const initAmount = ethers.utils.parseEther("10");

async function main() {
    // 部署SSToken
    const SSToken = await ethers.getContractFactory("SSToken");
    const ssToken = await SSToken.deploy(initAmount);
    await ssToken.deployed();

    // 部署CCToken
    const CCToken = await ethers.getContractFactory("CCToken");
    const ccToken = await CCToken.deploy(initAmount);
    await ccToken.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
