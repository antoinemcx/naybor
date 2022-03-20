const ms = require('ms');

module.exports={
    conf:{
        name: "seek",
        description: "Allows you to jump to a timecode in the current music.",
        usage: '<prefix>seek <timeCode>',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if(!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);
        
        const queue = bot.player.getQueue(message.guild.id);
        if(!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);
        
        if(!args[0]) return message.reply(bot.language.WRONG_USAGE(module.exports.conf.usage))
        const time = ms(args.join(' '));
        if(time >= queue.current.durationMS) return message.reply(bot.language.SEEK_ERR[1])

        try {
            await queue.seek(time)
            message.reply(bot.language.SEEK_SUCCESS(ms(time, { long: true })))
        } catch(e) {
            message.reply(bot.language.SEEK_ERR[1])
        }
    }
};