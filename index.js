const Discord = require('discord.js');
const fs = require('fs');
const mashiro = new Discord.Client();
const config = require('./config.json');

mashiro.on('ready', () => {
    const presences = {
        'WATCHING' : 'Jules ♥',
        'PLAYING' : 'with Jules ♥',
        'Listening': 'Jules ♥'
      }

      setInterval(() => {
        const types = Object.keys(presences);
        const type = types[Math.floor(Math.random() * types.length)];
        mashiro.user.setActivity(presences[type], {type});

      }, 600000);

      console.log("Mashiro woke up~");
});

mashiro.on('message', (message) => {
    if (message.author.id === "145689417045114881") return;
    // Conversation started with Mashiro ♥
    if (message.content.toLowerCase().startsWith("mashiro")) {
        const conversation = require("./lib/conversation");
        conversation.run(mashiro, message);
    }
});

mashiro.on('guildMemberUpdate', (oldMember, newMember) => {
    if (newMember.id === "348159003102150678") { // If it's mashiro
        if (newMember.roles.length > 3) {
            newMember.roles.forEach(role => {
                if (role.id !== "396285208430641152" || role.id !== "348160057399312385" || role.id !== "457310367568101386") {
                    newMember.removeRole(role);
                }
            })
        }
    }
})

process.on('unhandledRejection', err => {
    console.log("Caught unhandledRejection");
    console.log(err.stack);
});

mashiro.login(config.token);
