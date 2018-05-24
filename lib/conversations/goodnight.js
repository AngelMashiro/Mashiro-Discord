exports.condition = message => message.content.toLowerCase().replace("'", "").includes("im going to sleep"); 

exports.run = (mashiro, message) => {
    message.channel.send("Okayy~, good night :heart:");
}
