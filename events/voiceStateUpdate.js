const fs = require('fs');
const index = require("../index.js");

module.exports = {
    name: "voiceStateUpdate",
    execute(oldState, newState, stats) {      
        try {
            let newUserChannel = newState.channel;
            let oldUserChannel = oldState.channel;
            if (oldUserChannel === null && newUserChannel !== null) {
                stats[newState.member.user.id].joinTime = Date.now();
                fs.writeFileSync(`./data/stats.json`, JSON.stringify(stats, null, 2));
            }
            else if (oldUserChannel !== null && oldUserChannel.id !== '975832580857405531') {
                if (newUserChannel === null || newUserChannel.id === '975832580857405531') {       //checks if user left vc or moved to afk vc, stops counting xp
                    stats[oldState.member.user.id].leaveTime = Date.now();
                    timeInVc = (stats[oldState.member.user.id].leaveTime - stats[oldState.member.user.id].joinTime) / 1000;
                    try {
                        if (oldState.member.roles.cache.some(r=> r.name === 'bots') === false) {
                            let xpGain = 5 * Math.floor(timeInVc / 60);
                            stats[oldState.member.user.id].xp += xpGain;
                            console.log("𝐕𝐨𝐢𝐜𝐞 𝐱𝐩: " + oldState.member.user.tag + " gained " + xpGain + " xp from being in " + oldUserChannel.name + " for " + timeInVc + " seconds.");
                            while (stats[oldState.member.user.id].xp >= stats[oldState.member.user.id].xpRequired) {
                                stats[oldState.member.user.id].level += 1;
                                stats[oldState.member.user.id].xpRequired += 100 + stats[oldState.member.user.id].level * 20;
                                console.log("𝐋𝐞𝐯𝐞𝐥 𝐮𝐩: " + oldState.member.user.tag + " is now level " + stats[oldState.member.user.id].level);
                            }
                            index.client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + oldState.member.user.toString() + " now 'as a bounty of $" + stats[oldState.member.user.id].level + ",000.00!**");
                        }
                        stats[oldState.member.user.id].joinTime = 0;
                        stats[oldState.member.user.id].leaveTime = 0;
                        fs.writeFileSync(`./data/stats.json`, JSON.stringify(stats, null, 2));
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                }
            }
        }
        catch (e) {
            console.error(e.message);
        }
    }
}