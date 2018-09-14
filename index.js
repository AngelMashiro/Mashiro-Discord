const Discord = require('discord.js');
const fs = require('fs');
const mashiro = new Discord.Client();
const config = require('./config.json');
const julesid = "145689417045114881"

mashiro.on('ready', async () => {
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

    const jules = await client.fetchMember(julesid);
      
    if (jules)
        jules.send("Haiii, I'm back~");

    console.log("Mashiro woke up~");
});

mashiro.on('message', (message) => {
    if (message.author.id === julesid) return;
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
