module.exports={
    conf:{
        name: "pause",
        description: "Allows you to pause the music, next you can resume it with another command",
        usage: '<prefix>pause',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);

        // if (bot.player.getQueue(message).paused) return message.reply(bot.language.PAUSE_ERR);
        // bot.player.pause(message);

        const paused = queue.setPaused(true);
        message.reply(paused ? bot.language.PAUSE_SUCCESS : bot.language.ERROR[2]);
    }
};