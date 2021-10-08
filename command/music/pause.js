module.exports={
    conf:{
        name: "pause",
        description: "Allows you to pause the music, next you can resume it with another command",
        usage: '<prefix>pause',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);
        if (bot.player.getQueue(message).paused) return message.channel.send(bot.language.PAUSE_ERR);

        bot.player.pause(message);
        message.channel.send(bot.language.PAUSE_SUCCESS);
    }
};