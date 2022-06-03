const fs = require('fs');
const index = require("../index.js");

module.exports = {
    name: "voiceStateUpdate",
    execute(oldState, newState, stats) {        
        let newUserChannel = newState.channel;
        let oldUserChannel = oldState.channel;
        if (oldUserChannel === null && newUserChannel !== null) {
            stats[newState.member.user.id].joinTime = Date.now();
            console.log(newState.member.user.username + " joined " + newUserChannel.name + " at " + stats[newState.member.user.id].joinTime);
            fs.writeFileSync(`./data/stats.json`, JSON.stringify(stats, null, 2));
        }
        else if (oldUserChannel !== null && newUserChannel === null) {
            stats[oldState.member.user.id].leaveTime = Date.now();
            console.log(oldState.member.user.username + " left " + oldUserChannel.name + " at " + stats[oldState.member.user.id].leaveTime);
            timeInVc = (stats[oldState.member.user.id].leaveTime - stats[oldState.member.user.id].joinTime) / 1000;
            console.log(timeInVc);
            try {
                if (oldState.member.roles.cache.some(r=> r.name === 'bots') === false) {
                    stats[oldState.member.user.id].xp += 5 * Math.floor(timeInVc / 60);
                    if (stats[oldState.member.user.id].xp >= stats[oldState.member.user.id].xpRequired) {
                        stats[oldState.member.user.id].level += 1;
                        stats[oldState.member.user.id].xpRequired += 100 + stats[oldState.member.user.id].level * 20;
                        index.client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + oldState.member.user.toString() + " now 'as a bounty of $" + stats[oldState.member.user.id].level + ",000.00!**");
                    }
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