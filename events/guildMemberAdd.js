const index = require("../index.js");

module.exports = {
    name: "guildMemberAdd",
    execute(member, stats) {
        if (stats[member.user.id] === undefined) {
            stats[member.user.id] = {
                "xp": 0,
                "level": 0,
                "xpRequired": 100,
                "joinTime": 0,
                "leaveTime": 0,
                "user": member.user.id
            }
            index.client.users.cache.get('459234138554105868').send("𝐍𝐞𝐰 𝐦𝐞𝐦𝐛𝐞𝐫: " + member.user.tag + " added to stats.json.");
        }
        else {
            index.client.users.cache.get('459234138554105868').send("𝐄𝐱𝐢𝐬𝐭𝐢𝐧𝐠 𝐦𝐞𝐦𝐛𝐞𝐫: " + member.user.tag + " already in stats.json with a level of " + stats[member.user.id].level + ".");
        }
    }
}