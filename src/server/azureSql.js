const sql = require("mssql");
const keyVault = require("./keyVault");

let pool;

async function connectDatabase() {
    if (pool) return pool;

    const config = {
        user: await keyVault.getSecret("Username"),
        password: await keyVault.getSecret("Password"),
        server: await keyVault.getSecret("ServerName"),
        database: await keyVault.getSecret("Database"),

        options: {
            encrypt: true,
            trustServerCertificate: false
        }
    };

    pool = await sql.connect(config);

    console.log("Connected to Azure SQL");

    return pool;
}

module.exports = {
    connectDatabase
};