module.exports={
    conf:{
        name: "resume",
        description: "Allows you to resume the current music if it's paused",
        usage: '<prefix>resume',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);
        if (!bot.player.getQueue(message).paused) return message.channel.send(bot.language.RESUME_ERR);

        bot.player.resume(message);
        message.channel.send(bot.language.RESUME_SUCCESS);
    },
};