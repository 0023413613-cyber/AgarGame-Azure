const appInsights = require("applicationinsights");

let client = null;

if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
    appInsights
        .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
        .setAutoCollectRequests(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectConsole(true)
        .start();

    client = appInsights.defaultClient;
}

module.exports = {
    client
};