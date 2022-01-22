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

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send(bot.language.ERROR[0]);
        const track = queue.nowPlaying();
        const perc = queue.getPlayerTimestamp();

        message.channel.send({
            embeds: [{
                color: bot.color.messagecolor.greyple,
                author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
                description: `[${track.title}](${track.url}) (\`${perc.progress === 'Infinity' ? 'Live' : `${perc.progress}%`}\`)\n\n${bot.language.NOWPLAYING[0]} » \`${track.author}\`\n${bot.language.NOWPLAYING[1]} » \`${track.duration}\`\nType » \`${track.fromPlaylist ? bot.language.NOWPLAYING[2] : bot.language.NOWPLAYING[3]}\`
\n${bot.language.NOWPLAYING[4]} » \`${track.requestedBy.username}#${track.requestedBy.discriminator}\`\nVolume » \`${queue.volume}%\`\nLoop » ${queue.repeatMode ? bot.emotes.v : bot.emotes.x}\nPause » ${queue.paused ? bot.emotes.v : bot.emotes.x}`,
                fields: [
                    { name: bot.language.NOWPLAYING[5], value: queue.createProgressBar({ timecodes: true }), inline: false }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            }],
        });
    },
};