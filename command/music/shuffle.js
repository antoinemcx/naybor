module.exports={
    conf:{
        name: "shuffle",
        description: "Allows you to shuffle the queue",
        usage: '<prefix>shuffle',
        aliases: ["sh"],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);

        await queue.shuffle()
        return message.reply(client.language.SHUFFLE(queue.tracks.length));
    },
};