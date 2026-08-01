const { createClient } = require("redis");
const keyVault = require("./keyVault");

let client = null;

async function getClient() {
    if (client) return client;

    const redisUrl = await keyVault.getSecret("RedisConnectionString");

    client = createClient({
        url: redisUrl
    });

    client.on("error", (err) => {
        console.error("Redis Error:", err);
    });

    await client.connect();

    console.log("Connected to Redis");

    return client;
}

async function updateLeaderboard(player, score) {
    const redis = await getClient();

    await redis.zAdd("leaderboard", [
        {
            score: score,
            value: player
        }
    ]);
}

async function getLeaderboard() {
    const redis = await getClient();

    return await redis.zRangeWithScores(
        "leaderboard",
        0,
        9,
        {
            REV: true
        }
    );
}

module.exports = {
    updateLeaderboard,
    getLeaderboard
};