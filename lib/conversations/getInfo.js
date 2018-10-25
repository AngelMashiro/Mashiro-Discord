const util = require("../../utils/Utils");

exports.condition = message => message.content.toLowerCase().startsWith("can you get me the");

exports.run = async (mashiro, message) => {
    const words = message.content.split(" ");
    const indexBeforeProperty = util.findIndex(words, "the");
    const indexBeforePerson = util.findIndex(words, "of");

    let wantedPerson = words.filter((word, index) => {
        if (index > indexBeforePerson)
            return word;
    }).join(" ").toLowerCase();

    const wantedProperty = words[indexBeforeProperty + 1];

    const person = await util.findMember(message, wantedPerson);

    if (!person)
        return message.channel.send("I couldn't find that person :v");

    if (!person[wantedProperty])
        return message.channel.send(`I can't find the ${wantedProperty} of ${wantedPerson.username} `);

    return message.channel.send(`Here is the ${wantedProperty} of ${wantedPerson}: ` + person[wantedProperty]);
}