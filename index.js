const Discord = require('discord.js');
const fs = require('fs');
const intercept = require("intercept-stdout");
const mashiro = new Discord.Client();
const config = require('./config.json');
const Logger = require('./utils/Logger');
const logger = new Logger('./logs');
const wss = require('./lib/WebSocketServer')
const julesid = "174578160334012416";

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

    const jules = await mashiro.fetchUser(julesid);

    // if (jules) 
    //     jules.send("Haiii, I'm back~");
        
    console.log("Mashiro woke up~");
});

mashiro.on('message', (message) => {
    // Conversation started with Mashiro
    console.log(message.content)
    const messageSplit = message.content.split(" ");
    if (message.content.toLowerCase().startsWith("mashiro") && messageSplit.length < 3) {
        const conversation = require("./lib/conversation");
        conversation.run(mashiro, message);
    }
});

mashiro.login(config.token);

intercept(async txt => {
    await logger.log(txt);
    wss.sendAll(txt);
});