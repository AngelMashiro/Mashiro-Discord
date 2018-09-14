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

    const messageSplit = message.content.split(" ");
    if (message.content.toLowerCase().startsWith("mashiro") && messageSplit.length < 3) {
        const conversation = require("./lib/conversation");
        conversation.run(mashiro, message);
    }
});

process.on('unhandledRejection', err => {
    console.log("Caught unhandledRejection");
    console.log(err.stack);
});

mashiro.login(config.token);
