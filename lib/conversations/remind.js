exports.condition = message => message.content.includes("remind");

exports.run = (mashiro, message) => {
    const words = message.content.split(" ");

    //TODO: Make it so that I can give a date afterwards
    if (!words.includes("in"))
        return message.channel.send("When do you wanna be reminded~?")

    if (!words.includes("to"))
        return

    const index = findIndex(words, "in");
    const newDate = words[index + 1];
    const lastChar = newDate.slice(-1);
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
    else if (lastChar ==="m")

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
