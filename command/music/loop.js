const { QueueRepeatMode } = require('discord-player');

module.exports={
    conf:{
        name: "loop",
        description: "Allows you to loop the current music or the queue",
        usage: '<prefix>loop [queue]',
        aliases: ['repeat', 'lp', 'boucle'],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.reply(bot.language.LOOP_ERR('queue'))

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            let sentance = queue.repeatMode === 0 ? bot.language.LOOP_DISABLE : bot.language.LOOP_ENABLE[0]
            return message.reply(success ? sentance : bot.language.ERROR[2]);

        } else {
            if (queue.repeatMode === 2) return message.reply(bot.language.LOOP_ERR('queue'))

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
            let sentance = queue.repeatMode === 0 ? bot.language.LOOP_DISABLE : bot.language.LOOP_ENABLE[1]
            return message.reply(success ? sentance : bot.language.ERROR[2])
        };
    },
};