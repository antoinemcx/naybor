module.exports={
    conf:{
        name: "skip",
        description: "Allows you to skip the music and therefore to play the next one",
        usage: '<prefix>skip',
        aliases: ["sk", 's', 'fs'],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id)
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);

        // bot.player.skip(message);
        queue.skip();
        message.reply(bot.language.SKIP(queue.current));
    },
};