require("dotenv").config();
const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
// console.log(JSON.stringify(contract.abi));
const contractAddress = "0x63FC2dAd69186B1dDd331CA4057b231d0F83Ab12";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// create mintNFT transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const txn = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const sign = web3.eth.accounts.signTransaction(txn, PRIVATE_KEY);
  sign
    .then((signedTxn) => {
      web3.eth.sendSignedTransaction(
        signedTxn.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "Transaction hash is: ",
              hash,
              "\n Check Alchemy mempool to view transaction status"
            );
          } else {
            console.log(
              "Something went wrong duirng transaction submission: ",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Sign Promise failed:", err);
    });
}
mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmaxgWfeyVcwDB8x4DUSBKHr8di4LUdKPa2fuXGwR17aPr"
);
