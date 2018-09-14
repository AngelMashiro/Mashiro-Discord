exports.condition = message => message.content.includes("remind");

exports.run = async (mashiro, message) => {
    const words = message.content.split(" ");

    if (!words.includes("to"))
        return;

    let newDate;

    if (!words.includes("in")) {
        message.channel.send("When do you wanna be reminded~?");

        const messages = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 15000});
        const response = messages.first();
        const responsesWords = response.content.split(" ").map(word => word.toLowerCase());

        if (response.content.toLowerCase().includes("in")) {
            const index = findIndex(responsesWords, "in");

            // Index is bugged
            console.log(responsesWords);
            console.log(index);
            newDate = responsesWords[index + 1];
        }
        else {
            // Assume the first word is the time.
            newDate = responsesWords[0];
        }
    }
    else {
        const index = findIndex(words, "in");
        newDate = words[index + 1];
    }

    const lastChar = newDate.slice(-1);
    console.log(newDate);
    const time = parseInt(newDate.slice(0, - 1));
    let multiplier = 0;

    switch(lastChar) {
        case "s":
        multiplier = 1000;
        break;

        case "m":
        multiplier = 1000 * 60;
        break;

        case "h":
        multiplier = 1000 * 60 * 60;
        break;

        case "d":
        multiplier = 1000 * 60 * 60 * 24;
        break;

        default:
        multiplier = null;
        break;
    }

    if (lastChar === "s") {

    }
    else if (lastChar ==="m") {

    }

    console.log(time, multiplier)

    if (isNaN(time) || !multiplier)
        return message.channel.send("I don't understand the time you gave me :v");

    const date = new Date();
    const newTimeMs = time * multiplier;
    const indexTo = findIndex(words,"to");
    const reminder = words.slice(indexTo + 1).join(" ").replace("?" , "");

    message.channel.send("Okay~, I'll make sure to remind you :heart:");

    setTimeout(() => {
        message.author.send("Juless~, I had to remind you to " + reminder + "~");
    }, newTimeMs)
}

function findIndex(array, value) {
    return array.findIndex((elem, index) => {
        if (elem === value)
            return index;
    })
}
