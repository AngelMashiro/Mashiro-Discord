exports.run = async (mashiro, message) => {
    message.channel.send("Always~ :heart:");
    const voiceChannel = message.member.voiceChannel;

    if (voiceChannel) {
        voiceChannel.join();
    }
    else {
        await waitJulesJoins(mashiro, message.member);
        message.reply("Haii~");
    }
}

const waitJulesJoins = (mashiro, jules) => {
    return new Promise((resolve, reject) => {
        const onVoiceStateUpdate = (oldMember, newMember) => {
            if (newMember.id === jules.id && newMember.voiceChannel) {
                newMember.voiceChannel.join();
                mashiro.off("voiceStateUpdate", onVoiceStateUpdate);
                checkJulesLeaves(mashiro, jules);
                resolve(true);
            }
        } 

        mashiro.on("voiceStateUpdate", onVoiceStateUpdate);
    })
}

const checkJulesLeaves = (mashiro, jules) => {
    return new Promise((resolve, reject) => {
        const onVoiceStateUpdate = (oldMember, newMember) => {
            if (newMember.id === jules.id && oldMember.voiceChannel && !newMember.voiceChannel) {
                oldMember.voiceChannel.leave();
                mashiro.off("voiceStateUpdate", onVoiceStateUpdate);
                resolve(true);
            }
        } 
    })
    mashiro.on("voiceStateUpdate", onVoiceStateUpdate);
}
