// upload_image_to_pinata.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");


const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret = process.env.PINATA_SECRET_KEY;
const imagesFolderPath = path.join(__dirname, "..", "images");
const imageURIFolderPath = path.join(__dirname, "..", "imageURI");

class ImageUploader {
    constructor(imageName, jsonName) {
        this.imagePath = path.join(imagesFolderPath, imageName);
        this.jsonPath = path.join(imageURIFolderPath, jsonName);
    }

    async uploadImageToPinata() {
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        const data = new FormData();
        data.append("file", fs.createReadStream(this.imagePath));

        const response = await axios.post(url, data, {
            maxContentLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataApiSecret,
            },
        });

        return response.data;
    }

    async main() {
        try {
            if (!fs.existsSync(this.imagePath)) {
                console.error(`Image file not found: ${this.imagePath}`);
                return;
            }

            if (!fs.existsSync(imageURIFolderPath)) {
                fs.mkdirSync(imageURIFolderPath);
            }

            const result = await this.uploadImageToPinata();
            fs.writeFileSync(this.jsonPath, JSON.stringify(result, null, 2));
            console.log(`Uploaded ${path.basename(this.imagePath)} and saved URI to ${this.jsonPath}`);
        } catch (error) {
            console.error("Error uploading image to Pinata:", error.message);
        }
    }
}

module.exports = ImageUploader;