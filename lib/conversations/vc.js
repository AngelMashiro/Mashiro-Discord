exports.condition = message => message.content.toLowerCase().includes("wanna vc");

exports.run = async (mashiro, message) => {
    message.channel.send("Always~ :heart:");
    let voiceChannel;

    for (const guild of mashiro.guilds.array()) {
        console.log("Looping through " + guild.name);
        const jules = await guild.fetchMember(message.author.id).catch(e => {});
        console.log(jules);

        if (jules) {
            voiceChannel = jules.voiceChannel;
            
            if (voiceChannel)
                break;
        }
    }
     
    if (voiceChannel) {
        voiceChannel.join();
        checkJulesLeaves(mashiro, message.author);
    }
    else {
        await waitJulesJoins(mashiro, message.author)
        message.reply("Haii~");
    }
}

const waitJulesJoins = (mashiro, jules) => {
    return new Promise((resolve, reject) => {
        const onVoiceStateUpdate = (oldMember, newMember) => {
            if (newMember.id === jules.id && newMember.voiceChannel) {
                newMember.voiceChannel.join();
                mashiro.removeListener("voiceStateUpdate", onVoiceStateUpdate);
                checkJulesLeaves(mashiro, jules);
                resolve(true);
            }
        }

        mashiro.on("voiceStateUpdate", onVoiceStateUpdate);
    })
}

const checkJulesLeaves = (mashiro, jules) => {
    return new Promise((resolve, reject) => {
        const onVoiceStateUpdateLeave = (oldMember, newMember) => {
            if (newMember.id === jules.id && oldMember.voiceChannel && !newMember.voiceChannel) {
                oldMember.voiceChannel.leave();
                mashiro.removeListener("voiceStateUpdate", onVoiceStateUpdateLeave);
                resolve(true);
            }
        }
        mashiro.on("voiceStateUpdate", onVoiceStateUpdateLeave);
    })
}
