const index = require("../index.js");
const client = index.client;

module.exports = {
    name: "ready",
    once: true,
    execute(client, stats) {
        client.guilds.fetch('674441808293658656').then(guild => { guild.members.fetch(); })
        console.log('Bounty Bot is now running.');
    }
}