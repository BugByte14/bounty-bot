const Discord = require('discord.js');
const token = require('./token.json');
const fs = require('fs');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'] });
module.exports.client = client;

let statsFile = fs.readFileSync('./data/stats.json');
let stats = JSON.parse(statsFile);
module.exports.stats = stats;

const commandFiles = fs.readdirSync("./commands");
const commands = [];

const eventFiles = fs.readdirSync("./events");
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, stats, commands));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args, stats, commands));
    }
}

client.login(token.bot);