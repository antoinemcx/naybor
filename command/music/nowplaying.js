module.exports={
    conf:{
        name: "nowplaying",
        description: "Allows you to see what music is currently listening",
        usage: '<prefix>nowplaying',
        aliases: ["np", "now-playing"],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(client.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send(client.language.ERROR[0]);
        const track = queue.nowPlaying();
        const perc = queue.getPlayerTimestamp();

        message.channel.send({
            embeds: [{
                color: client.color.messagecolor.greyple,
                author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
                description: `[${track.title}](${track.url}) (\`${perc.progress === 'Infinity' ? 'Live' : `${perc.progress}%`}\`)\n\n${client.language.NOWPLAYING[0]} » \`${track.author}\`\n${client.language.NOWPLAYING[1]} » \`${track.duration}\`\nType » \`${track.fromPlaylist ? client.language.NOWPLAYING[2] : client.language.NOWPLAYING[3]}\`
\n${client.language.NOWPLAYING[4]} » \`${track.requestedBy.username}#${track.requestedBy.discriminator}\`\nVolume » \`${queue.volume}%\`\nLoop » ${queue.repeatMode ? client.emotes.v : client.emotes.x}\nPause » ${queue.paused ? client.emotes.v : client.emotes.x}`,
                fields: [
                    { name: client.language.NOWPLAYING[5], value: queue.createProgressBar({ timecodes: true }), inline: false }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            }],
        });
    },
};