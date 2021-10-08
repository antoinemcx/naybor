module.exports={
    conf:{
        name: "volume",
        description: "Allows you to increase or decrease the volume of the music (1-100)",
        usage: '<prefix>volume <volume>',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);
        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(bot.language.VOLUME_ERR);
        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(bot.language.VOLUME_ERR);

        bot.player.setVolume(message, parseInt(args[0]));
        message.channel.send(bot.language.VOLUME_SUCCESS(parseInt(args[0])));
    },
};