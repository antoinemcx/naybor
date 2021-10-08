module.exports={
    conf:{
        name: "queue",
        description: "Allows you to see the current queue and all informations about it",
        usage: '<prefix>queue',
        aliases: ["q"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message);
        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);

        const list = (queue.tracks.filter(track => track.url !== queue.playing.url).map((track, i) => {
            return `\`${i + 1}.\` [${track.title}](${track.url}) » \`${bot.language.QUEUE[2]} : ${track.requestedBy.username}\`)`
            }).slice(0, 10).join('\n'))

        message.channel.send({embed: {
            color: bot.color.messagecolor.greyple,
            author: { name: `${bot.language.QUEUE[0]} ${message.guild.name}${bot.player.getQueue(message).loopMode ? ' (looped)' : ''}`, icon_url: message.author.displayAvatarURL({dynamic: true}) },
            description: `${bot.language.QUEUE[1]} : [${queue.playing.title}](${queue.playing.url}) » \`${bot.language.QUEUE[2]} : ${queue.playing.requestedBy.username}\`\n\n${list}`,
            footer: { text: `${queue.tracks.length} ${bot.language.QUEUE[3]}${queue.tracks.length > 1 ? 's' : ''} ${bot.language.QUEUE[4]}` },
            timestamp: new Date()            
        }})
    },
};