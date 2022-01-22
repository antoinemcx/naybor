module.exports={
    conf:{
        name: "resume",
        description: "Allows you to resume the current music if it's paused",
        usage: '<prefix>resume',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);
        
        // if (!bot.player.getQueue(message).paused) return message.reply(bot.language.RESUME_ERR);
        // bot.player.resume(message);

        const paused = queue.setPaused(false);
        message.reply(paused ? bot.language.RESUME_SUCCESS : bot.language.ERROR[2]);
    },
};