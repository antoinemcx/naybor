module.exports={
    conf:{
        name: "skip",
        description: "Allows you to skip the music and therefore to play the next one",
        usage: '<prefix>skip',
        aliases: ["sk"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);

        bot.player.skip(message);
        message.channel.send(bot.language.SKIP);
    },
};