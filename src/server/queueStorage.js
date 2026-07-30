const { QueueServiceClient } = require("@azure/storage-queue");
const keyVault = require("./keyVault");

let queueClient = null;

async function getQueueClient() {
    if (queueClient) return queueClient;

    const connectionString =
        await keyVault.getSecret("BlobConnectionString");

    const queueServiceClient =
        QueueServiceClient.fromConnectionString(connectionString);

    queueClient =
        queueServiceClient.getQueueClient("game-events");

    await queueClient.createIfNotExists();

    return queueClient;
}

async function sendQueueMessage(message) {
    const client = await getQueueClient();

    const encoded =
        Buffer.from(JSON.stringify(message)).toString("base64");

    await client.sendMessage(encoded);

    console.log("Queue message sent.");
}

module.exports = {
    sendQueueMessage
};