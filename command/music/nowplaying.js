module.exports={
    conf:{
        name: "nowplaying",
        description: "Allows you to see what music is currently listening",
        usage: '<prefix>nowplaying',
        aliases: ["np", "now-playing"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);

        const track = bot.player.nowPlaying(message);
        const queue = bot.player.getQueue(message);

        message.channel.send({
            embed: {
                color: bot.color.messagecolor.greyple,
                author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
                description: `[${track.title}](${track.url})\n\n${bot.language.NOWPLAYING[0]} » \`${track.author}\`\n${bot.language.NOWPLAYING[1]} » \`${track.duration}\`\nType » \`${track.fromPlaylist ? bot.language.NOWPLAYING[2] : bot.language.NOWPLAYING[3]}\`
\n${bot.language.NOWPLAYING[4]} » \`${track.requestedBy.username}#${track.requestedBy.discriminator}\`\nVolume » \`${queue.volume}%\`\nLoop » ${queue.repeatMode ? bot.emotes.v : bot.emotes.x}\nPause » ${queue.paused ? bot.emotes.v : bot.emotes.x}`,
                fields: [
                    { name: bot.language.NOWPLAYING[5], value: bot.player.createProgressBar(message, { timecodes: true }), inline: false }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};