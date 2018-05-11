const utils = require("./utils")

exports.run = async (mashiro, message) => {
    if (!isJules(message.author))
        return message.channel.send("I only listen to Jules~");

    message.channel.send("Juless~?");

    const filter = fmessage => fmessage.author.id == message.author.id;
    const fetchedMessages = await message.channel.awaitMessages(filter, {time: 20000, max: 1});
    const fetchedMessage = fetchedMessages.first();

    if (fetchedMessage.content.includes("remind")) { 
        const remind = require("./conversations/remind.js");
        remind.run(mashiro, fetchedMessage);
    }

}

function isJules(author) {
    return author.id === "174578160334012416";
}