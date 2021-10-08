module.exports={
    conf:{
        name: "loop",
        description: "Allows you to loop the current music or the queue",
        usage: '<prefix>loop [queue]',
        aliases: ['repeat', 'lp', 'boucle'],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);
        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (bot.player.getQueue(message).loopMode) {
                bot.player.setLoopMode(message, false);
                return message.channel.send(bot.language.LOOP_DISABLE);
            } else {
                bot.player.setLoopMode(message, true);
                return message.channel.send(bot.language.LOOP_ENABLE[0]);
            };
        } else {
            if (bot.player.getQueue(message).repeatMode) {
                bot.player.setRepeatMode(message, false);
                return message.channel.send(bot.language.LOOP_DISABLE);
            } else {
                bot.player.setRepeatMode(message, true);
                return message.channel.send(bot.language.LOOP_ENABLE[1]);
            };
        };
    },
};