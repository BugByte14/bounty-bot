module.exports = {
    name: "voiceStateUpdate",
    execute(oldState, newState, stats) {        
        let newUserChannel = newState.channel;
        let oldUserChannel = oldState.channel;
        if (oldUserChannel === null && newUserChannel !== null) {
            const joinTime = Date.now();        //TODO: Store join dates in database for later access.
            console.log(newState.member.user.username + " joined " + newUserChannel + " at " + joinTime);
        }
        else if (oldUserChannel !== null && newUserChannel === null) {
            const userStats = stats[oldState.member.user.id];
            const leaveTime = Date.now();
            console.log(oldState.member.user.username + " left " + oldUserChannel + " at " + leaveTime);
            /*timeInVc = leaveTime - joinTime;
            try {
                if (oldState.member.roles.cache.some(r=> r.name === 'bots') === false) {
                    userStats.xp += 5 * Math.floor(timeInVc / 60);
                    if (userStats.xp >= userStats.xpRequired) {
                        userStats.level += 1;
                        userStats.xpRequired += 100 + userStats.level * 20;
                        index.client.channels.cache.get('975815143554445313').send("**Avast ye shipmates, " + message.author.toString() + " now 'as a bounty of $" + userStats.level + ",000.00!**");
                    }
                }
            }
            catch (e) {
                console.error(e.message);
            }*/
        }
    }
}