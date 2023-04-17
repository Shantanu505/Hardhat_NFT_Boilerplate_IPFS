// calling_create_metadata.js

const MetadataGenerator = require("./create_upload_metadata");

async function main() {
    const attributes = [
        { trait_type: 'Price', value: '1000' },
        { trait_type: 'Bill Number', value: '1234' },
    ];

    const generator = new MetadataGenerator('image1.json', attributes);
    const imageData = await generator.fetchImageData();

    // Add imageData attributes to existing attributes
    const extendedAttributes = [
        ...attributes,
        { trait_type: 'Timestamp', value: imageData.Timestamp },
    ];

    const imageUrl = `ipfs://ipfs/${imageData.IpfsHash}/`;

    const metadata = {
        name: "Product name",
        description: "Your Ornaments",
        image: imageUrl,
        attributes: extendedAttributes,
    };

    const metadataFileName = 'meta1.json';
    await generator.saveMetadataJson(metadata, metadataFileName);

    const metadataPath = `./metadata/${metadataFileName}`;
    const ipfsHash = await generator.uploadMetadataToPinata(metadataPath);

    if (ipfsHash) {
        console.log(`Metadata uploaded to Pinata with IPFS hash: ${ipfsHash}`);
    } else {
        console.error('Failed to upload metadata to Pinata');
    }
}

main();
