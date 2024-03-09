const Discord = require('discord.js');
const token = require('./token.json');
const fs = require('fs');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'] });
module.exports.client = client;

let statsFile = fs.readFileSync('/var/services/homes/william/BountyBot/data/stats.json');
let stats = JSON.parse(statsFile);
module.exports.stats = stats;

const commandFiles = fs.readdirSync("/var/services/homes/william/BountyBot/commands");
const commands = [];

const eventFiles = fs.readdirSync("/var/services/homes/william/BountyBot/events");
for (const file of eventFiles) {
    const event = require(`/var/services/homes/william/BountyBot/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, stats, commands));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args, stats, commands));
    }
}

client.login(token.bot);
//client.login(process.env.BOT_TOKEN);