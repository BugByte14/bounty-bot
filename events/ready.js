const index = require("../index.js");
const client = index.client;

module.exports = {
    name: "ready",
    once: true,
    execute(client, stats) {
        console.log('Bounty Bot is now running.');
    }
}