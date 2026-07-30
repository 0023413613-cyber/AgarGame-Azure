const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const vaultName = "kv-agar-game";
const url = `https://${vaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(url, credential);

async function getSecret(name) {
    const secret = await client.getSecret(name);
    return secret.value;
}

module.exports = {
    getSecret
};