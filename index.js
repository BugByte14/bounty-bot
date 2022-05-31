const Discord = require('discord.js');
const token = require('./token.json');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

var stats = {};

client.on('messageCreate', (message) => {
    if (message.guild.id in stats === false) {
        stats[message.guild.id] = {};
    }

    const guildStats = stats[message.guild.id];
    if (message.author.id in guildStats === false) {
        guildStats[message.author.id] = {
            xp: 0,
            level: 0,
            xpRequired: 100
        };
    }

    const userStats = guildStats[message.author.id];
    try {
        if (message.member.roles.cache.some(r=> r.name === 'bots') === false) {
            userStats.xp += 20;
            if (userStats.xp >= userStats.xpRequired) {
                userStats.level += 1;
                userStats.xpRequired += 100 + userStats.level * 20;
                client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + message.author.toString() + " now 'as a bounty of $" + userStats.level + ",000.00!**");
            }
        }
    }
    catch (e) {
        console.error(e.message);
    }

    const parts = message.content.split(' ');

    if (parts[0] === '$xp') {
        message.reply(message.author.toString() + ' has ' + userStats.xp + ' xp.');
    }
    if (parts[0] === '$level') {
        message.reply(message.author.toString() + ' has a bounty of $' + userStats.level + ',000.00.');
    }
    if (parts[0] === '$xprequired') {
        message.reply(message.author.toString() + ' requires ' + userStats.xpRequired + ' xp to increase bounty.');
    }
    if (parts[0] === '$xpleft') {
        message.reply(message.author.toString() + ' needs ' + (userStats.xpRequired - userStats.xp) + ' more xp to increase bounty.');
    }
    if (parts[0] === '$setlevel') {
        try {
            if (message.member.permissions.has('ADMINISTRATOR')) {
                const users = Array.from(message.mentions.users.values());
                const user = guildStats[users[0].id];
                user.level = parseInt(parts[2]);
                user.xp = 100 + (user.level - 1) * 20;
                message.reply(user.toString() + " now has a bounty of " + user.level);
            }
            else {
                message.reply("You must be an administrator to use this command.");
            }
        }
        catch (e) {
            console.error(e.message);
        }
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;
    if (oldUserChannel === null && newUserChannel !== null) {
        console.log("New vc joined " + newUserChannel);
    } 
    else if (oldUserChannel !== null && newUserChannel === null) {
        console.log("Old vc left " + oldUserChannel);
    }
});

client.login(token.bot);