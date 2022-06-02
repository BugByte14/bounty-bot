const Discord = require('discord.js');
const token = require('./token.json');
const fs = require('fs');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const commandFiles = fs.readdirSync("./commands");
const commands = [];

const eventFiles = fs.readdirSync("./events");
for (const file of eventFiles) {
    console.log(file);
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, commands));
}

var stats = {};
client.guilds.cache.get('674441808293658656').members.fetch().then(members => {
    members.forEach(member => {
        stats[member] = {
            xp: 0,
            level: 0,
            xpRequired: 100
        };
    });
});
module.exports.stats = stats;

client.login(token.bot);