const fs = require('fs');
const { MessageEmbed } = require(`discord.js`);
const index = require("../index.js");
const client = index.client;
const random = require('random');

module.exports = {
    name: "messageCreate",
    execute(message, stats) {
        try {
            /*message.guild.members.fetch(message.author.id).then((user) => {
                stats[user.id].userTag = user.tag;
                fs.writeFileSync(`./data/stats.json`, JSON.stringify(stats, null, 2));
            });*/
            if (message.member.roles.cache.some(r=> r.name === 'bots') === false) {
                xpGain = random.int(20, 40);
                stats[message.author.id].xp += xpGain;
                console.log("𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐱𝐩: " + message.author.tag + " gained " + xpGain + " xp for message '" + message.content + "' in " + message.channel.name);
                if (stats[message.author.id].xp >= stats[message.author.id].xpRequired) {
                    stats[message.author.id].level += 1;
                    stats[message.author.id].xpRequired += 100 + stats[message.author.id].level * 20;
                    console.log("𝐋𝐞𝐯𝐞𝐥 𝐮𝐩: " + message.author.tag + " is now level " + stats[message.author.id].level);
                    index.client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + message.author.toString() + " now 'as a bounty of $" + stats[message.author.id].level + ",000.00!**");
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
        if (parts[0] === '$bounty') {
            message.reply(message.author.toString() + ' has a bounty of $' + stats[message.author.id].level + ',000.00.\n' + 'You need ' + (stats[message.author.id].xpRequired - stats[message.author.id].xp) + ' more xp to increase your bounty.');
        }
        if (parts[0] === '$wanted') {
            let top = [stats['0'], stats['0'], stats['0'], stats['0'], stats['0'], stats['0'], stats['0']];
            for (i in top) {
                Object.keys(stats).forEach(function(key) {
                    if (stats[key].xp > top[i].xp) {
                        if (top.includes(stats[key]) === false) {
                            top[i] = stats[key];
                            top[i].user = key;
                        }
                    }
                })
            }
            try {
                const mostWanted = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('Most Wanted')
	                .setDescription(  '#1. ' + message.guild.members.cache.get(top[0].user).tag + ':   $' +  top[0].level + ',000.00\n'
                                    + '#2. ' + message.guild.members.cache.get(top[1].user).tag + ':   $' +  top[1].level + ',000.00\n'
                                    + '#3. ' + message.guild.members.cache.get(top[2].user).tag + ':   $' +  top[2].level + ',000.00\n'
                                    + '#4. ' + message.guild.members.cache.get(top[3].user).tag + ':   $' +  top[3].level + ',000.00\n'
                                    + '#5. ' + message.guild.members.cache.get(top[4].user).tag + ':   $' +  top[4].level + ',000.00\n'
                                    + '#6. ' + message.guild.members.cache.get(top[5].user).tag + ':   $' +  top[5].level + ',000.00\n'
                                    + '#7. ' + message.guild.members.cache.get(top[6].user).tag + ':   $' +  top[6].level + ',000.00\n')
	                .setTimestamp()

                message.channel.send({ embeds: [mostWanted] });
            }
            catch {
                message.channel.send("Failed to run command. Please try again later.");
            }
        }
        if (parts[0] === '$addxp') {
            if (message.member.roles.cache.some(r=> r.name === 'Captain') === true) {
                gainer = parts[1].split('@').pop().split('>')[0];
                gain = parseInt(parts[2]);
                console.log(gain);
                try {
                    stats[gainer].xp += gain;
                    while (true) {
                        if (stats[gainer].xp >= stats[gainer].xpRequired) {
                            stats[gainer].level += 1;
                            stats[gainer].xpRequired += 100 + stats[gainer].level * 20;
                        }
                        else {
                            console.log("𝐋𝐞𝐯𝐞𝐥 𝐮𝐩: " + gainer + " is now level " + stats[gainer].level);
                            index.client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + parts[1].toString() + " now 'as a bounty of $" + stats[gainer].level + ",000.00!**");
                            break;
                        }
                    }
                }
                catch {
                    message.reply("Incorrect format, please try again.");
                }
            }
            else {
                message.reply("Ayy, this command be only used by the captain.");
            }
        }
    }
}