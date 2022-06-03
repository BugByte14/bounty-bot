const fs = require('fs');
const index = require("../index.js");

module.exports = {
    name: "messageCreate",
    execute(message, stats) {
        try {
            if (message.member.roles.cache.some(r=> r.name === 'bots') === false) {
                stats[message.author.id].xp += 20;
                if (stats[message.author.id].xp >= stats[message.author.id].xpRequired) {
                    stats[message.author.id].level += 1;
                    stats[message.author.id].xpRequired += 100 + stats[message.author.id].level * 20;
                    index.client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + stats[message.author.id].toString() + " now 'as a bounty of $" + stats[message.author.id].level + ",000.00!**");
                }
                fs.writeFileSync(`./data/stats.json`, JSON.stringify(stats, null, 2));
            }
        }
        catch (e) {
            console.error(e.message);
        }
    
        const parts = message.content.split(' ');
    
        if (parts[0] === '$xp') {
            message.reply(message.author.toString() + ' has ' + stats[message.author.id].xp + ' xp.');
        }
        if (parts[0] === '$level') {
            message.reply(message.author.toString() + ' has a bounty of $' + stats[message.author.id].level + ',000.00.');
        }
        if (parts[0] === '$xprequired') {
            message.reply(message.author.toString() + ' requires ' + stats[message.author.id].xpRequired + ' xp to increase bounty.');
        }
        if (parts[0] === '$xpleft') {
            message.reply(message.author.toString() + ' needs ' + (stats[message.author.id].xpRequired - stats[message.author.id].xp) + ' more xp to increase bounty.');
        }
        if (parts[0] === '$setlevel') {
            try {
                if (message.member.permissions.has('ADMINISTRATOR')) {
                    const users = Array.from(message.mentions.users.values());
                    const user = guildStats[users[0].id];
                    user.level = parseInt(parts[2]);
                    user.xp = 10 * (Math.pow(user.level, 2) + 11 * user.level);
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
    }
}