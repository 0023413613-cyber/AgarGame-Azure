const { BlobServiceClient } = require("@azure/storage-blob");
const keyVault = require("./keyVault");

let containerClient = null;

async function getContainerClient() {
    if (containerClient) return containerClient;

    const connectionString = await keyVault.getSecret("BlobConnectionString");

    const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);

    containerClient = blobServiceClient.getContainerClient("gamefiles");

    await containerClient.createIfNotExists();

    return containerClient;
}

async function uploadText(fileName, content) {
    const container = await getContainerClient();

    const blockBlobClient = container.getBlockBlobClient(fileName);

    await blockBlobClient.upload(content, Buffer.byteLength(content));

    console.log(`Uploaded ${fileName} to Azure Blob Storage`);
}

module.exports = {
    uploadText
};