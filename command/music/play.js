module.exports={
    conf:{
        name: "play",
        description: "Allows you to play music with YTB links, YTB playlists, Spotify links or SoundCloud links",
        usage: '<prefix>play <name/URL>',
        aliases: ["p"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!args[0]) return message.channel.send(bot.language.WRONG_USAGE(module.exports.conf.usage));

        bot.player.play(message, args.join(" "), { firstResult: true });
    }
};