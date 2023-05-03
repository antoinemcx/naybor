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
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.channel.send(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue) return message.channel.send(client.language.ERROR[0]);
        const track = queue.currentTrack;
        const perc = queue.node.getTimestamp();

        message.channel.send({
            embeds: [{
                color: client.color.messagecolor.greyple,
                author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}), url: `https://github.com/antoinemcx/naybor` },
                description: `[${track.title}](${track.url}) (\`${perc.progress === 'Infinity' ? 'Live' : `${perc.progress}%`}\`)\n\n${client.language.NOWPLAYING[0]} » \`${track.author}\`\n${client.language.NOWPLAYING[1]} » \`${track.duration}\`\nType » \`${track.fromPlaylist ? client.language.NOWPLAYING[2] : client.language.NOWPLAYING[3]}\`
\n${client.language.NOWPLAYING[4]} » \`${track.requestedBy.username}#${track.requestedBy.discriminator}\`\nVolume » \`${queue.node.volume}%\`
Loop » ${queue.repeatMode ? client.emotes.v : client.emotes.x}\nPause » ${queue.node.isPaused() ? client.emotes.v : client.emotes.x}`,
                fields: [
                    { name: client.language.NOWPLAYING[5], value: queue.node.createProgressBar({ timecodes: true }), inline: false }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            }],
        });
    },
};