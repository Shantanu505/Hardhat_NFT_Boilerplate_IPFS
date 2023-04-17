require("dotenv").config();
const fs = require("fs");
const { ethers } = require("ethers");
const privateKey = process.env.PRIVATE_KEY;
const readline = require("readline");

async function explore() {
    // Get the contract address and abi from the deployed contract
    const contractAddress = "0x30E32B8047CE7b40c5E01513872D6BFD35F7fD10";
    const { abi } = require('./../artifacts/contracts/GoldOrnamentNFT.sol/GoldOrnamentNFT.json');

    // Connect to the contract using the web3 provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_ENDPOINT);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Get the token counter from the contract
    const tokenCounter = await contract.tokenCounter();

    // Get the token URI from the metadataURI folder
    const metadataURI = "./metadataURI/tokenURI1.json";
    const tokenURI = fs.readFileSync(metadataURI, "utf8");

    // Set the variable to decide whether to mint or transfer
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter 0 to mint a new token or 1 to transfer an existing token: ", async (action) => {
        rl.close();
        if (action === "0") {
            // Mint a new token with the token URI
            const tokenId = tokenCounter.toNumber();
            await contract.safeMint(signer.getAddress(), tokenURI);
            console.log(`Token with ID ${tokenId} minted successfully.`);
        } else if (action === "1") {
            // Transfer the token to a recipient address
            const recipientAddress = "0xB6f79147E54a1eB462d82EFb6AE2e72A5F630C93";
            const tokenId = 1// Set the token ID to transfer
            await contract.transferFrom(signer.getAddress(), recipientAddress, tokenId);
            console.log(`Token with ID ${tokenId} transferred successfully to ${recipientAddress}.`);
        } else {
            console.log("Invalid input.");
        }
    });
}

explore();