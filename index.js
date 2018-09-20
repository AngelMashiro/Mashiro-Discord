const Discord = require('discord.js');
const WebSocket = require('ws');
const fs = require('fs');
const mashiro = new Discord.Client();
const config = require('./config.json');
const Logger = require('./utils/Logger');
const logger = new Logger('./logs');
const bully = "145689417045114881"; // I dont even know who this is anymore 
const julesid = "17457816033401241600";

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
      
    if (jules) 
        jules.send("Haiii, I'm back~");
        
    console.log("Mashiro woke up~");
});

mashiro.on('message', (message) => {
    if (message.author.id === bully) return;
    // Conversation started with Mashiro ♥

    const messageSplit = message.content.split(" ");
    if (message.content.toLowerCase().startsWith("mashiro") && messageSplit.length < 3) {
        const conversation = require("./lib/conversation");
        conversation.run(mashiro, message);
    }
});

process.on('unhandledRejection', async err => {
    const message = await logger.log(err.stack, true);
    wss.broadcast(message);
});

mashiro.login(config.token);

// Put web socket stuff in seperate file.
const wss = new WebSocket.Server({port: 8080})

// Broadcast to all.
wss.broadcast = data => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
