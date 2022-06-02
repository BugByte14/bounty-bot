module.exports = {
    name: "voiceStateUpdate",
    execute(client, commands) {        
        let newUserChannel = newState.channel;
        let oldUserChannel = oldState.channel;
        if (oldUserChannel === null && newUserChannel !== null) {
            console.log("New vc joined " + newUserChannel);
        } 
        else if (oldUserChannel !== null && newUserChannel === null) {
            console.log("Old vc left " + oldUserChannel);
        }
    }
}