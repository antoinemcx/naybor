module.exports={
    conf:{
        name: "shuffle",
        description: "Allows you to shuffle the queue",
        usage: '<prefix>shuffle',
        aliases: ["sh"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);
        bot.player.shuffle(message);

        return message.channel.send(bot.language.SHUFFLE(bot.player.getQueue(message).tracks.length));
    },
};