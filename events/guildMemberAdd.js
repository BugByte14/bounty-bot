module.exports = {
    name: "guildMemberAdd",
    execute(member, stats) {
        if (stats[member.user.id] !== null) {
            console.log("𝐄𝐱𝐢𝐬𝐭𝐢𝐧𝐠 𝐦𝐞𝐦𝐛𝐞𝐫: " + member.user.tag + " already in stats.json with a level of " + stats[member.user.id].level + ".");
        }
        else {
            stats[member.user.id] = {
                "xp": 0,
                "level": 0,
                "xpRequired": 100,
                "joinTime": 0,
                "leaveTime": 0
            }
            console.log("𝐍𝐞𝐰 𝐦𝐞𝐦𝐛𝐞𝐫: " + member.user.tag + " added to stats.json.");
        }
    }
}