module.exports={
    conf:{
        name: "shuffle",
        description: "Allows you to shuffle the queue",
        usage: '<prefix>shuffle',
        aliases: ["sh"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);
        // bot.player.shuffle(message);

        await queue.shuffle()
        return message.reply(bot.language.SHUFFLE(queue.tracks.length));
    },
};