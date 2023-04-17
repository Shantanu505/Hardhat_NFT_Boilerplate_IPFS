require('dotenv').config();
const axios = require('axios');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);


class MetadataGenerator {
    constructor(imageJsonFilename, attributes) {
        this.imageJsonFilename = imageJsonFilename;
        this.attributes = attributes;
    }

    createMetadataJson(imageURI, attributes) {
        return {
            image: imageURI,
            attributes: attributes,
        };
    }

    async fetchImageData() {
        const imageJsonPath = `./imageURI/${this.imageJsonFilename}`;
        const imageJson = JSON.parse(fs.readFileSync(imageJsonPath, 'utf8'));
        return imageJson;
    }

    async saveMetadataJson(metadata, fileName) {
        const metadataPath = `./metadata/${fileName}`;
        fs.writeFileSync(metadataPath, JSON.stringify(metadata));
    }


    async uploadMetadataToPinata(metadataPath) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        try {
            const options = {
                pinataOptions: {
                    wrapWithDirectory: true,
                },
                pinataMetadata: {
                    name: 'meta1', // You can give your metadata a name (optional)
                },
            };

            const result = await pinata.pinJSONToIPFS(metadata, options);
            const ipfsHash = result.IpfsHash;
            //const parentFolderHash = 'QmbxqKq5HDHzPfgsEepkekAuURRBchYQxoaBixsatKc1W9';
            const tokenURI = `ipfs://${ipfsHash}`;

            const tokenURIPath = './metadataURI/tokenURI1.json';
            fs.writeFileSync(tokenURIPath, JSON.stringify(tokenURI));

            console.log(`Metadata uploaded to Pinata with IPFS hash:' ipfs://${ipfsHash}/`);
            return ipfsHash;
        } catch (error) {
            console.error(`Error uploading metadata to Pinata: ${error}`);
            return null;
        }
    }

}

module.exports = MetadataGenerator;


