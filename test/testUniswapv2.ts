import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
    async function deployOneYearLockFixture() {
        const lockedAmount = 1_000_000_000;
        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        const Lock = await ethers.getContractFactory("Lock");
        const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

        return { lock, unlockTime, lockedAmount };
    }

    it("Should set the right unlockTime", async function () {
        const { lock, unlockTime } = await loadFixture(
            deployOneYearLockFixture
        );

        // assert that the value is correct
        expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
            "You can't withdraw yet"
        );
    });
});
