const ImageUploader = require("./upload_image_to_pinata");

const imageName = "image1.jpeg"; // Set the image file name
const jsonName = "image1.json"; // Set the JSON file name

const imageUploader = new ImageUploader(imageName, jsonName);
imageUploader.main();