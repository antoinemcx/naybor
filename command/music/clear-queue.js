module.exports={
    conf:{
        name: "clear-queue",
        description: "Allows you to clear the current queue",
        usage: '<prefix>clear-queue',
        aliases: ["c-q", "clearq"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);
        const tracks = bot.player.getQueue(message).tracks.length;
        if (tracks <= 1) return message.channel.send(bot.language.CLEARQUEUE_ERR);

        bot.player.clearQueue(message);
        message.channel.send(bot.language.CLEARQUEUE_SUCCESS(tracks));
    }
}