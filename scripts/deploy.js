async function main() {
  const myNFTFactory = await ethers.getContractFactory("MyNFT");
  const myNFT = await myNFTFactory.deploy();
  console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// 0x63FC2dAd69186B1dDd331CA4057b231d0F83Ab12

// minted nft hash: 0x9a3f722a3ed1eb60dfbb38db22591f7a8287e81b3820edab7e8945d3e6960574
