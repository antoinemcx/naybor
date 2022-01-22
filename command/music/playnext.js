const { QueryType } = require('discord-player');

module.exports={
    conf:{
        name: "playnext",
        description: "Allows you to play a music (after the current music has stopped)",
        usage: '<prefix>playnext <name/URL>',
        aliases: ["pnext", "pn"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        if (!args[0]) return message.reply(bot.language.WRONG_USAGE(module.exports.conf.usage));

        const player = bot.player;
        const queue = player.getQueue(message.guild.id);
        if(!queue || !queue.playing) return message.channel.send(bot.language.ERROR[0]);

        const song = await player.search(args.join(" "), {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });
        if(!song || !song.tracks.length) return message.reply(bot.language.PLAY_ERR[2])

        queue.insert(song.tracks[0]);
    }
};