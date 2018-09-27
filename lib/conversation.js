const fs = require('fs');

exports.run = async (mashiro, message) => {
    if (!isJules(message.author))
        return message.channel.send("I only listen to Jules~");

    message.channel.send("Juless~?");

    const filter = fmessage => fmessage.author.id == message.author.id;
    const fetchedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1});
    const fetchedMessage = fetchedMessages.first();

    if (!fetchedMessage) return;
 
    // TODO: Make this more effiecient by defining what gets triggered in the files itself.
    const conversation_options = fs.readdirSync("./lib/conversations");

    for (const conversation_name of conversation_options) {
      const conversation = require(`./conversations/${conversation_name}`);
      const result = conversation.condition(fetchedMessage);

      if (result)
        conversation.run(mashiro, fetchedMessage)
    }
}

function isJules(author) {
    return author.id === "174578160334012416";
}
