module.exports={
    conf:{
        name: "queue",
        description: "Allows you to see the current queue and all informations about it",
        usage: '<prefix>queue',
        aliases: ["q"],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue) return message.reply(client.language.ERROR[0]);

        const list = (queue.tracks.filter(track => track.url !== queue.node.isPlaying().url).map((track, i) => {
            return `\`${i + 1}.\` [${track.title}](${track.url}) » \`${client.language.QUEUE[2]} : ${track.requestedBy.username}\`)`
            }).slice(0, 10).join('\n'))

        message.reply({embeds: [{
            color: client.color.messagecolor.greyple,
            author: { name: `${client.language.QUEUE[0]} ${message.guild.name}${queue.loopMode ? ' (looped)' : ''}`, icon_url: message.author.displayAvatarURL({dynamic: true}), url: `https://github.com/antoinemcx/naybor` },
            description: `${client.language.QUEUE[1]} : [${queue.currentTrack.title}](${queue.currentTrack.url}) » \`${client.language.QUEUE[2]} : ${queue.currentTrack.requestedBy.username}\`\n\n${list}`,
            footer: { text: `${queue.tracks.size} ${client.language.QUEUE[3]}${queue.tracks.size > 1 ? 's' : ''} ${client.language.QUEUE[4]}` },
            timestamp: new Date()            
        }]})
    },
};