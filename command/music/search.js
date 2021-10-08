module.exports={
    conf:{
        name: "search",
        description: "Allows you to search a song by it title (so to be able to choose your song)",
        usage: '<prefix>search <songTitle>',
        aliases: ["sr"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!args[0]) return message.channel.send(bot.language.WRONG_USAGE(module.exports.conf.usage));

        bot.player.play(message, args.join(" "));
    },
};