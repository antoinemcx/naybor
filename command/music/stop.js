module.exports={
    conf:{
        name: "stop",
        description: "Allows you to stop all musics and also leave your voice channel",
        usage: '<prefix>stop',
        aliases: ['st', 'leave', 'dc', 'disconnect'],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);

        bot.player.setRepeatMode(message, false);
        bot.player.stop(message);

        message.channel.send(bot.language.STOP);
    },
};