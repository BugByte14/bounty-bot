const fs = require('fs');
const { MessageEmbed } = require(`discord.js`);
const index = require("../index.js");
const random = require('random');

module.exports = {
    name: "messageCreate",
    execute(message, stats) {
        try {
            if (message.member.roles.cache.some(r=> r.name === 'bots') === false) {
                xpGain = random.int(15, 30);
                stats[message.author.id].xp += xpGain;
                console.log("𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐱𝐩: " + message.author.tag + " gained " + xpGain + " xp for message '" + message.content + "' in " + message.channel.name);
                if (stats[message.author.id].xp >= stats[message.author.id].xpRequired) {
                    stats[message.author.id].level += 1;
                    stats[message.author.id].xpRequired += 100 + stats[message.author.id].level * 20;
                    console.log("𝐋𝐞𝐯𝐞𝐥 𝐮𝐩: " + message.author.tag + " is now level " + stats[message.author.id].level);
                }
                index.client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + message.author.toString() + " now 'as a bounty of $" + stats[message.author.id].level + ",000.00!**");
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
        if (parts[0] === '$wanted') {       //currently manual, will update to sort json eventually
            let top = [0, 0, 0, 0, 0];
            top[0] = stats['459234138554105868'];
            top[1] = stats['226495910861996032'];
            top[2] = stats['535323821893222420'];
            top[3] = stats['707123269001543721'];
            top[4] = stats['335561783765106689'];
            const mostWanted = new MessageEmbed()
	            .setColor('#0099ff')
	            .setTitle('Most Wanted')
	            .setDescription(  '#1. ' + index.client.users.cache.get('459234138554105868').tag + ':   $' +  top[0].level + ',000.00\n'
                                + '#2. ' + index.client.users.cache.get('226495910861996032').tag + ':   $' +  top[1].level + ',000.00\n'
                                + '#3. ' + index.client.users.cache.get('535323821893222420').tag + ':   $' +  top[2].level + ',000.00\n'
                                + '#4. ' + index.client.users.cache.get('707123269001543721').tag + ':   $' +  top[3].level + ',000.00\n'
                                + '#5. ' + index.client.users.cache.get('335561783765106689').tag + ':   $' +  top[4].level + ',000.00\n')
	            .setTimestamp()

            message.channel.send({ embeds: [mostWanted] });
        }
    }
}