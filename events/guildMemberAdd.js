module.exports = {
    name: "guildMemberAdd",
    execute(member, stats) {
        if (stats[member.user.id] === null) {
            stats[member.user.id] = {
                "xp": 0,
                "level": 0,
                "xpRequired": 100,
                "joinTime": 0,
                "leaveTime": 0
            }
        }
    }
}