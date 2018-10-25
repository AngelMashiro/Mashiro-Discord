class Util {
    constructor() {

    }

    static findIndex(array, value) {
        return array.findIndex((elem, index) => {
            if (elem === value)
                return index;
        })
    }

    static async findMember(message, value) {
        const mentioned = message.mentions.users.first();
        let errored = false;

        if (mentioned)
            return mentioned;

        const idUser = await message.client.fetchUser(value).catch(e => errored = true);

        if (!errored)
            return idUser;

        let nameMember;

        message.client.guilds.forEach(guild => {
            nameMember = guild.members.find(member => member.user.username.toLowerCase() === value)
        })

        if (nameMember)
            return nameMember.user;

        return false;
    }
}

module.exports = Util;