module.exports={
    conf:{
        name: "clear-queue",
        description: "Allows you to clear the current queue",
        usage: '<prefix>clear-queue',
        aliases: ["c-q", "clearq"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);
        const tracks = queue.tracks.length;
        if (!queue.tracks[0]) return message.reply(bot.language.CLEARQUEUE_ERR);

        // bot.player.clearQueue(message);
        await queue.clear();
        message.reply(bot.language.CLEARQUEUE_SUCCESS(tracks));
    }
}