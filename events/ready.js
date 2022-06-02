const index = require("../index.js");
const client = index.client;

module.exports = {
    name: "ready",
    once: true,
    execute(client, stats) {
        const guild = client.guilds.cache.get('674441808293658656').members.fetch().then(members => {
            members.forEach(member => {
                stats[member.user.id] = {
                    xp: 0,
                    level: 0,
                    xpRequired: 100
                };
            });
        });
    }
}