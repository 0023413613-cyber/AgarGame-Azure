const { ServiceBusClient } = require("@azure/service-bus");
const keyVault = require("./keyVault");

let sender = null;

async function getSender() {
    if (sender) return sender;

    const connectionString =
        await keyVault.getSecret("ServiceBusConnectionString");

    const client = new ServiceBusClient(connectionString);

    sender = client.createSender("game-events");

    return sender;
}

async function sendServiceBusMessage(message) {
    const s = await getSender();

    await s.sendMessages({
        body: message
    });

    console.log("Service Bus message sent.");
}

module.exports = {
    sendServiceBusMessage
};