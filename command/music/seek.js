module.exports={
    conf:{
        name: "seek",
        description: "Allows you to jump to a timecode in the current music.",
        usage: '<prefix>seek <TimeInSeconds>',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);
        
        if(!args[0]) return message.channel.send(bot.language.WRONG_USAGE(module.exports.conf.usage))
        if(isNaN(args[0]) || args[0] <= 0) return message.channel.send(bot.language.SEEK_ERR[0])
        const time = args[0] * 1000;

        try {
            await bot.player.seek(message, parseFloat(time))
            await message.channel.send(bot.language.SEEK_SUCCESS)
        } catch(e) {
            message.channel.send(bot.language.SEEK_ERR[1])
        }
    }
};